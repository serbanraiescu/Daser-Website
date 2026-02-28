<?php

namespace App\Services;

use PDO;
use PDOException;

class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $host = env('DB_HOST', 'localhost');
        $db   = env('DB_NAME', 'daser_crm');
        $user = env('DB_USER', 'root');
        $pass = env('DB_PASS', '');
        $charset = 'utf8mb4';

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->connection = new PDO($dsn, $user, $pass, $options);
        } catch (PDOException $e) {
            $errorMessage = "Database connection failed: " . $e->getMessage();
            
            // Log for everyone
            $logPath = __DIR__ . '/../../storage/logs/app.log';
            if (!is_dir(dirname($logPath))) mkdir(dirname($logPath), 0755, true);
            file_put_contents($logPath, "[" . date('Y-m-d H:i:s') . "] " . $errorMessage . PHP_EOL, FILE_APPEND);

            if (env('APP_ENV') === 'development') {
                throw new PDOException($errorMessage, (int)$e->getCode());
            } else {
                header("HTTP/1.1 500 Internal Server Error");
                echo "A data connection error occurred. Please try again later.";
                exit;
            }
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance->getConnection();
    }

    public function getConnection() {
        return $this->connection;
    }
}
