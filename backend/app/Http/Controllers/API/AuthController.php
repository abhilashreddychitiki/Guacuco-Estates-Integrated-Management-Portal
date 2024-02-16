<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'phone'=>'required|unique:users,phone',
            'password'=>'required|min:8',
            'address'=>'required',
            'role'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages()
            ], 400);
        }
        else
        {
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'phone'=>$request->phone,
                'password'=>Hash::make($request->password),
                'address'=>$request->address,
                'role'=>$request->role
            ]);

            event(new Registered($user));
            
            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'id'=>$user->id,
                'name'=>$user->name,
                'email'=>$user->email,
                'phone'=>$user->phone,
                'address'=>$user->address,
                'role'=>$user->role,
                'token'=>$token,
                'message'=>'User created successfully!'
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|max:191',
            'password'=>'required|min:8'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages()
            ], 400);
        }
        else
        {
            if(!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'validation_errors'=>[
                        'error'=>'Invalid Credentials!'
                    ]
                ], 401);
            }

            $user = User::where('email', $request->email)->first();
            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'user'=>$user,
                'token'=>$token,
                'message'=>'Logged In Successfully!'
            ]);            
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Logged Out Successfully!'
        ]);
    }

    public function getUsers(Request $request)
    {
        if($request->search) {
            $users = User::where('name', 'LIKE', '%'.$request->search.'%')->get();
        }
        else {
            $users = User::all();
        }

        $result = array();
        foreach($users as $key=>$value) {
            $user = new User;
            $user = $value;
            array_push($result, $user);
        }

        return response()->json([
            'status'=>200,
            'data'=>$result
        ]);
    }

    public function getUsersBasedOnRole(Request $request, $role)
    {
        $users = User::where('role', $role)->get();

        $result = array();
        foreach($users as $key=>$value) {
            $user = new User;
            $user = $value;
            array_push($result, $user);
        }

        return response()->json([
            'status'=>200,
            'data'=>$result
        ]);
    }

    public function emailVerification(Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return [
                'message' => 'Already Verified'
            ];
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'status'=>200,
            'message'=>"Verification Email Sent!"
        ]);
    }

    public function verifyEmail(EmailVerificationRequest $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'status'=>200,
                'message'=>"Email already verified!"
            ]);
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return response()->json([
            'status'=>200,
            'message'=>'Email has been verified'
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return [
                'status' => __($status)
            ];
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', RulesPassword::defaults()],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response([
                'message'=> 'Password reset successfully'
            ]);
        }

        return response([
            'message'=> __($status)
        ], 500);

    }

    public function updateUser(Request $request, $userId)
    {
        $user = User::find( $userId );
        if($request->name) $user->name = $request->name;
        if($request->email) $user->email = $request->email;
        if($request->phone) $user->phone = $request->phone;
        if($request->address) $user->address = $request->address;
        if($request->status) $user->status = $request->status;
        $user->save();

        return response()->json([
            'status'=>200,
            'message'=>'User updated successfully!'
        ]);
    }
}