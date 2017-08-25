<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
//        $this->call(VisitorTableSeeder::class);
//        $this->call(TimeTableSeeder::class);
        $this->call(CourseTableSeeder::class);
        $this->call(GenderTableSeeder::class);
        

    }
}
