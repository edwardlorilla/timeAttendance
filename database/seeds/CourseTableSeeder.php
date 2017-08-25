<?php

use Illuminate\Database\Seeder;

class CourseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
/*
 *
 *
 * Bachelor of Science in International Studies
Bachelor of Science in Secondary Education
Bachelor of Elementary Education
Bachelor of Arts in Psychology
Bachelor of Science in Social Services
Bachelor of Science in Entrepreneurship
Bachelor of Science in Information Systems
 * */
    private $courses = [
        ['course' => 'BS-IS', 'description' =>'Bachelor of Science in International Studies' ],
        ['course' => 'BS-ED', 'description' =>'Bachelor of Science in Secondary Education'],
        ['course' => 'BEEd', 'description' =>'Bachelor of Elementary Education'],
        ['course' => 'BS-PSYCHE', 'description' =>'Bachelor of Arts in Psychology'],
        ['course' => 'BS-SS', 'description' =>'Bachelor of Science in Social Services'],
        ['course' => 'BS-ENTREP', 'description' =>'Bachelor of Science in Entrepreneurship'],
        ['course' => 'BS-INFOSYS', 'description' =>'Bachelor of Science in Information Systems']
    ];

    public function run()
    {
        if (\App\Course::all()->count() > 0) {
            return;
        }
        foreach ($this->courses as $course) {
            $new = new \App\Course();
            $new->course = $course['course'];
            $new->description = $course['description'];
            $new->save();
        }
    }
}
