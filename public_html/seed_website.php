<?php
require_once __DIR__ . '/../crm/app/Services/Autoloader.php';
require_once __DIR__ . '/../crm/app/Services/EnvLoader.php';
require_once __DIR__ . '/../crm/app/Services/Database.php';

use App\Services\Database;
use App\Services\EnvLoader;

try {
    $env = new EnvLoader(__DIR__ . '/../.env');
    $env->load();

    $db = Database::getInstance();

    $content = [
        'company' => [
            'legal' => [
                'cui' => 'RO 12345678',
                'reg' => 'J33/123/2020',
                'address' => 'Str. Principală Nr. 1, Câmpulung Moldovenesc, Suceava'
            ],
            'contact' => [
                'phone' => '+40 740 000 000',
                'email' => 'contact@daserdesign.ro',
                'whatsapp' => '40740000000',
                'schedule' => 'Luni-Vineri: 09:00 - 18:00'
            ],
            'social' => [
                'facebook' => 'https://facebook.com/daserdesign',
                'instagram' => 'https://instagram.com/daserdesign'
            ]
        ],
        'pages' => [
            'home' => [
                'hero' => [
                    'title' => 'Daser Design Studio: Excelență în Print & Personalizare',
                    'subtitle' => 'De la colantări auto premium la printuri de mare format și textile personalizate. Suntem partenerul tău de încredere în Bucovina pentru soluții de branding de impact.',
                    'cta' => 'Solicită Ofertă Rapidă',
                    'image' => '/assets/hero-bg.jpg'
                ],
                'stats' => [
                    ['label' => 'Proiecte Finalizate', 'value' => '1500+'],
                    ['label' => 'Ani de Experiență', 'value' => '12'],
                    ['label' => 'Clienți Mulțumiți', 'value' => '450+']
                ]
            ],
            'about' => [
                'hero' => ['title' => 'Povestea Noastră', 'subtitle' => 'Pasiune pentru detaliu și tehnologie de ultimă oră.'],
                'content' => 'Fondat în Câmpulung Moldovenesc, Daser Design Studio a pornit de la dorința de a oferi soluții de publicitate care să reziste testului timpului. Astăzi, suntem unul dintre cele mai dotate ateliere de producție publicitară din județul Suceava.'
            ],
            'services' => [
                'items' => [
                    [
                        'id' => 'colantari-auto',
                        'title' => 'Colantări Auto Profesionale',
                        'slug' => 'colantari-auto',
                        'description' => 'Transformăm vehiculele în instrumente de marketing mobil. Folosim doar folii premium (3M, Avery Dennison) cu garanție extinsă.',
                        'benefits' => ['Protecție vopsea originală', 'Design personalizat 100%', 'Montaj în atelier încălzit', 'Rezistență UV și intemperii']
                    ],
                    [
                        'id' => 'print-mare-format',
                        'title' => 'Print Mare Format & Outdoor',
                        'slug' => 'print-mare-format',
                        'description' => 'Bannere, mesh-uri și autocolante de dimensiuni impresionante, imprimate la rezoluție fotografică.',
                        'benefits' => ['Culori vibrante Durst/Epson', 'Finisaje incluse (capse, tiv)', 'Materiale rezistente la vânt', 'Montaj la înălțime']
                    ]
                ]
            ],
            'faq' => [
                'items' => [
                    ['question' => 'Ce formate de fișiere acceptați?', 'answer' => 'Preferăm formate vectoriale (PDF, AI, CDR, EPS). Pentru imagini raster, acestea trebuie să aibă minim 150 DPI la dimensiune reală.'],
                    ['question' => 'Care este termenul de execuție?', 'answer' => 'În medie, între 2 și 5 zile lucrătoare, în funcție de complexitatea proiectului și disponibilitatea materialelor.']
                ]
            ],
            'legal' => [
                'terms' => ['title' => 'Termeni și Condiții', 'content' => 'Acest document stabilește regulile de utilizare a serviciilor Daser Enterprise SRL...'],
                'privacy' => ['title' => 'Politică de Confidențialitate', 'content' => 'Respectăm datele tale conform GDPR (Regulamentul 679/2016)...']
            ]
        ]
    ];

    foreach ($content as $section => $data) {
        $json = json_encode($data, JSON_UNESCAPED_UNICODE);
        $stmt = $db->prepare("INSERT INTO website_content (section, content_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_json = ?");
        $stmt->execute([$section, $json, $json]);
    }

    echo "✅ Database seeded successfully with Professional Romanian Content.\n";
    echo "Please delete this file (seed_website.php) after use.";

} catch (Exception $e) {
    die("❌ Error: " . $e->getMessage());
}
