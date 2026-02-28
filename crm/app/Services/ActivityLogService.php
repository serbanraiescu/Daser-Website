<?php

namespace App\Services;

class ActivityLogService {
    public static function log($action, $entityType = null, $entityId = null, $details = null) {
        $db = Database::getInstance();
        $userId = $_SESSION['user_id'] ?? null;
        $ip = $_SERVER['REMOTE_ADDR'] ?? null;

        $stmt = $db->prepare("INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$userId, $action, $entityType, $entityId, $details, $ip]);
    }
}
