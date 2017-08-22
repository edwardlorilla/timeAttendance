<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = [
        'name', 'year','schoolId', 'category_id', 'course_id'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function times()
    {
        return $this->hasMany(Time::class);
    }
}
