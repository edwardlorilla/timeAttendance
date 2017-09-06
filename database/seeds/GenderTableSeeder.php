<?php

use Illuminate\Database\Seeder;

class GenderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $times = [
        ['id' => 1 , 'gender' => 'Male'],
        ['id' => 2 , 'gender' => 'Female'],
    ];
    public function run()
    {

        DB::table('genders')->truncate();
        if (\App\Gender::all()->count() > 0) {
            return;
        }
        foreach ($this->times as $time) {
            $new = new \App\Gender();
            $new->gender = $time['gender'];
            $new->id = $time['id'];
            $new->save();
        }
    }
}
