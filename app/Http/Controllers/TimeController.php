<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Time;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class TimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $time = Cache::rememberForever('times:all', function () {
            return Time::with('visitor.category')->orderBy('updated_at', 'desc')->get();
        });
        return response()->json($time);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $this->validate($request, [
            'LocaleDate' => 'required',
            'visitor_id' => 'required',
            'LocaleStartTime' => 'required',
            'LocaleEndTime' => '',
            'tempStartTime' => '',
        ]);
        $time = new Time();
        $time->LocaleDate = $request->LocaleDate;
        $time->visitor_id = $request->visitor_id;
        $time->LocaleStartTime = $request->LocaleStartTime;
        $time->LocaleEndTime = $request->LocaleEndTime;
        $time->tempStartTime = $request->tempStartTime;
        $time->save();
        Cache::forget('times:all');
        return response()->json(['data' => $time, 'success' => 'Success storing newly created visitor'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Time $time
     * @return \Illuminate\Http\Response
     */
    public function show(Time $time)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Time $time
     * @return \Illuminate\Http\Response
     */
    public function edit(Time $time)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Time $time
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Time $time)
    {
        //
        $startTime = Carbon::parse($request->tempStartTime);
        $finishTime = Carbon::parse($request->LocaleEndTime);

        $totalDuration =$finishTime->diff($startTime)->format('%H:%I:%S');;
// 00:00:21
        $duration = [
            'duration' =>$request->duration = $totalDuration
        ];





        $time->update(array_merge($duration, array_diff_assoc($request->only('id', 'visitor_id', 'LocaleDate', 'LocaleStartTime','duration', 'tempStartTime', 'LocaleEndTime', 'updated_at', 'created_at'), $time->toArray())));
        Cache::forget('times:' . $time->id);
        Cache::forget('times:all');
//
        return response()->json(['data' => $time, 'success' => 'Success storing newly created visitor'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Time $time
     * @return \Illuminate\Http\Response
     */
    public function destroy(Time $time)
    {
        //
    }
}
