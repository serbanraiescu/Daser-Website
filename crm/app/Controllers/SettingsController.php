<?php
namespace App\Controllers;

use App\Services\Database;
use App\Services\SettingsService;
use App\Services\ActivityLogService;

class SettingsController extends Controller {
    public function index() {
        $db = Database::getInstance();
        $settings = $db->query("SELECT * FROM settings")->fetchAll(\PDO::FETCH_ASSOC);
        $this->render('settings/index', ['settings' => $settings]);
    }

    public function save() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $db = Database::getInstance();
            $settings = $_POST['settings'] ?? [];
            
            try {
                $db->beginTransaction();
                foreach ($settings as $key => $value) {
                    $stmt = $db->prepare("UPDATE settings SET `value` = ? WHERE `key` = ?");
                    $stmt->execute([$value, $key]);
                }
                ActivityLogService::log("Updated System Settings");
                $db->commit();
                $this->redirect('/settings');
            } catch (\Exception $e) {
                $db->rollBack();
                die($e->getMessage());
            }
        }
    }
}
