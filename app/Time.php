<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }
}
