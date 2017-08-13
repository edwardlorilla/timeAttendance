<?php

use Illuminate\Database\Seeder;

class TimeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    private $times = [
        ['visitor_id' => 1, ],
        ['visitor_id' => 2, ],
        ['visitor_id' => 3, ],
        ['visitor_id' => 4, ],
        ['visitor_id' => 5, ],
        ['visitor_id' => 6, ]
    ];
    public function run()
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('times')->truncate();
        if (\App\Time::all()->count() > 0) {
            return;
        }
        foreach ($this->times as $time) {
            $new = new \App\Time();
            $new->visitor_id = $time['visitor_id'];
            $new->LocaleDate = '8/13/2017';
            $new->LocaleStartTime = '9:36:40 PM';
            $new->LocaleEndTime = '9:36:40 PM';
            $new->save();
        }
    }
}
