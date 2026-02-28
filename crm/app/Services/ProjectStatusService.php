<?php

namespace App\Services;

class ProjectStatusService {
    public static function getAll() {
        $db = Database::getInstance();
        $stmt = $db->query("SELECT * FROM project_statuses ORDER BY sort_order ASC");
        return $stmt->fetchAll();
    }

    public static function getDefault() {
        $db = Database::getInstance();
        $stmt = $db->query("SELECT * FROM project_statuses WHERE is_default = 1 LIMIT 1");
        return $stmt->fetch();
    }
}
