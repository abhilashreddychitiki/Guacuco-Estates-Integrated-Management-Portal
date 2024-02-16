<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use App\Models\Timing;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MembershipController extends Controller {
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function create( Request $request ) {
        $user = auth('sanctum')->user();

        $validator = Validator::make($request->all(), [
            'timingId'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages()
            ]);
        }
        else
        {
            $membership = new Membership;
            $membership->timingId = $request->timingId;
            $membership->userId = $user->id;
            $membership->save();

            return response()->json([
                'status'=>200,
                'message'=>'Membership added successfully!'
            ]);
        }
    }

    /**
    * Read resources from storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function read( Request $request ) {
        $user = auth('sanctum')->user();
        $memberships = Membership::where('userId', $user->id)->get();
        $timings = Timing::get();
        $result = array();
        
        for ($i=0; $i < count($timings); $i++) {
            for ($j=0; $j < count($memberships); $j++) {
                if($memberships[$j]->timingId == $timings[$i]->id) {
                    $timings[$i]->membershipId = $memberships[$j]->id;
                    $timings[$i]->status = $memberships[$j]->status;
                    break;
                }
                else {
                    $timings[$i]->status = 'Inactive';
                } 
            }
            array_push($result, $timings[$i]);
        }

        return response()->json([
            'status'=>200,
            'data'=>$result
        ]);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Membership  $membership
    * @return \Illuminate\Http\Response
    */
    public function update( Request $request, $membershipId ) {
        $user = auth('sanctum')->user();
        $userId = $user->id;

        $membership = Membership::find( $membershipId );
        if($membership == null) {

        }
        if($request->status) $membership->status = $request->status;
        $membership->userId = $userId;
        $membership->save();

        return response()->json([
            'status'=>200,
            'message'=>'Membership updated successfully!'
        ]);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Membership  $membership
    * @return \Illuminate\Http\Response
    */
    public function delete( Request $request, $membershipId ) {
        $membership = Membership::find( $membershipId );
        $membership->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Membership deleted successfully!'
        ]);
    }

}