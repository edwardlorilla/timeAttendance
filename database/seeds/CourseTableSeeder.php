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
        ['id'=> 1, 'course' => 'BS-IS', 'description' =>'Bachelor of Science in International Studies' ],
        ['id'=> 2, 'course' => 'BS-ED', 'description' =>'Bachelor of Science in Secondary Education'],
        ['id'=> 3, 'course' => 'BEEd', 'description' =>'Bachelor of Elementary Education'],
        ['id'=> 4, 'course' => 'BS-PSYCHE', 'description' =>'Bachelor of Arts in Psychology'],
        ['id'=> 5, 'course' => 'BS-SS', 'description' =>'Bachelor of Science in Social Services'],
        ['id'=> 6, 'course' => 'BS-ENTREP', 'description' =>'Bachelor of Science in Entrepreneurship'],
        ['id'=> 7, 'course' => 'BS-INFOSYS', 'description' =>'Bachelor of Science in Information Systems'],
        ['id'=> 8, 'course' => 'GRADE 11', 'description' =>'GRADE 11'],
        ['id'=> 9, 'course' => 'GRADE 12', 'description' =>'GRADE 12'],
        ['id'=> 10, 'course' => 'FACULTY', 'description' =>'the teaching staff of a university or college, or of one of its departments or divisions, viewed as a body.'],
        ['id'=> 11, 'course' => 'ADMIN', 'description' =>'a person responsible for running a business, organization, etc.'],
        ['id'=> 12, 'course' => 'BOARD', 'description' =>'Formal meeting of the board of directors of an organization, held usually at definite intervals to consider policy issues and major problems.'],

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
