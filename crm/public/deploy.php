<?php
/**
 * Manual Deployment Fallback Script
 * Copies build artifacts from the repository to public_html.
 */

// Load .env to get the token
$envFile = __DIR__ . '/../../.env';
$deployToken = '';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        if (trim($name) === 'DEPLOY_TOKEN') {
            $deployToken = trim($value);
            break;
        }
    }
}

if (empty($deployToken)) {
    $deployToken = 'daser_deploy_2026';
}

// Token Validation
if (!isset($_GET['token']) || $_GET['token'] !== $deployToken || empty($deployToken)) {
    header("HTTP/1.1 403 Forbidden");
    echo json_encode(['success' => false, 'message' => 'Invalid or missing token.']);
    exit;
}

$repoRoot = '/home/qqgbtymm/daser_design';
$webRoot = '/home/qqgbtymm/public_html';
$source = $repoRoot . '/frontend/dist';
$logFile = $webRoot . '/deploy_check.txt';

$results = [
    'timestamp' => date('Y-m-d H:i:s'),
    'success' => false,
    'message' => '',
    'commit' => 'Unknown'
];

try {
    // 0. Optional Git Pull (Automation)
    if (isset($_GET['pull']) || isset($isWebhook)) {
        $originalDir = getcwd();
        if (is_dir($repoRoot)) {
            chdir($repoRoot);
            $pullOutput = shell_exec('git pull origin main 2>&1');
            $results['pull_output'] = $pullOutput;
            chdir($originalDir);
        }
    }

    // 1. Check if source exists
    if (!is_dir($source)) {
        throw new Exception("Source directory not found: $source");
    }

    // 2. Get the latest commit hash if possible
    $originalDir = getcwd();
    if (is_dir($repoRoot)) {
        chdir($repoRoot);
        $commitHash = @shell_exec('git rev-parse --short HEAD');
        if ($commitHash) {
            $results['commit'] = trim($commitHash);
        }
        chdir($originalDir);
    }

    // 3. Clean up old artifacts (Safety first!)
    // We only remove known frontend files/folders
    $toRemove = ['index.html', 'assets', 'vite.svg', 'deploy_diagnostic.php'];
    foreach ($toRemove as $item) {
        $path = $webRoot . '/' . $item;
        if (file_exists($path)) {
            if (is_dir($path)) {
                // Recursive delete for assets directory
                $files = new RecursiveIteratorIterator(
                    new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS),
                    RecursiveIteratorIterator::CHILD_FIRST
                );
                foreach ($files as $fileinfo) {
                    $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
                    $todo($fileinfo->getRealPath());
                }
                rmdir($path);
            } else {
                unlink($path);
            }
        }
    }

    // 4. Recursive Copy from source to destination
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($source, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    
    foreach ($files as $file) {
        $destPath = $webRoot . DIRECTORY_SEPARATOR . $files->getSubPathName();
        if ($file->isDir()) {
            if (!is_dir($destPath)) {
                mkdir($destPath, 0755, true);
            }
        } else {
            copy($file->getRealPath(), $destPath);
        }
    }

    $results['success'] = true;
    $results['message'] = 'Deployment successful.';

} catch (Exception $e) {
    $results['success'] = false;
    $results['message'] = $e->getMessage();
}

// Write the log
$logEntry = "[" . $results['timestamp'] . "] Commit: " . $results['commit'] . " | " . ($results['success'] ? 'SUCCESS' : 'FAILED') . " | " . $results['message'] . "\n";
file_put_contents($logFile, $logEntry, FILE_APPEND);

header('Content-Type: application/json');
echo json_encode($results);
