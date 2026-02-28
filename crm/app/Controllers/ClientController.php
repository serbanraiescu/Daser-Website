<?php

namespace App\Controllers;

use App\Services\Database;
use App\Services\ActivityLogService;

class ClientController extends Controller {
    public function index() {
        $db = Database::getInstance();
        $stmt = $db->query("SELECT * FROM clients WHERE deleted_at IS NULL ORDER BY name ASC");
        $clients = $stmt->fetchAll();
        $this->render('clients/index', ['clients' => $clients]);
    }

    public function create() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $db = Database::getInstance();
            $clientCode = 'CL-' . strtoupper(substr(uniqid(), -4));
            
            $stmt = $db->prepare("INSERT INTO clients (client_code, name, phone, email, company, vat_number, address) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $clientCode,
                $_POST['name'],
                $_POST['phone'],
                $_POST['email'],
                $_POST['company'],
                $_POST['vat_number'],
                $_POST['address']
            ]);

            ActivityLogService::log("Created Client", "clients", $db->lastInsertId());
            $this->redirect('/clients');
        } else {
            $this->render('clients/create');
        }
    }
}
