<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = [
        'name', 'year','schoolId', 'category_id', 'course_id','gender_id', 'disabled', 'photo_id', 'time_id'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }
    public function times()
    {
        return $this->hasMany(Time::class);
    }

    public function photos()
    {
        return $this->belongsToMany(Photo::class);
    }
    public function photo()
    {
        return $this->belongsTo(Photo::class);
    }public function time()
    {
        return $this->belongsTo(Time::class);
    }
}
