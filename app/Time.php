<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    protected $fillable = [
        'LocaleDate','visitor_id','LocaleStartTime','LocaleEndTime','tempStartTime', 'duration', 'disabled'
    ];
    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }
}
