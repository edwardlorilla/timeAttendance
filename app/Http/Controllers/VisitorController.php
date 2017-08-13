<?php

namespace App\Http\Controllers;

use App\Visitor;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class VisitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $visitors = Cache::rememberForever('visitor:all', function () {
            return Visitor::with('category')->orderBy('updated_at', 'desc')->get();
        });
        return response()->json($visitors);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'name' => 'required|max:100',
            'year' => 'required',
            'category_id' => 'required',
            'schoolId' => 'required'
        ]);
        $visitor = new Visitor();
        $visitor->name = $request->name;
        $visitor->year = $request->year;
        $visitor->category_id = $request->category_id;
        $visitor->schoolId = $request->schoolId;
        $visitor->save();
        Cache::forget('visitor:all');
        return response()->json(['data' => $visitor, 'success' => 'Success storing newly created visitor'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Visitor $visitor
     * @return \Illuminate\Http\Response
     */
    public function show(Visitor $visitor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Visitor $visitor
     * @return \Illuminate\Http\Response
     */
    public function edit(Visitor $visitor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Visitor $visitor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Visitor $visitor)
    {

        $visitor->update(array_diff_assoc($request->all(),$visitor->toArray()));
//        $visitor->name = $request->name;
//        $visitor->year = $request->year;
//        $visitor->category_id = $request->category_id;
//        $visitor->schoolId = $request->schoolId;
//        $visitor->save();
        Cache::forget('visitor:'.$visitor->id);
        Cache::forget('visitor:all');
        return response()->json(['data' =>$visitor, 'success' => 'Success storing newly created visitor'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Visitor $visitor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Visitor $visitor)
    {
        //
    }
}
