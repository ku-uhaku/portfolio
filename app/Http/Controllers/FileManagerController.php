<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileManagerController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/FileManager', [
            'layout' => 'app-sidebar'
        ]);
    }

    public function getFileStructure()
    {
        $files = File::with('children')->whereNull('parent_id')->get();
        return response()->json($this->buildFileTree($files));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:file,folder',
            'path' => 'required|string',
            'extension' => 'nullable|string',
            'parent_id' => 'nullable|string',
            'content' => 'nullable|string',
        ]);

        $validated['file_id'] = uniqid('file_');
        
        File::create($validated);
        
        return response()->json(['message' => 'File created successfully']);
    }

    public function update(Request $request, $id)
    {
        $file = File::where('file_id', $id)->firstOrFail();
        
        $validated = $request->validate([
            'name' => 'string',
            'path' => 'string',
            'content' => 'nullable|string',
        ]);

        $file->update($validated);
        
        return response()->json(['message' => 'File updated successfully']);
    }

    public function destroy($id)
    {
        $file = File::where('file_id', $id)->firstOrFail();
        $file->delete();
        
        return response()->json(['message' => 'File deleted successfully']);
    }

    private function buildFileTree($files)
    {
        return $files->map(function ($file) {
            $item = [
                'id' => $file->file_id,
                'name' => $file->name,
                'type' => $file->type,
                'path' => $file->path,
            ];

            if ($file->extension) {
                $item['extension'] = $file->extension;
            }

            if ($file->children->count() > 0) {
                $item['children'] = $this->buildFileTree($file->children);
            }

            return $item;
        });
    }
} 