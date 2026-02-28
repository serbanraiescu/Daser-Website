<?php

namespace App\Middleware;

class AuthMiddleware {
    public function handle() {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            header("Location: /login");
            exit;
        }
        return true;
    }

    public static function checkPermission($permission) {
        // Implementation of RBAC check
        // This will be expanded once the User/Role models are ready
        return true; 
    }
}
