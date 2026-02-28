# Walkthrough - Daser Design Studio Internal System

The internal ERP/CRM system for "Daser Design Studio" is now complete. The system features a modular PHP architecture, RBAC, automated document numbering, and a dedicated Website Manager.

## Features Implemented

### 📊 Dashboard
- Real-time KPIs (Total Projects, Active Projects, Profit).
- Audit trail showing recent user activity.
- Modern UI using TailAdmin-inspired elements.

### 👤 Client Management
- Full CRUD for clients.
- Automated client code generation.
- Soft delete support.

### 🛠 Project Management
- **Automated Numbering**: `PR-0001` format using a transaction-safe `DocumentNumberService`.
- **Financial Module**: VAT calculations, material/labor cost tracking, and profit estimation.
- **Status Tracking**: DB-driven status system with history logging.
- **Notes & Files**: Internal notes and categorized secure file storage (`/storage/leads_files`).

### 🌐 Website Manager
- GUI to manage landing page sections (Hero, Contact).
- Atomic JSON generation (`site_content.json`) for the React frontend.
- File locking support to prevent data corruption.

## Security & Architecture
- **PHP 8 OOP**: Clean, modular structure using an Autoloader and Router.
- **RBAC Ready**: Base authentication with session-based security.
- **Secure Uploads**: Files stored outside the web root.
- **CSRF Protection**: Integrated service for form security.

## File Structure
- `/crm`: The main application logic.
- `/public_html/data`: Location for the generated `site_content.json`.
- `/storage/leads_files`: Secure directory for project assets.

---
*Developed by Daser AI*
