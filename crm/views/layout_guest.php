<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Daser Design Studio</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body { background-color: #f3f4f6; }
        .login-card { background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 class="mb-6 text-3xl font-bold text-center text-gray-800">Daser CRM</h2>
        <?php if (isset($error)): ?>
            <div class="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"><?php echo $error; ?></div>
        <?php endif; ?>
        <?php echo $content; ?>
    </div>
</body>
</html>
