<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;

/*
|--------------------------------------------------------------------------
| Setup Route (Eenmalig uitvoeren op Hostinger)
|--------------------------------------------------------------------------
*/
Route::get('/force-link', function () {
    $target = storage_path('app/public');
    $link = public_path('storage');

    if (file_exists($link)) {
        return 'De storage link bestaat al in de public map.';
    }

    try {
        symlink($target, $link);
        return 'Succes! De storage link is handmatig aangemaakt.';
    } catch (\Exception $e) {
        return 'Fout bij aanmaken link: ' . $e->getMessage();
    }
});

/*
|--------------------------------------------------------------------------
| Cache Opschonen Route (Bezoek dit via je browser bij een 500-fout)
|--------------------------------------------------------------------------
*/
Route::get('/clear-cache', function () {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('route:clear');
    return 'Laravel configuratie-, route- en applicatiecache zijn succesvol gewist!';
});

/*
|--------------------------------------------------------------------------
| Portfolio Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio');
})->name('portfolio');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Contact Formulier Afhandeling naar Hostinger Mail
// Contact Formulier Afhandeling naar Outlook
Route::post('/contact', function (Request $request) {
    $data = $request->validate([
        'name'    => 'required|string|max:255',
        'email'   => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    Log::info('Nieuw contactbericht ontvangen:', $data);

    try {
        // HIER AANGEPAST: Hostinger stuurt de mail nu rechtstreeks door naar jouw Outlook!
        Mail::to('ushermissiedjan@outlook.com')
            ->send(new ContactMessage($data));
            
        return back()->with('success', 'Bedankt! Je bericht is succesvol verzonden.');
    } catch (\Exception $e) {
        Log::error('Mail verzenden mislukt: ' . $e->getMessage());
        
        return back()->withErrors(['message' => 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.']);
    }
});

// NOTITIE: Auth & Dashboard-routes compleet weggelaten wegens DB_CONNECTION=null