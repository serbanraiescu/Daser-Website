<?php

namespace App\Services;

class Security {
    public static function generateCsrfToken() {
        if (session_status() === PHP_SESSION_NONE) session_start();
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    public static function validateCsrfToken($token) {
        if (session_status() === PHP_SESSION_NONE) session_start();
        return !empty($token) && hash_equals($_SESSION['csrf_token'], $token);
    }
}
