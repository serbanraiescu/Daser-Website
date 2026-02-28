<?php

use App\Services\Autoloader;
use App\Services\EnvLoader;
use App\Services\Router;
use App\Services\MigrationRunner;

Autoloader::register();

// Load Environment
$env = new EnvLoader(__DIR__ . '/../../.env');
$env->load();

// Auto-run Migrations
$migrations = new MigrationRunner();
$migrations->run();

$router = new Router();

// Auth Routes
$router->add('GET', '/login', 'AuthController', 'showLogin');
$router->add('POST', '/login', 'AuthController', 'login');
$router->add('GET', '/logout', 'AuthController', 'logout');

// Dashboard (Protected)
$router->add('GET', '/dashboard', 'DashboardController', 'index', [\App\Middleware\AuthMiddleware::class]);
$router->add('GET', '/', 'DashboardController', 'index', [\App\Middleware\AuthMiddleware::class]);

// Clients (Protected)
$router->add('GET', '/clients', 'ClientController', 'index', [\App\Middleware\AuthMiddleware::class]);

// Projects (Protected)
$router->add('GET', '/projects', 'ProjectController', 'index', [\App\Middleware\AuthMiddleware::class]);
$router->add('GET', '/projects/create', 'ProjectController', 'create', [\App\Middleware\AuthMiddleware::class]);
$router->add('POST', '/projects/create', 'ProjectController', 'create', [\App\Middleware\AuthMiddleware::class]);

// Website Manager (Protected)
$router->add('GET', '/website-manager', 'WebsiteController', 'index', [\App\Middleware\AuthMiddleware::class]);
$router->add('POST', '/website-manager/save', 'WebsiteController', 'save', [\App\Middleware\AuthMiddleware::class]);

// Dispatch
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
