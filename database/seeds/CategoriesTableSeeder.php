<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $categories = [
        ['name' => 'Senior High'],
        ['name' => 'Outsider'],
        ['name' => 'MKD Student'],
        ['name' => 'Teacher']
    ];
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('categories')->truncate();
        if (\App\Category::all()->count() > 0) {
            return;
        }
        foreach ($this->categories as $category) {
            $new = new \App\Category();
            $new->name = $category['name'];
            $new->save();
        }
    }
}
