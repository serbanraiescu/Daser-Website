<?php
/**
 * cPanel Git Deployment Diagnostic Script
 * Usage: /deploy_diagnostic.php?token=daser_debug_2026
 */

// --- CONFIGURATION ---
$secret_token = 'daser_debug_2026';
$repo_root = '/home/qqgbtymm/daser_design';
$web_root = '/home/qqgbtymm/public_html';

// --- SECURITY CHECK ---
if (!isset($_GET['token']) || $_GET['token'] !== $secret_token) {
    header("HTTP/1.1 404 Not Found");
    echo "<h1>404 Not Found</h1>";
    exit;
}

// --- HELPER FUNCTIONS ---
function get_perms($path) {
    if (!file_exists($path)) return 'N/A';
    return substr(sprintf('%o', fileperms($path)), -4);
}

function check_path($path, $is_dir = true) {
    $exists = $is_dir ? is_dir($path) : file_exists($path);
    $readable = is_readable($path);
    $writable = is_writable($path);
    $owner = file_exists($path) ? fileowner($path) : 'N/A';
    $group = file_exists($path) ? filegroup($path) : 'N/A';
    
    $status = $exists ? '<b style="color:green;">PASS</b>' : '<b style="color:red;">FAIL</b>';
    
    echo "<tr>
            <td>$path</td>
            <td>$status</td>
            <td>" . ($readable ? 'Yes' : 'No') . "</td>
            <td>" . ($writable ? 'Yes' : 'No') . "</td>
            <td>" . get_perms($path) . "</td>
            <td>$owner / $group</td>
          </tr>";
    return $exists;
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Deployment Diagnostics</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 1000px; margin: 20px auto; padding: 20px; background: #f4f4f4; }
        .section { background: #fff; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #d01d83; border-bottom: 2px solid #d01d83; padding-bottom: 10px; }
        h2 { color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #eee; font-size: 14px; }
        th { background: #f9f9f9; }
        pre { background: #333; color: #fff; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .log-entry { margin: 5px 0; border-left: 4px solid #ddd; padding-left: 10px; }
        .pass { color: green; font-weight: bold; }
        .fail { color: red; font-weight: bold; }
    </style>
</head>
<body>

    <h1>🚀 cPanel Git Deployment Diagnostics</h1>

    <div class="section">
        <h2>📂 Environment Info</h2>
        <table>
            <tr><th>Metric</th><th>Value</th></tr>
            <tr><td>PHP Version</td><td><?php echo PHP_VERSION; ?></td></tr>
            <tr><td>Current Script User</td><td><?php echo get_current_user(); ?> (UID: <?php echo getmyuid(); ?>)</td></tr>
            <tr><td>Server Owner</td><td><?php echo function_exists('posix_getpwuid') ? posix_getpwuid(posix_geteuid())['name'] : 'N/A'; ?></td></tr>
            <tr><td>Document Root</td><td><?php echo $_SERVER['DOCUMENT_ROOT']; ?></td></tr>
            <tr><td>Script Path</td><td><?php echo __FILE__; ?></td></tr>
        </table>
    </div>

    <div class="section">
        <h2>🔍 Path Connectivity & Permissions</h2>
        <table>
            <tr>
                <th>Path</th>
                <th>Exists</th>
                <th>Read</th>
                <th>Write</th>
                <th>Perms</th>
                <th>UID/GID</th>
            </tr>
            <?php
            check_path($repo_root);
            check_path($repo_root . '/frontend');
            check_path($repo_root . '/frontend/dist');
            check_path($repo_root . '/frontend/dist/index.html', false);
            check_path($repo_root . '/.cpanel.yml', false);
            check_path($repo_root . '/cpanel.yml', false);
            check_path($web_root);
            ?>
        </table>
    </div>

    <div class="section">
        <h2>🔥 Smoke Tests</h2>
        <div class="log-entry">
            <strong>1. Write test to public_html/deploy_check.txt:</strong>
            <?php
            $test_file = $web_root . '/deploy_check.txt';
            $content = "Diagnostic check at " . date('Y-m-d H:i:s') . "\nUser: " . get_current_user();
            if (@file_put_contents($test_file, $content)) {
                echo '<span class="pass">PASS</span> - File written successfully.';
            } else {
                $err = error_get_last();
                echo '<span class="fail">FAIL</span> - Could not write file. Error: ' . ($err['message'] ?? 'Unknown');
            }
            ?>
        </div>
        <div class="log-entry">
            <strong>2. Manual copy test (dist/index.html -> public_html):</strong>
            <?php
            $src = $repo_root . '/frontend/dist/index.html';
            $dst = $web_root . '/diagnostic_copied_index.html';
            if (!file_exists($src)) {
                echo '<span class="fail">SKIP</span> - Source index.html not found in repo.';
            } else {
                if (@copy($src, $dst)) {
                    echo '<span class="pass">PASS</span> - index.html copied successfully.';
                } else {
                    $err = error_get_last();
                    echo '<span class="fail">FAIL</span> - Copy failed. Error: ' . ($err['message'] ?? 'Unknown');
                }
            }
            ?>
        </div>
    </div>

    <div class="section">
        <h2>📜 Recent Deployment Logs (Attempt)</h2>
        <pre><?php
            $log_path = $repo_root . '/.cpanel.yml.log';
            if (file_exists($log_path)) {
                echo htmlspecialchars(file_get_contents($log_path));
            } else {
                // Try home level cpanel logs if available
                $home_cpanel_log = '/home/qqgbtymm/.cpanel/logs/deployment_last.log'; // Common path
                if (file_exists($home_cpanel_log)) {
                    echo "--- cPanel Deployment Log ---\n";
                    echo htmlspecialchars(file_get_contents($home_cpanel_log));
                } else {
                    echo "No deployment logs found at $log_path or in .cpanel directory.";
                }
            }
        ?></pre>
    </div>

</body>
</html>
