<?php

namespace App\Controllers;

use App\Services\Database;
use App\Services\ActivityLogService;

class WebsiteController extends Controller {
    public function index() {
        $db = Database::getInstance();
        $content = $db->query("SELECT section, content_json FROM website_content")->fetchAll(\PDO::FETCH_KEY_PAIR);
        
        // Auto-generate if missing to prevent frontend 404s
        if (!file_exists("/home/qqgbtymm/public_html/data/site_content.json")) {
            $this->generatePublicJson($db);
        }

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

        // --- AI SEO & SCHEMA GENERATION ---
        $this->enrichWithSEO($finalData);

        // Save JSON
        $filePath = "/home/qqgbtymm/public_html/data/site_content.json";
        if (!is_dir(dirname($filePath))) mkdir(dirname($filePath), 0755, true);
        file_put_contents($filePath, json_encode($finalData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

        // Generate Sitemap & Robots
        $this->generateSitemap($finalData);
        $this->generateRobots();
    }

    private function enrichWithSEO(&$data) {
        $brand = "Daser Design Studio";
        $location = "Câmpulung Moldovenesc, Suceava";

        if (!isset($data['pages'])) return;

        foreach ($data['pages'] as $pageKey => &$page) {
            if (!isset($page['seo'])) $page['seo'] = [];
            
            // Auto Title
            if (empty($page['seo']['title'])) {
                $rawTitle = $page['hero']['title'] ?? ucfirst($pageKey);
                $page['seo']['title'] = mb_strimwidth("$rawTitle | $brand", 0, 60, "...");
            }

            // Auto Description
            if (empty($page['seo']['description'])) {
                $rawDesc = $page['hero']['subtitle'] ?? "Servicii profesionale de print și publicitate în $location. Calitate garantată.";
                $page['seo']['description'] = mb_strimwidth($rawDesc, 0, 160, "...");
            }

            // Shared OG/Canonical
            $page['seo']['canonical'] = "https://daserdesign.ro/" . ($pageKey === 'home' ? '' : $pageKey);
            $page['seo']['og_title'] = $page['seo']['title'];
            $page['seo']['og_description'] = $page['seo']['description'];

            // JSON-LD LocalBusiness (Common for all pages)
            $page['seo']['schema_jsonld'] = [
                "@context" => "https://schema.org",
                "@type" => "LocalBusiness",
                "name" => $brand,
                "image" => "https://daserdesign.ro/assets/logo-og.png",
                "address" => [
                    "@type" => "PostalAddress",
                    "addressLocality" => "Câmpulung Moldovenesc",
                    "addressRegion" => "Suceava",
                    "addressCountry" => "RO"
                ],
                "geo" => [
                    "@type" => "GeoCoordinates",
                    "latitude" => 47.5303,
                    "longitude" => 25.5511
                ],
                "url" => "https://daserdesign.ro",
                "telephone" => $data['company']['contact']['phone'] ?? ""
            ];
        }
    }

    private function generateSitemap($data) {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;
        
        $pages = $data['pages'] ?? [];
        foreach ($pages as $key => $page) {
            $url = "https://daserdesign.ro/" . ($key === 'home' ? '' : $key);
            $xml .= "  <url><loc>$url</loc><priority>" . ($key === 'home' ? '1.0' : '0.8') . "</priority></url>" . PHP_EOL;
        }

        $xml .= '</urlset>';
        file_put_contents("/home/qqgbtymm/public_html/sitemap.xml", $xml, LOCK_EX);
    }

    private function generateRobots() {
        $txt = "User-agent: *\nAllow: /\n\nSitemap: https://daserdesign.ro/sitemap.xml";
        file_put_contents("/home/qqgbtymm/public_html/robots.txt", $txt, LOCK_EX);
    }
}
