-- Database Schema for Daser Design Studio Internal System

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Roles & Permissions (RBAC)
CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `description` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `permissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `role_permissions` (
    `role_id` INT NOT NULL,
    `permission_id` INT NOT NULL,
    PRIMARY KEY (`role_id`, `permission_id`),
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 2. Users
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `user_roles` (
    `user_id` INT NOT NULL,
    `role_id` INT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Clients
CREATE TABLE IF NOT EXISTS `clients` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `client_code` VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(20),
    `email` VARCHAR(150),
    `company` VARCHAR(150),
    `vat_number` VARCHAR(50),
    `address` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB;

-- 4. Project Statuses
CREATE TABLE IF NOT EXISTS `project_statuses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `color` VARCHAR(20) DEFAULT '#cccccc',
    `is_default` TINYINT(1) DEFAULT 0,
    `sort_order` INT DEFAULT 0
) ENGINE=InnoDB;

-- 5. Projects
CREATE TABLE IF NOT EXISTS `projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_number` VARCHAR(20) NOT NULL UNIQUE,
    `client_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `status_id` INT NOT NULL,
    `assigned_to` INT,
    `estimated_delivery_date` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`),
    FOREIGN KEY (`status_id`) REFERENCES `project_statuses`(`id`),
    FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- 6. Project Financials
CREATE TABLE IF NOT EXISTS `project_financials` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NOT NULL UNIQUE,
    `estimated_value` DECIMAL(15, 2) DEFAULT 0.00,
    `material_cost` DECIMAL(15, 2) DEFAULT 0.00,
    `labor_cost` DECIMAL(15, 2) DEFAULT 0.00,
    `vat_percent` DECIMAL(5, 2) DEFAULT 19.00,
    `vat_value` DECIMAL(15, 2) DEFAULT 0.00,
    `total_with_vat` DECIMAL(15, 2) DEFAULT 0.00,
    `financial_status` ENUM('nefacturat', 'facturat', 'incasat') DEFAULT 'nefacturat',
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Project Notes & History
CREATE TABLE IF NOT EXISTS `project_notes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NOT NULL,
    `content` TEXT NOT NULL,
    `visibility` ENUM('internal', 'manager_only') DEFAULT 'internal',
    `created_by` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `project_status_history` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NOT NULL,
    `old_status_id` INT,
    `new_status_id` INT NOT NULL,
    `changed_by` INT NOT NULL,
    `changed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`old_status_id`) REFERENCES `project_statuses`(`id`),
    FOREIGN KEY (`new_status_id`) REFERENCES `project_statuses`(`id`),
    FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- 8. Project Files
CREATE TABLE IF NOT EXISTS `project_files` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NOT NULL,
    `original_name` VARCHAR(255) NOT NULL,
    `stored_name` VARCHAR(255) NOT NULL,
    `file_category` ENUM('design', 'client_upload', 'oferta', 'factura', 'productie', 'montaj') DEFAULT 'design',
    `uploaded_by` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- 9. System Services (Sequences, Settings, Logs)
CREATE TABLE IF NOT EXISTS `sequences` (
    `code` VARCHAR(10) PRIMARY KEY,
    `last_value` INT NOT NULL DEFAULT 0,
    `prefix` VARCHAR(10),
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(100) NOT NULL UNIQUE,
    `value` TEXT,
    `description` VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `activity_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `action` VARCHAR(255) NOT NULL,
    `entity_type` VARCHAR(50),
    `entity_id` INT,
    `details` TEXT,
    `ip_address` VARCHAR(45),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 10. Website Manager
CREATE TABLE IF NOT EXISTS `website_content` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `section` VARCHAR(50) NOT NULL UNIQUE,
    `content_json` LONGTEXT NOT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed Initial Data
INSERT IGNORE INTO `roles` (`name`, `description`) VALUES 
('Administrator', 'Complet access to the system'),
('Manager', 'Management access to projects and clients'),
('Staff', 'Access to projects assigned to them');

INSERT IGNORE INTO `project_statuses` (`name`, `color`, `is_default`, `sort_order`) VALUES 
('lead', '#3b82f6', 1, 1),
('ofertat', '#f59e0b', 0, 2),
('în lucru', '#8b5cf6', 0, 3),
('finalizat', '#10b981', 0, 4),
('pierdut', '#ef4444', 0, 5);

INSERT IGNORE INTO `sequences` (`code`, `last_value`, `prefix`) VALUES 
('PR', 0, 'PR-'),
('OF', 0, 'OF-'),
('INV', 0, 'INV-');

INSERT IGNORE INTO `settings` (`key`, `value`, `description`) VALUES 
('upload_max_size', '10485760', 'Max upload size in bytes (10MB default)'),
('allowed_file_types', 'jpg,jpeg,png,webp,pdf', 'Allowed file extensions'),
('company_name', 'Daser Design Studio', 'Company name for headers and reports');

SET FOREIGN_KEY_CHECKS = 1;
