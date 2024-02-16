<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller {
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function create( Request $request ) {
        $user = auth('sanctum')->user();

        $validator = Validator::make($request->all(), [
            'tag_no'=>'required|max:191',
            'driving_license'=>'required',
            'number_plate'=>'required',
            'phone'=>'required',
            'address'=>'required',
            'status'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages()
            ]);
        }
        else
        {
            $vehicle = new Vehicle;
            $vehicle->tag_no = $request->tag_no;
            $vehicle->driving_license = $request->driving_license;
            $vehicle->number_plate = $request->number_plate;
            $vehicle->phone = $request->phone;
            $vehicle->address = $request->address;
            $vehicle->userId = $user->id;
            $vehicle->status = $request->status;
            $vehicle->save();

            return response()->json([
                'status'=>200,
                'message'=>'Vehicle created successfully!'
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

        $vehicles_query = Vehicle::with(['user']);
        if($request->search) {
            $vehicles_query->where('tag_no', 'LIKE', '%'.$request->search.'%')
            ->orWhere('driving_license', 'LIKE', '%'.$request->search.'%')
            ->orWhere('number_plate', 'LIKE', '%'.$request->search.'%');
        }

        if($user->role == "admin") {    
            $vehicles = $vehicles_query->get();
    
            return response()->json([
                'status'=>200,
                'data'=>$vehicles->toArray()
            ]);
        }

        $vehicles = $vehicles_query->where('userId', $user->id)->get();

        return response()->json([
            'status'=>200,
            'data'=>$vehicles->toArray()
        ]);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Vehicle  $vehicle
    * @return \Illuminate\Http\Response
    */
    public function update( Request $request, $vehicleId ) {
        $user = auth('sanctum')->user();

        $vehicle = Vehicle::find( $vehicleId );
        if($request->tag_no) $vehicle->tag_no = $request->tag_no;
        if($request->driving_license) $vehicle->driving_license = $request->driving_license;
        if($request->number_plate) $vehicle->number_plate = $request->number_plate;
        if($request->phone) $vehicle->phone = $request->phone;
        if($request->address) $vehicle->address = $request->address;
        $vehicle->userId = $user->id;
        if($request->status) $vehicle->status = $request->status;
        $vehicle->save();

        return response()->json([
            'status'=>200,
            'message'=>'Vehicle updated successfully!'
        ]);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Vehicle  $vehicle
    * @return \Illuminate\Http\Response
    */
    public function delete( Request $request, $vehicleId ) {
        $vehicle = Vehicle::find( $vehicleId );
        $vehicle->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Vehicle deleted successfully!'
        ]);
    }
}