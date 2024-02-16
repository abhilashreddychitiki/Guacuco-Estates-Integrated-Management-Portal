<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;
use DateTime;

class ChatController extends Controller {
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function create( Request $request ) {
        $validator = Validator::make($request->all(), [
            'senderId'=>'required',
            'receiverId'=>'required',
            'message'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages()
            ]);
        }
        else
        {
            $chat = new Chat;
            $chat->senderId = $request->senderId;
            $chat->receiverId = $request->receiverId;
            $chat->message = $request->message;
            $chat->save();

            return response()->json([
                'status'=>200,
                'message'=>'Message sent successfully!'
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
        $chats_query = Chat::with(['sender', 'receiver']);

        $chats = $chats_query->get();

        return response()->json([
            'status'=>200,
            'data'=>$chats->toArray()
        ]);
    }

    /**
    * Read resource from storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function getChat( Request $request, $senderId, $receiverId ) {
        $user = auth('sanctum')->user();
        $userId = $user->id;

        $chats = Chat::whereIn('senderId', [$senderId, $receiverId])
        ->whereIn('receiverId', [$senderId, $receiverId])
        ->orderBy('created_at', 'desc')
        ->get();    

        foreach($chats as $chat) {
            if($chat->senderId != $userId) $chat->read = true;
            $chat->save();
        }

        return response()->json([
            'status'=>200,
            'data'=>$chats
        ]);
    }

    public function getUnreadChats( Request $request, $userId ) {
        $chats = Chat::select([
                    DB::raw('count(*) as unread'),
                    'senderId',
                    'receiverId',
                    'message',
                    'created_at'
                ])
                ->whereIn('id', function($query){
                    $query->select(DB::raw('MAX(id)'))
                        ->from('chats')
                        ->groupBy(['senderId', 'receiverId']);
                })
                ->where('receiverId', $userId)
                ->where('read', false)
                ->groupBy(['senderId', 'receiverId', 'message', 'created_at'])
                ->get();

        return response()->json([
            'status'=>200,
            'data'=>$chats
        ]);
    }

    public function getChats( Request $request ) {
        $user = auth('sanctum')->user();
        $userId = $user->id;

        $chats = Chat::selectRaw('
                    CASE 
                        WHEN senderId = ? THEN receiverId
                        WHEN receiverId = ? THEN senderId
                    END as contact_id,
                    COUNT(CASE WHEN `read` = 0 AND senderId != ? THEN 1 END) as unread_count,
                    MAX(created_at) as last_message_date
                ', [$userId, $userId, $userId])
                ->where('senderId', $userId)
                ->orWhere('receiverId', $userId)
                ->groupBy('contact_id')
                ->orderByDesc('last_message_date')
                ->without(['sender', 'receiver'])
                ->get(['contact_id', 'unread_count', 'last_message_date'])
                ->map(function ($chat) use ($userId) {
                    $contactId = $chat->contact_id;
                    $chat->contact_name = User::find($contactId, ['name'])->name;
                    $chat->last_message = Chat::where(function ($query) use ($userId, $contactId) {
                            $query->where('senderId', $userId)
                                ->where('receiverId', $contactId);
                        })
                        ->orWhere(function ($query) use ($userId, $contactId) {
                            $query->where('senderId', $contactId)
                                ->where('receiverId', $userId);
                        })
                        ->orderByDesc('created_at')
                        ->first(['senderId', 'receiverId', 'message']);
                    $chat->last_message_date = (new DateTime($chat->last_message_date))->format('Y-m-d\TH:i:s.u\Z');
                    return $chat;
                });

        return response()->json([
            'status'=>200,
            'data'=>$chats
        ]);
    }
}