<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Visitor;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;
use PHPExcel;
use PHPExcel_Chart;
use PHPExcel_Chart_DataSeries;
use PHPExcel_Chart_DataSeriesValues;
use PHPExcel_Chart_Legend;
use PHPExcel_Chart_PlotArea;
use PHPExcel_Chart_Title;

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
            return Visitor::with('category', 'gender', 'course', 'photos', 'photo', 'times', 'time')->orderBy('updated_at', 'desc')->get();
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
        $photo = new Photo();
        $file = $request->avatar;
        if ($file && $file !== "null" && gettype($request->avatar) !== "object") {
            list($type, $imageData) = explode(';', $request->avatar);
            list(, $extension) = explode('/', $type);
            list(, $imageData) = explode(',', $imageData);
            $fileName = uniqid() . '.' . $extension;
            $source = fopen($request->avatar, 'r');
            $destination = fopen('images/' . $fileName, 'w');
            stream_copy_to_stream($source, $destination);
            fclose($source);
            fclose($destination);
            $photo = $photo->create(['file' => $fileName]);
        }
        if($file && $file !== "null" && gettype($request->avatar) === "object"){
            $name =  uniqid() . $file->getClientOriginalName();
            $file->move('images', $name);
            $photo = $photo->create(['file' => $name]);
        }

        $this->validate($request, [
            'name' => 'required|max:100',
            'year' => 'required',
            'category_id' => 'required',
            'course_id' => 'required',
            'schoolId' => ['required', Rule::unique('visitors')->ignore(auth()->id())],
            'gender_id' => 'required'
        ]);
        //year -> 1st , 2nd, 3rd ....
        $visitor = new Visitor([
            'name' => $request->name,
            'gender_id' => $request->gender_id,
            'course_id' => $request->category_id === '3'   ? (int)$request->course_id : ($request->year === '11' ? 8 : ($request->year === '12' ? 9 :  ($request->year === '13' ? 10 :  ($request->year === '14' ? 11 :  ($request->year === '15' ? 12 : null))))),
            'year' => $request->category_id === '3' || $request->category_id === '1' || $request->category_id === '4' ? (int)$request->year : null,
            'category_id' => $request->category_id,
            'disabled' => 0,
            'schoolId' => $request->schoolId,
            'photo_id' => $photo->id
        ]);
        $visitor->save();
        if ($photo->id) {
            $visitor->photos()->attach($photo->id);
        }
        Cache::forget('visitor:all');
        return response()->json(['data' => Visitor::where('id', $visitor->id)->with('course')->first(), 'success' => 'Success storing newly created visitor', 'photo_file' => $photo->file], 200);
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


        $photo = new Photo();
        if ($file = $request->file('avatar')) {
            $name = time() . $file->getClientOriginalName();
            $file->move('images', $name);
            $photo = $photo->create(['file' => $name]);
        }
        if (count($request->all()) < 3) {
            $visitor->update(array_diff_assoc($request->all(), $visitor->toArray())); //untested
//            $visitor->update($request->all());
        }else{
            $visitor->update([
                'name' => $request->name,
                'gender_id' => $request->gender_id,
                'year' => $request->category_id === 3 || $request->category_id === 1 || $request->category_id === 4 ? (int)$request->year : null,
                'course_id' => $request->category_id === 3   ? (int)$request->course_id : ($request->year === "11" ? 8 : ($request->year === "12" ? 9 :  ($request->year === "13" ? 10 :  ($request->year === "14" ? 11 :  ($request->year === '15' ? 12 : null))))),
                'category_id' => $request->category_id,
                'disabled' => 0,
                'schoolId' => $request->schoolId,
                'photo_id' => $photo->id
            ]);
        }

        if ($photo->id) {
            $visitor->photos()->attach($photo->id);
        }
//        $visitor->name = $request->name;
//        $visitor->year = $request->year;
//        $visitor->category_id = $request->category_id;
//        $visitor->schoolId = $request->schoolId;
//        $visitor->save();
        Cache::forget('visitor:' . $visitor->id);
        Cache::forget('visitor:all');
        return response()->json(['data' => Visitor::where('id', $visitor->id)->with('course', 'category')->first(), 'success' => 'Success storing newly created visitor'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Visitor $visitor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Visitor $visitor)
    {
        $visitor->times()->delete();
        $visitor->delete();
        Cache::forget('visitor:' . $visitor->id);
        Cache::forget('visitor:all');
        return response()->json(null, 204);
    }

    /**
     * @param Request $request
     * @param $photo
     * @return mixed
     */
    public function editPhoto(Request $request)
    {

        $photo = new Photo();
        $name = null;
        if ($file = $request->file('avatar')) {
            $name = time() . $file->getClientOriginalName();
            $file->move('images', $name);
            $photo = $photo->create(['file' => $name]);
        }

        $visitor = Visitor::where('id', $request->id)->first();
        $visitor->photos()->attach($photo->id);
        Cache::forget('visitor:all');

        return response()->json(['photo_name' => $name, 'photo_id' => $photo->id]);

    }

    public function postPhoto(Request $request, $visitor)
    {
        $photo = new Photo();
        if ($file = $request->file('file')) {
            $name = time() . $file->getClientOriginalName();
            $file->move('images', $name);
            $photo = $photo->create(['file' => $name]);
        }
        $visitorPhoto = Visitor::where('id', $visitor)->first();
        $visitorPhoto->photos()->attach($photo->id);
        Cache::forget('visitor:all');
        return response()->json(['photo_name' => $photo->file, 'photo_id' => $photo->id]);
    }

    public function reportExcel(Request $request)
    {
        $data = $request->data;
        $year = $request->time;
        $transferData = [
            ['=countPerCourse!A1', '=countPerCourse!B1', '=timeSpendPerYear!A1', '=timeSpendPerYear!B1'],
            ['=countPerCourse!A2', '=countPerCourse!B2', '=timeSpendPerYear!A2', '=timeSpendPerYear!B2'],
            ['=countPerCourse!A3', '=countPerCourse!B3', '=timeSpendPerYear!A3', '=timeSpendPerYear!B3'],
            ['=countPerCourse!A4', '=countPerCourse!B4', '=timeSpendPerYear!A4', '=timeSpendPerYear!B4'],
            ['=countPerCourse!A5', '=countPerCourse!B5'],
            ['=countPerCourse!A6', '=countPerCourse!B6']
        ];

        Excel::load(public_path('storage/template.xls'), function ($excel) use ($data, $year, $transferData) {



            $excel->sheet('Sheet1', function ($sheet) use ($transferData) {
                $sheet->setCellValue('H5', Carbon::now());
                $sheet->fromArray($transferData, null, 'A8', false, false);
            });
            $excel->sheet('countPerCourse', function ($sheet) use ($data) {
                $sheet->fromArray($data, null, 'A1', false, false);
            });
            $excel->sheet('timeSpendPerYear', function ($sheet) use ($year) {
                $sheet->fromArray($year, null, 'A1', false, false);
            });



        }, 'UTF-8')->store('xls', public_path('storage/'));
        return response()->json(['data' => 'http://' . $request->server('HTTP_HOST') . '/storage/template.xls']);
    }

}
