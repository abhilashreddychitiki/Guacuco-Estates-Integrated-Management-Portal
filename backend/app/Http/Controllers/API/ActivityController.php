<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActivityController extends Controller {
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function create( Request $request ) {
        $user = auth('sanctum')->user();

        $validator = Validator::make($request->all(), [
            'activity'=>'required|max:191',
            'date'=>'required',
            'start_time'=>'required',
            'end_time'=>'required',
            'venue'=>'required|max:191',
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
            $activity = new Activity;
            $activity->activity = $request->activity;
            $activity->date = $request->date;
            $activity->start_time = $request->start_time;
            $activity->end_time = $request->end_time;
            $activity->venue = $request->venue;
            $activity->userId = $user->id;
            $activity->status = $request->status;
            $activity->save();

            return response()->json([
                'status'=>200,
                'message'=>'Activity created successfully!'
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
        $activities_query = Activity::with(['user']);
        if($request->search) {
            $activities_query->where('activity', 'LIKE', '%'.$request->search.'%');
        }

        $activities = $activities_query->get();

        return response()->json([
            'status'=>200,
            'data'=>$activities->toArray()
        ]);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Activity  $activity
    * @return \Illuminate\Http\Response
    */
    public function update( Request $request, $activityId ) {
        $user = auth('sanctum')->user();

        $activity = Activity::find( $activityId );
        if($request->activity) $activity->activity = $request->activity;
        if($request->date) $activity->date = $request->date;
        if($request->start_time) $activity->start_time = $request->start_time;
        if($request->end_time) $activity->end_time = $request->end_time;
        if($request->venue) $activity->venue = $request->venue;
        $activity->userId = $user->id;
        if($request->status) $activity->status = $request->status;
        $activity->save();

        return response()->json([
            'status'=>200,
            'message'=>'Activity updated successfully!'
        ]);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Activity  $activity
    * @return \Illuminate\Http\Response
    */
    public function delete( Request $request, $activityId ) {
        $activity = Activity::find( $activityId );
        $activity->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Activity deleted successfully!'
        ]);
    }

}