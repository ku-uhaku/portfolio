<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class FileContentController extends Controller
{
    public function show(Request $request)
    {
        $path = $request->query('path');
        
        // Remove leading slash and prepend the resources path
        $path = ltrim($path, '/');
        $fullPath = resource_path($path);

        if (!File::exists($fullPath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $content = File::get($fullPath);
        return response($content)->header('Content-Type', 'text/plain');
    }

    public function update(Request $request)
    {
        try {
            $validated = $request->validate([
                'path' => 'required|string',
                'content' => 'required|string',
            ]);
            
            $path = $validated['path'];
            $content = $validated['content'];
            
            // Remove any attempts to navigate up directories
            $path = str_replace('..', '', $path);
            $fullPath = resource_path($path);
            
            if (!File::exists(dirname($fullPath))) {
                return response()->json(['error' => 'Directory not found'], 404);
            }
            
            File::put($fullPath, $content);
            
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
} 