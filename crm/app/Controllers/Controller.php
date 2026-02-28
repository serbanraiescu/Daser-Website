<?php

namespace App\Controllers;

abstract class Controller {
    protected function render($view, $data = [], $layout = 'layout') {
        extract($data);
        
        // Capture view content
        ob_start();
        include __DIR__ . "/../../views/$view.php";
        $content = ob_get_clean();

        // Include layout
        include __DIR__ . "/../../views/$layout.php";
    }

    protected function json($data, $status = 200) {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
    }

    protected function redirect($url) {
        header("Location: $url");
        exit;
    }
}
