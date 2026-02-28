<?php

namespace App\Controllers;

use App\Services\Database;
use App\Services\ActivityLogService;

class WebsiteController extends Controller {
    public function index() {
        $db = Database::getInstance();
        $content = $db->query("SELECT section, content_json FROM website_content")->fetchAll(\PDO::FETCH_KEY_PAIR);
        $this->render('website/manager', [
            'content' => $content,
            'deployToken' => env('DEPLOY_TOKEN', 'daser_deploy_2026')
        ]);
    }

    public function save() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $db = Database::getInstance();
            $data = $_POST['website'];
            
            try {
                $db->beginTransaction();

                foreach ($data as $section => $content) {
                    $jsonContent = json_encode($content);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        throw new \Exception("Invalid JSON for section: $section");
                    }

                    $stmt = $db->prepare("INSERT INTO website_content (section, content_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_json = ?");
                    $stmt->execute([$section, $jsonContent, $jsonContent]);
                }

                // Generate public JSON
                $this->generatePublicJson($db);

                ActivityLogService::log("Updated Website Content");
                $db->commit();
                $this->redirect('/website-manager');
            } catch (\Exception $e) {
                $db->rollBack();
                die($e->getMessage());
            }
        }
    }

    private function generatePublicJson($db) {
        $stmt = $db->query("SELECT section, content_json FROM website_content");
        $results = $stmt->fetchAll(\PDO::FETCH_KEY_PAIR);
        
        $finalData = [];
        foreach ($results as $section => $json) {
            $finalData[$section] = json_decode($json, true);
        }

        // Correct path to reach /home/qqgbtymm/public_html from /home/qqgbtymm/daser_design/crm/app/Controllers/
        $filePath = __DIR__ . "/../../../../public_html/data/site_content.json";
        $dirPath = dirname($filePath);

        if (!is_dir($dirPath)) {
            mkdir($dirPath, 0755, true);
        }

        file_put_contents($filePath, json_encode($finalData, JSON_PRETTY_PRINT), LOCK_EX);
    }
}
