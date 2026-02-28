<?php

namespace App\Controllers;

use App\Services\Database;

class DashboardController extends Controller {
    public function index() {
        $db = Database::getInstance();
        
        // KPIs
        $totalProjects = $db->query("SELECT COUNT(*) FROM projects WHERE deleted_at IS NULL")->fetchColumn();
        $inProgressStatusId = $db->query("SELECT id FROM project_statuses WHERE name = 'în lucru' LIMIT 1")->fetchColumn();
        $activeProjects = $db->prepare("SELECT COUNT(*) FROM projects WHERE status_id = ? AND deleted_at IS NULL");
        $activeProjects->execute([$inProgressStatusId]);
        $activeCount = $activeProjects->fetchColumn();

        $totalProfit = $db->query("
            SELECT SUM(estimated_value - material_cost - labor_cost) 
            FROM project_financials pf
            JOIN projects p ON pf.project_id = p.id
            WHERE p.deleted_at IS NULL
        ")->fetchColumn();

        // Recent Activity
        $recentActivity = $db->query("
            SELECT a.*, u.name as user_name 
            FROM activity_logs a 
            LEFT JOIN users u ON a.user_id = u.id 
            ORDER BY a.created_at DESC LIMIT 10
        ")->fetchAll();

        $this->render('dashboard/index', [
            'stats' => [
                'total' => $totalProjects,
                'active' => $activeCount,
                'profit' => $totalProfit
            ],
            'recent' => $recentActivity
        ]);
    }
}
