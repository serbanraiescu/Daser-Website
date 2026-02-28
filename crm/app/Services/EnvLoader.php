<?php

namespace App\Services {
    class EnvLoader {
        protected $path;

        public function __construct($path = null) {
            // Resolve absolute path to project root
            if ($path === null) {
                $path = __DIR__ . '/../../../.env';
            }
            
            $this->path = realpath($path) ?: $path;

            if (!file_exists($this->path)) {
                throw new \Exception("Environment configuration file (.env) not found at: {$this->path}. Please create it using .env.example as a template.");
            }
        }

        public function load() {
            $lines = file($this->path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) {
                    continue;
                }

                if (strpos($line, '=') !== false) {
                    list($name, $value) = explode('=', $line, 2);
                    $name = trim($name);
                    $value = trim($value);

                    // Remove quotes if present
                    $value = trim($value, '"\'');

                    if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                        putenv(sprintf('%s=%s', $name, $value));
                        $_ENV[$name] = $value;
                        $_SERVER[$name] = $value;
                    }
                }
            }
            
            $this->validate();
        }

        private function validate() {
            $required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS'];
            foreach ($required as $key) {
                if (env($key) === null) {
                    throw new \Exception("Missing required environment variable: $key");
                }
            }
        }
    }
}

/**
 * Global helper for environment variables
 */
namespace {
    if (!function_exists('env')) {
        function env($key, $default = null) {
            $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

            if ($value === false || $value === null) {
                return $default;
            }

            $value = trim($value, '"\' ');

            switch (strtolower($value)) {
                case 'true':
                case '(true)':
                    return true;
                case 'false':
                case '(false)':
                    return false;
                case 'empty':
                case '(empty)':
                    return '';
                case 'null':
                case '(null)':
                    return null;
            }

            return $value;
        }
    }
}
