<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller {
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function create( Request $request ) {
        $validator = Validator::make($request->all(), [
            'title'=>'required|max:191',
            'description'=>'required|max:191',
            'image'=>'required',
            'advertisement'=>'required',
            'userId'=>'required',
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
            $event = new Event;
            $event->title = $request->title;
            $event->description = $request->description;
            $event->image = $request->image;
            $event->advertisement = $request->advertisement;
            $event->userId = $request->userId;
            $event->status = $request->status;
            $event->save();

            return response()->json([
                'status'=>200,
                'message'=>'Event created successfully!'
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
        $events_query = Event::with(['user']);
        if($request->search) {
            $events_query->where('title', 'LIKE', '%'.$request->search.'%');
        }

        $events = $events_query->get();

        return response()->json([
            'status'=>200,
            'data'=>$events->toArray()
        ]);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Event  $event
    * @return \Illuminate\Http\Response
    */
    public function update( Request $request, $eventId ) {
        $event = Event::find( $eventId );
        if($request->title) $event->title = $request->title;
        if($request->description) $event->description = $request->description;
        if($request->image) $event->image = $request->image;
        if($request->advertisement) $event->advertisement = $request->advertisement;
        if($request->userId) $event->userId = $request->userId;
        if($request->status) $event->status = $request->status;
        $event->save();

        return response()->json([
            'status'=>200,
            'message'=>'Event updated successfully!'
        ]);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Event  $event
    * @return \Illuminate\Http\Response
    */
    public function delete( Request $request, $eventId ) {
        $event = Event::find( $eventId );
        $event->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Event deleted successfully!'
        ]);
    }

    /**
    * Read resources from storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function getAd( Request $request ) {
        $ad = Event::where('advertisement', true)->inRandomOrder()->first();
        return response()->json([
            'status'=>200,
            'data'=>$ad
        ]);
    }
}