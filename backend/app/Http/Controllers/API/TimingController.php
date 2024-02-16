<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Timing;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TimingController extends Controller {
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function create( Request $request ) {
        $user = auth('sanctum')->user();
        $userId = $user->id;

        $validator = Validator::make($request->all(), [
            'name'=>'required',
            'weekDays'=>'required',
            'startTime'=>'required',
            'endTime'=>'required',
            'activity'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages()
            ]);
        }
        else
        {
            $timing = new Timing;
            $timing->name = $request->name;
            $timing->weekDays = $request->weekDays;
            $timing->startTime = $request->startTime;
            $timing->endTime = $request->endTime;
            $timing->activity = $request->activity;
            $timing->userId = $userId;
            $timing->status = $request->status;
            $timing->save();

            return response()->json([
                'status'=>200,
                'message'=>'Timings added successfully!'
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
        $timings_query = Timing::with(['user']);
        $timings = $timings_query->get();

        return response()->json([
            'status'=>200,
            'data'=>$timings->toArray()
        ]);
    }

    /**
    * Read resources from storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function readByActivity( Request $request, $activity ) {
        $timings_query = Timing::with(['user'])->where('activity', $activity);
        if($request->search) {
            $timings_query->where('name', 'LIKE', '%'.$request->search.'%');
        }

        $timings = $timings_query->get();

        return response()->json([
            'status'=>200,
            'data'=>$timings->toArray()
        ]);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Timing  $timing
    * @return \Illuminate\Http\Response
    */
    public function update( Request $request, $timingId ) {
        $timing = Timing::find( $timingId );

        if($request->userId) {
            if($request->userId == $timing->userId) {
                if($request->name) $timing->name = $request->name;
                if($request->weekDays) $timing->weekDays = $request->weekDays;
                if($request->startTime) $timing->startTime = $request->startTime;
                if($request->endTime) $timing->endTime = $request->endTime;
                if($request->activity) $timing->activity = $request->activity;
                if($request->status) $timing->status = $request->status;
                $timing->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Timing updated successfully!'
                ]);        
            }
            else {
                return response()->json([
                    'status'=>400,
                    'message'=>'Invalid User!'
                ]);
            }
        }
        return response()->json([
            'status'=>400,
            'message'=>'User ID is required!'
        ]);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Timing  $timing
    * @return \Illuminate\Http\Response
    */
    public function delete( Request $request, $timingId ) {
        $timing = Timing::find( $timingId );
        $timing->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Timing deleted successfully!'
        ]);
    }

}