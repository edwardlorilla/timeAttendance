<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VisitorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $visitors = [
        ['name' => 'Edward Lance Lorilla', 'year' => '4'],
        ['name' => 'Fredrich John Lorilla', 'year' => '1'],
        ['name' => 'Rosemarie Lorilla', 'year' => '1'],
        ['name' => 'Lorilla 1', 'year' => '2'],
        ['name' => 'Benn Flores', 'year' => '3'],
        ['name' => 'Baluyot', 'year' => '2']
    ];
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('visitors')->truncate();
        if (\App\Visitor::all()->count() > 0) {
            return;
        }
        foreach ($this->visitors as $visitor) {
            $new = new \App\Visitor();
            $new->name = $visitor['name'];
            $new->year = $visitor['year'];
            $new->category_id = rand(1,4);
            $new->schoolId = rand(1000,3000);
            $new->save();
        }
    }
}
