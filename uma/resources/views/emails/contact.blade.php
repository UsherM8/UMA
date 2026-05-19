<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nieuw contactbericht</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; color: #1e293b;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h2 style="color: #2563eb; margin-top: 0; font-style: italic;">Nieuw bericht van {{ $data['name'] }}</h2>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        
        <p><strong>Naam:</strong> {{ $data['name'] }}</p>
        <p><strong>E-mailadres:</strong> {{ $data['email'] }}</p>
        <p><strong>Onderwerp:</strong> {{ $data['subject'] }}</p>
        
        <p><strong>Bericht:</strong></p>
        <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; color: #334155; line-height: 1.5;">
            {!! nl2br(e($data['message'])) !!}
        </div>
    </div>
</body>
</html>