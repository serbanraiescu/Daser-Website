<?php

namespace App\Controllers;

use App\Services\Database;
use App\Services\DocumentNumberService;
use App\Services\ActivityLogService;
use Exception;

class ProjectController extends Controller {
    public function index() {
        $db = Database::getInstance();
        $stmt = $db->query("
            SELECT p.*, c.name as client_name, s.name as status_name, s.color as status_color 
            FROM projects p
            JOIN clients c ON p.client_id = c.id
            JOIN project_statuses s ON p.status_id = s.id
            WHERE p.deleted_at IS NULL
            ORDER BY p.created_at DESC
        ");
        $projects = $stmt->fetchAll();
        $this->render('projects/index', ['projects' => $projects]);
    }

    public function create() {
        $db = Database::getInstance();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                $db->beginTransaction();

                $projectNumber = DocumentNumberService::getNextNumber('PR');
                
                // 1. Create Project
                $stmt = $db->prepare("INSERT INTO projects (project_number, client_id, title, description, status_id, estimated_delivery_date) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $projectNumber,
                    $_POST['client_id'],
                    $_POST['title'],
                    $_POST['description'],
                    $_POST['status_id'],
                    $_POST['estimated_delivery_date']
                ]);
                $projectId = $db->lastInsertId();

                // 2. Create Financials
                $estValue = (float)($_POST['estimated_value'] ?? 0);
                $vatPercent = (float)($_POST['vat_percent'] ?? 19.00);
                $vatValue = ($estValue * $vatPercent) / 100;
                $totalWithVat = $estValue + $vatValue;

                $finStmt = $db->prepare("INSERT INTO project_financials (project_id, estimated_value, material_cost, labor_cost, vat_percent, vat_value, total_with_vat) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $finStmt->execute([
                    $projectId,
                    $estValue,
                    (float)($_POST['material_cost'] ?? 0),
                    (float)($_POST['labor_cost'] ?? 0),
                    $vatPercent,
                    $vatValue,
                    $totalWithVat
                ]);

                // 3. Log History
                $histStmt = $db->prepare("INSERT INTO project_status_history (project_id, new_status_id, changed_by) VALUES (?, ?, ?)");
                $histStmt->execute([$projectId, $_POST['status_id'], $_SESSION['user_id']]);

                ActivityLogService::log("Created Project", "projects", $projectId, "Number: $projectNumber");

                $db->commit();
                $this->redirect('/projects');
            } catch (Exception $e) {
                $db->rollBack();
                die("Error: " . $e->getMessage());
            }
        } else {
            $clients = $db->query("SELECT id, name FROM clients WHERE deleted_at IS NULL")->fetchAll();
            $statuses = $db->query("SELECT id, name FROM project_statuses ORDER BY sort_order")->fetchAll();
            $this->render('projects/create', ['clients' => $clients, 'statuses' => $statuses]);
        }
    }

    public function uploadFile($projectId) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
            $file = $_FILES['file'];
            $category = $_POST['category'] ?? 'design';
            
            $originalName = $file['name'];
            $extension = pathinfo($originalName, PATHINFO_EXTENSION);
            $storedName = uniqid('file_') . '.' . $extension;
            $uploadPath = __DIR__ . "/../../../storage/leads_files/" . $storedName;

            if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
                $db = Database::getInstance();
                $stmt = $db->prepare("INSERT INTO project_files (project_id, original_name, stored_name, file_category, uploaded_by) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$projectId, $originalName, $storedName, $category, $_SESSION['user_id']]);

                ActivityLogService::log("Uploaded File", "projects", $projectId, "File: $originalName");
                $this->redirect("/projects/view?id=$projectId");
            }
        }
    }
}
