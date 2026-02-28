<?php

namespace App\Services;

class SettingsService {
    private static $settings = null;

    private static function load() {
        if (self::$settings === null) {
            $db = Database::getInstance();
            $stmt = $db->query("SELECT `key`, `value` FROM settings");
            self::$settings = $stmt->fetchAll(\PDO::FETCH_KEY_PAIR);
        }
    }

    public static function get($key, $default = null) {
        self::load();
        return self::$settings[$key] ?? $default;
    }

    public static function set($key, $value) {
        $db = Database::getInstance();
        $stmt = $db->prepare("UPDATE settings SET `value` = ? WHERE `key` = ?");
        $stmt->execute([$value, $key]);
        self::$settings = null; // Invalidate cache
    }
}
