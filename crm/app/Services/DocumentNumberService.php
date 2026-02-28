<?php

namespace App\Services;

use Exception;
use PDO;

class DocumentNumberService {
    public static function getNextNumber($code) {
        $db = Database::getInstance();
        
        try {
            $db->beginTransaction();

            $stmt = $db->prepare("SELECT last_value, prefix FROM sequences WHERE code = ? FOR UPDATE");
            $stmt->execute([$code]);
            $sequence = $stmt->fetch();

            if (!$sequence) {
                throw new Exception("Sequence code '$code' not found.");
            }

            $newValue = $sequence['last_value'] + 1;
            $formattedNumber = $sequence['prefix'] . str_pad($newValue, 4, '0', STR_PAD_LEFT);

            $updateStmt = $db->prepare("UPDATE sequences SET last_value = ? WHERE code = ?");
            $updateStmt->execute([$newValue, $code]);

            $db->commit();
            return $formattedNumber;
        } catch (Exception $e) {
            $db->rollBack();
            throw $e;
        }
    }
}
