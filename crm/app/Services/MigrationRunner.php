<?php

namespace App\Services;

use PDO;
use Exception;

class MigrationRunner {
    private $db;
    private $migrationsPath;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->migrationsPath = __DIR__ . '/../../database/migrations/';
    }

    public function run() {
        $this->ensureMigrationsTable();
        
        $executed = $this->getExecutedMigrations();
        $files = glob($this->migrationsPath . '*.php');
        sort($files);

        foreach ($files as $file) {
            $filename = basename($file);
            if (!in_array($filename, $executed)) {
                $this->executeMigration($file, $filename);
            }
        }

        $this->autoProvisionAdmin();
    }

    private function ensureMigrationsTable() {
        $sql = "CREATE TABLE IF NOT EXISTS `migrations` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `migration_name` VARCHAR(255) NOT NULL UNIQUE,
            `executed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;";
        $this->db->exec($sql);
    }

    private function getExecutedMigrations() {
        $stmt = $this->db->query("SELECT migration_name FROM migrations");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    private function executeMigration($file, $filename) {
        $this->db->beginTransaction();
        try {
            require_once $file;
            $className = 'Database\\Migrations\\' . pathinfo($filename, PATHINFO_FILENAME);
            if (class_exists($className)) {
                $migration = new $className();
                $migration->up($this->db);
            }

            $stmt = $this->db->prepare("INSERT INTO migrations (migration_name) VALUES (?)");
            $stmt->execute([$filename]);

            $this->db->commit();
        } catch (Exception $e) {
            $this->db->rollBack();
            throw new Exception("Migration failed: $filename - " . $e->getMessage());
        }
    }

    private function autoProvisionAdmin() {
        $email = 'admin@daserdesign.ro';
        $password = '$2y$10$3NvLV6u/d9rQTUjfDwujYeLqwGD71YXqv4srR9z7kt23nYG5lPARS'; // admin123

        // Check if admin exist
        $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            return;
        }

        $this->db->beginTransaction();
        try {
            // Ensure Administrator role exists
            $stmt = $this->db->prepare("SELECT id FROM roles WHERE name = 'Administrator'");
            $stmt->execute();
            $role = $stmt->fetch();
            $roleId = $role ? $role['id'] : null;

            if (!$roleId) {
                $this->db->exec("INSERT INTO roles (name, description) VALUES ('Administrator', 'Complet access to the system')");
                $roleId = $this->db->lastInsertId();
            }

            // Create admin user
            $stmt = $this->db->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->execute(['Admin Daser', $email, $password]);
            $userId = $this->db->lastInsertId();

            // Assign role
            $stmt = $this->db->prepare("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)");
            $stmt->execute([$userId, $roleId]);

            $this->db->commit();
        } catch (Exception $e) {
            $this->db->rollBack();
            // Silent fail for auto-provision or log it
        }
    }
}
