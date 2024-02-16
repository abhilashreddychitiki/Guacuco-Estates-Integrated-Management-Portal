<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Ad;
use App\Models\Event;
use App\Models\Membership;
use App\Models\Report;
use App\Models\Timing;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller {
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function create( Request $request ) {
        $user = auth('sanctum')->user();
        $userId = $user->id;

        $validator = Validator::make($request->all(), [
            'name'=>'required',
            'startDate'=>'required',
            'endDate'=>'required',
            'filter'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages()
            ]);
        }
        else
        {
            $report = new Report;
            $report->name = $request->name;
            $report->startDate = $request->startDate;
            $report->endDate = $request->endDate;
            $report->filter = $request->filter;
            $report->userId = $userId;
            $report->status = $request->status;

            $startDate = Carbon::parse($report->startDate);
            $endDate = Carbon::parse($report->endDate);
            if($report->filter == 'residents') {
                $residents = User::where('role', 'resident')->whereBetween('created_at', [$startDate, $endDate])->get();

                $fileName = 'residents_' . $startDate->format('Ymd') . '_' . $endDate->format('Ymd') . '.csv';
                if (!Storage::exists('app/public/reports')) {
                    Storage::makeDirectory('app/public/reports');
                }
                $filePath = storage_path('app/public/reports/' . $fileName);

                $file = fopen($filePath, 'w');

                fputcsv($file, ['ID', 'Name', 'Email', 'Phone', 'Address', 'Role', 'Status', 'Created At', 'Updated At']);
                foreach ($residents as $resident) {
                    fputcsv($file, [
                        $resident->id,
                        $resident->name,
                        $resident->email,
                        $resident->phone,
                        $resident->address,
                        $resident->role,
                        $resident->status,
                        $resident->created_at,
                        $resident->updated_at
                    ]);
                }
                fclose($file);

                $report->filePath = env('APP_URL') . '/storage/reports/' . $fileName;
                $report->status = 'Generated';
            }
            else if($report->filter == 'timings') {
                $timings = Timings::whereBetween('created_at', [$startDate, $endDate])->get();

                $fileName = 'timings_' . $startDate->format('Ymd') . '_' . $endDate->format('Ymd') . '.csv';
                if (!Storage::exists('app/public/reports')) {
                    Storage::makeDirectory('app/public/reports');
                }
                $filePath = storage_path('app/public/reports/' . $fileName);

                $file = fopen($filePath, 'w');

                fputcsv($file, ['ID', 'Name', 'Days of the Week', 'Start Time', 'End Time', 'Activity', 'User ID', 'Status', 'Created At', 'Updated At']);
                foreach ($timings as $timing) {
                    fputcsv($file, [
                        $timing->id,
                        $timing->name,
                        $timing->weekDays,
                        $timing->startTime,
                        $timing->endTime,
                        $timing->activity,
                        $timing->userId,
                        $timing->status,
                        $timing->created_at,
                        $timing->updated_at
                    ]);
                }
                fclose($file);

                $report->filePath = env('APP_URL') . '/storage/reports/' . $fileName;
                $report->status = 'Generated';
            }
            else if($report->filter == 'vehicles') {
                $vehicles = Vehicle::whereBetween('created_at', [$startDate, $endDate])->get();

                $fileName = 'vehicles_' . $startDate->format('Ymd') . '_' . $endDate->format('Ymd') . '.csv';
                if (!Storage::exists('app/public/reports')) {
                    Storage::makeDirectory('app/public/reports');
                }
                $filePath = storage_path('app/public/reports/' . $fileName);

                $file = fopen($filePath, 'w');

                fputcsv($file, ['ID', 'Tag No', 'Driving License', 'Number Plate', 'Phone', 'Address', 'User ID', 'Status', 'Created At', 'Updated At']);
                foreach ($vehicles as $vehicle) {
                    fputcsv($file, [
                        $vehicle->id,
                        $vehicle->tag_no,
                        $vehicle->driving_license,
                        $vehicle->number_plate,
                        $vehicle->phone,
                        $vehicle->address,
                        $vehicle->userId,
                        $vehicle->status,
                        $vehicle->created_at,
                        $vehicle->updated_at
                    ]);
                }
                fclose($file);

                $report->filePath = env('APP_URL') . '/storage/reports/' . $fileName;
                $report->status = 'Generated';
            }
            else if($report->filter == 'visitors') {
                $visitors = User::where('role', 'visitor')->whereBetween('created_at', [$startDate, $endDate])->get();

                $fileName = 'visitors_' . $startDate->format('Ymd') . '_' . $endDate->format('Ymd') . '.csv';
                if (!Storage::exists('app/public/reports')) {
                    Storage::makeDirectory('app/public/reports');
                }
                $filePath = storage_path('app/public/reports/' . $fileName);

                $file = fopen($filePath, 'w');

                fputcsv($file, ['ID', 'Name', 'Email', 'Phone', 'Address', 'Role', 'Status', 'Created At', 'Updated At']);
                foreach ($visitors as $visitor) {
                    fputcsv($file, [
                        $visitor->id,
                        $visitor->name,
                        $visitor->email,
                        $visitor->phone,
                        $visitor->address,
                        $visitor->role,
                        $visitor->status,
                        $visitor->created_at,
                        $visitor->updated_at
                    ]);
                }
                fclose($file);

                $report->filePath = env('APP_URL') . '/storage/reports/' . $fileName;
                $report->status = 'Generated';
            }

            $report->save();

            return response()->json([
                'status'=>200,
                'message'=>'Report requested successfully!'
            ]);
        }
    }

    /**
    * Read resources from storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function read( Request $request ) {
        $reports_query = Report::with(['user']);
        if($request->search) {
            $reports_query->where('name', 'LIKE', '%'.$request->search.'%');
        }

        $reports = $reports_query->get();

        return response()->json([
            'status'=>200,
            'data'=>$reports->toArray()
        ]);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Report  $report
    * @return \Illuminate\Http\Response
    */
    public function update( Request $request, $reportId ) {
        $report = Report::find( $reportId );

        if($request->userId) {
            if($request->userId == $report->userId) {
                if($request->name) $report->name = $request->name;
                if($request->startDate) $report->startDate = $request->startDate;
                if($request->endDate) $report->endDate = $request->endDate;
                if($request->filter) $report->filter = $request->filter;
                if($request->filePath) $report->filePath = $request->filePath;
                if($request->status) $report->status = $request->status;
                $report->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Report updated successfully!'
                ]);        
            }
            else {
                return response()->json([
                    'status'=>400,
                    'message'=>'Invalid User!'
                ]);
            }
        }
        return response()->json([
            'status'=>400,
            'message'=>'User ID is required!'
        ]);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Report  $report
    * @return \Illuminate\Http\Response
    */
    public function delete( Request $request, $reportId ) {
        $report = Report::find( $reportId );
        $report->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Report deleted successfully!'
        ]);
    }

    /**
    * Analyse resources from storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function analytics( Request $request ) {
        $vehicles_count = Vehicle::get()->count();
        $visitors_count = User::where('role', 'visitor')->count();
        $activities_count = Timing::get()->count();
        $events_count = Event::get()->count();

        $vehicles_graph = DB::table('vehicles')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->groupBy('date')
            ->get();

        $visitors_graph = DB::table('users')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->where('role', '=', 'visitor')
            ->groupBy('date')
            ->get();

        $result = [
            'count' => [
                'vehicles_count' => $vehicles_count,
                'visitors_count' => $visitors_count,
                'activities_count' => $activities_count,
                'events_count' => $events_count
            ],
            'graph' => [
                'vehicles_graph' => $vehicles_graph,
                'visitors_graph' => $visitors_graph
            ]
        ];

        return response()->json([
            'status'=>200,
            'data'=>$result
        ]);
    }
}