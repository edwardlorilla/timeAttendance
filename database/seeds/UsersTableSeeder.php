<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $users = [
        ['name' => 'Edward Lance Lorilla', 'email' => 'edwardlorilla1986@gmail.com', 'password' => 'edward'],
    ];
    public function run()
{       DB::table('users')->truncate();
        if (\App\User::all()->count() > 0) {
            return;
        }
        foreach ($this->users as $user) {
            $new = new \App\User();
            $new->name = $user['name'];
            $new->password =  bcrypt($user['password']);
            $new->email = $user['email'];
            $new->save();
        }
    }
}
