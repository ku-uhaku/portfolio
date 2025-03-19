<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FileContentController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\FileManagerController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/file-manager', [FileManagerController::class, 'index'])->name('file-manager');
});

Route::get('portfolio', function () {
    return Inertia::render('portfolio');
})->name('portfolio');

Route::get('/api/file-content', [FileContentController::class, 'show']);
Route::middleware('web')->group(function () {
    Route::post('/api/file-content', [FileContentController::class, 'update']);
});

Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

Route::post('/login', [LoginController::class, 'store']);
Route::post('/logout', [LoginController::class, 'destroy']);

Route::middleware(['auth'])->group(function () {
    Route::get('/api/files', [FileManagerController::class, 'getFileStructure']);
    Route::post('/api/files', [FileManagerController::class, 'store']);
    Route::put('/api/files/{id}', [FileManagerController::class, 'update']);
    Route::delete('/api/files/{id}', [FileManagerController::class, 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
