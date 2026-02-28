<?php

namespace App\Services;

class ErrorHandler {
    public static function register() {
        set_exception_handler([self::class, 'handleException']);
        set_error_handler([self::class, 'handleError']);
        register_shutdown_function([self::class, 'handleShutdown']);
    }

    public static function handleException($e) {
        self::logError($e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
        self::renderError($e);
    }

    public static function handleError($level, $message, $file, $line) {
        if (!(error_reporting() & $level)) return;
        throw new \ErrorException($message, 0, $level, $file, $line);
    }

    public static function handleShutdown() {
        $error = error_get_last();
        if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
            self::handleException(new \ErrorException($error['message'], 0, $error['type'], $error['file'], $error['line']));
        }
    }

    private static function logError($message) {
        $logPath = __DIR__ . '/../../storage/logs/app.log';
        if (!is_dir(dirname($logPath))) {
            mkdir(dirname($logPath), 0755, true);
        }
        $timestamp = date('Y-m-d H:i:s');
        file_put_contents($logPath, "[$timestamp] $message" . PHP_EOL, FILE_APPEND);
    }

    private static function renderError($e) {
        $env = defined('APP_ENV') ? APP_ENV : (function_exists('env') ? env('APP_ENV', 'production') : 'production');
        
        if (php_sapi_name() === 'cli') {
            echo "ERROR: " . $e->getMessage() . PHP_EOL;
            return;
        }

        if (!headers_sent()) {
            header("HTTP/1.1 500 Internal Server Error");
        }

        if ($env === 'development') {
            echo "<html><body style='font-family:sans-serif; padding:2rem; background:#fff5f5;'>";
            echo "<h1 style='color:#c53030;'>Internal Server Error</h1>";
            echo "<p><strong>Message:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
            echo "<p><strong>File:</strong> " . htmlspecialchars($e->getFile()) . " on line " . $e->getLine() . "</p>";
            echo "<h3>Stack Trace:</h3><pre style='background:#f7fafc; padding:1rem; border:1px solid #e2e8f0; overflow:auto;'>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
            echo "</body></html>";
        } else {
            echo "<html><body style='font-family:sans-serif; text-align:center; padding:5rem;'>";
            echo "<h1>Something went wrong</h1>";
            echo "<p>We've logged the error and are looking into it. Please try again later.</p>";
            echo "</body></html>";
        }
        exit;
    }
}
