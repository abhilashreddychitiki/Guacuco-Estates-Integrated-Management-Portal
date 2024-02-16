<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Timing;
use App\Models\User;

class Membership extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'timingId',
        'userId',
        'status'
    ];

    /**
     * The function to be mapped to Activity and Users Table.
     *
     * @var array<int, string>
     */
    protected $with = ['timing', 'user'];
    public function timing() {
        return $this->belongsTo(Timing::class, 'timingId', 'id');
    }
    public function user() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
