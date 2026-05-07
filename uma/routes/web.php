<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

// --- GAST PAGINA'S ---

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio');
})->name('portfolio');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// --- CONTACT FORMULIER AFHANDELING ---

Route::post('/contact', function (Request $request) {
    // 1. Validatie (Subject toegevoegd omdat dit in je React formulier staat)
    $data = $request->validate([
        'name'    => 'required|string|max:255',
        'email'   => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    // 2. Log de data (of verstuur mail)
    Log::info('New Portfolio Contact from ' . $data['name'], $data);

    // 3. Redirect naar de contactpagina met een succes-flash message
    return back()->with('success', 'Message sent successfully!');
});

// --- STANDAARD AUTH ROUTES (Dashboard/Profiel) ---

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';