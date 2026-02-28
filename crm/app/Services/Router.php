<?php

namespace App\Services;

class Router {
    protected $routes = [];
    protected $middleware = [];

    public function add($method, $path, $controller, $action, $middleware = []) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'controller' => $controller,
            'action' => $action,
            'middleware' => $middleware
        ];
    }

    public function dispatch($requestedMethod, $requestedUri) {
        $uri = parse_url($requestedUri, PHP_URL_PATH);
        
        // Basic normalization for relative paths if needed
        $uri = rtrim($uri, '/') ?: '/';

        foreach ($this->routes as $route) {
            $pattern = $this->convertToRegex($route['path']);
            if ($route['method'] === $requestedMethod && preg_match($pattern, $uri, $matches)) {
                array_shift($matches); // Remove full match
                $this->executeRoute($route, $matches);
                return;
            }
        }

        $this->handle404();
    }

    protected function convertToRegex($path) {
        return "#^" . preg_replace('/\{([a-zA-Z0-9_]+)\}/', '([^/]+)', $path) . "$#";
    }

    protected function executeRoute($route, $params) {
        // Handle Middleware
        foreach ($route['middleware'] as $mwClass) {
            $mw = new $mwClass();
            if (!$mw->handle()) {
                return; // Middleware blocked execution
            }
        }

        $controllerName = "App\\Controllers\\" . $route['controller'];
        $action = $route['action'];

        if (class_exists($controllerName)) {
            $controller = new $controllerName();
            if (method_exists($controller, $action)) {
                call_user_func_array([$controller, $action], $params);
            } else {
                throw new \Exception("Action $action not found in $controllerName");
            }
        } else {
            throw new \Exception("Controller $controllerName not found");
        }
    }

    protected function handle404() {
        header("HTTP/1.0 404 Not Found");
        echo "404 Not Found";
    }
}
