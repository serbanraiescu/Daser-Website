<?php
$token = $_GET['token'] ?? '';
if ($token !== 'daser_deploy_2026') die('403');

echo "<pre>";
echo "User: " . get_current_user() . "\n";
echo "Git Version: " . shell_exec('git --version') . "\n";
echo "Git Remote: " . shell_exec('git remote -v') . "\n";
echo "Git Status: " . shell_exec('git status') . "\n";
echo "</pre>";
