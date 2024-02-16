<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;

class Chat extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'senderId',
        'receiverId',
        'message',
        'read'
    ];

    /**
     * The function to be mapped to Users Table.
     *
     * @var array<int, string>
     */
    protected $with = ['sender', 'receiver'];
    public function sender() {
        return $this->belongsTo(User::class, 'senderId', 'id');
    }
    public function receiver() {
        return $this->belongsTo(User::class, 'receiverId', 'id');
    }
}