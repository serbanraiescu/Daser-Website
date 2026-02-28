<?php

namespace App\Controllers;

use App\Services\Database;
use App\Services\ActivityLogService;

class AuthController extends Controller {
    public function showLogin() {
        $this->render('auth/login', [], 'layout_guest');
    }

    public function login() {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        $db = Database::getInstance();
        $stmt = $db->prepare("SELECT * FROM users WHERE email = ? AND deleted_at IS NULL");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            
            // Log activity
            ActivityLogService::log("User Login", "users", $user['id']);

            $this->redirect('/dashboard');
        } else {
            $this->render('auth/login', ['error' => 'Invalid credentials'], 'layout_guest');
        }
    }

    public function logout() {
        session_start();
        ActivityLogService::log("User Logout");
        session_destroy();
        $this->redirect('/login');
    }
}
