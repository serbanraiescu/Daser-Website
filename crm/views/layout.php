<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daser Design Studio - Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        :root { --sidebar-width: 280px; }
        body { background-color: #f1f5f9; color: #1e293b; }
        .sidebar { width: var(--sidebar-width); background-color: #1c2434; color: #dee4ee; transition: all 0.3s; }
        .main-content { margin-left: var(--sidebar-width); }
        .nav-link { display: flex; align-items: center; padding: 12px 16px; border-radius: 4px; transition: 0.2s; }
        .nav-link:hover { background-color: #333a48; color: white; }
        .card { background: white; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 24px; }
    </style>
</head>
<body class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="sidebar fixed h-full z-10">
        <div class="px-6 py-8">
            <h1 class="text-2xl font-bold text-white mb-8">DASER STUDIO</h1>
            <nav class="space-y-1">
                <a href="/dashboard" class="nav-link"><span>Dashboard</span></a>
                <a href="/clients" class="nav-link"><span>Clients</span></a>
                <a href="/projects" class="nav-link"><span>Projects</span></a>
                <a href="/website-manager" class="nav-link"><span>Website Manager</span></a>
                <a href="/settings" class="nav-link"><span>Settings</span></a>
            </nav>
        </div>
        <div class="absolute bottom-0 w-full p-6 border-t border-gray-700">
            <div class="flex items-center justify-between">
                <span class="text-sm"><?php echo $_SESSION['user_name'] ?? 'User'; ?></span>
                <a href="/logout" class="text-sm text-red-400 hover:text-red-300">Logout</a>
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content flex-1 p-8">
        <header class="mb-8 flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Dashboard</h2>
            <div class="flex items-center space-x-4">
                <!-- Header tools can go here -->
            </div>
        </header>
        
        <div class="container mx-auto">
            <?php echo $content; ?>
        </div>
    </main>
</body>
</html>
