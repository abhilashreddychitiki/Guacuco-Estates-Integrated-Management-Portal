<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;

class Report extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'startDate',
        'endDate',
        'filter',
        'filePath',
        'userId',
        'status'
    ];

    /**
     * The function to be mapped to Users Table.
     *
     * @var array<int, string>
     */
    protected $with = ['user'];
    public function user() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }

}
