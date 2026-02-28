<div class="mb-6 flex justify-between items-center">
    <div>
        <h2 class="text-2xl font-bold">Website Manager Pro</h2>
        <p class="text-gray-500 text-sm">Gestionare conținut, SEO și pagini pentru Daser Design Studio.</p>
    </div>
    <div class="flex gap-3">
        <a href="https://daserdesign.ro" target="_blank" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            Vezi Site
        </a>
        <button type="button" id="deployBtn" class="bg-magenta text-white px-4 py-2 rounded font-bold shadow hover:opacity-90 transition flex items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            PUSH TO LIVE
        </button>
    </div>
</div>

<!-- Tabs Navigation -->
<div class="border-b border-gray-200 mb-6 sticky top-0 bg-gray-50 z-10 py-2">
    <nav class="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
        <?php 
        $tabs = [
            'general' => 'General', 
            'home' => 'Acasă', 
            'services' => 'Servicii', 
            'about' => 'Despre & Proces', 
            'portfolio' => 'Portofoliu', 
            'faq' => 'Întrebări frecvente',
            'legal' => 'Legal',
            'seo' => 'SEO Center'
        ]; 
        $activeTab = $_GET['tab'] ?? 'general';
        foreach ($tabs as $id => $label): ?>
            <a href="?tab=<?php echo $id; ?>" class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm <?php echo $activeTab === $id ? 'border-magenta text-magenta' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'; ?>">
                <?php echo $label; ?>
            </a>
        <?php endforeach; ?>
    </nav>
</div>

<form action="/website-manager/save" method="POST" class="space-y-6 pb-20">
    <input type="hidden" name="active_tab" value="<?php echo $activeTab; ?>">

    <?php if ($activeTab === 'general'): ?>
        <!-- Company Info -->
        <div class="card">
            <h3 class="text-lg font-bold mb-4 border-b pb-2">Informații Companie & Contact</h3>
            <?php $company = isset($content['company']) ? json_decode($content['company']['content_json'], true) : []; ?>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">CUI (Cod Unic Înregistrare)</label>
                    <input type="text" name="website[company][legal][cui]" value="<?php echo $company['legal']['cui'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Nr. Reg. Comertului</label>
                    <input type="text" name="website[company][legal][reg]" value="<?php echo $company['legal']['reg'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium mb-1">Adresă Sediu Social</label>
                    <input type="text" name="website[company][legal][address]" value="<?php echo $company['legal']['address'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <hr class="md:col-span-2 my-2">
                <div>
                    <label class="block text-sm font-medium mb-1">Telefon Contact</label>
                    <input type="text" name="website[company][contact][phone]" value="<?php echo $company['contact']['phone'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Email Contact</label>
                    <input type="email" name="website[company][contact][email]" value="<?php echo $company['contact']['email'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">WhatsApp (Format: 407xxxxxxxx)</label>
                    <input type="text" name="website[company][contact][whatsapp]" value="<?php echo $company['contact']['whatsapp'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Program de lucru</label>
                    <input type="text" name="website[company][contact][schedule]" value="<?php echo $company['contact']['schedule'] ?? 'Luni-Vineri: 09:00 - 18:00'; ?>" class="w-full border rounded px-3 py-2">
                </div>
            </div>
        </div>
    <?php endif; ?>

    <?php if ($activeTab === 'home'): ?>
        <?php $home = isset($content['pages']) ? json_decode($content['pages']['content_json'], true)['home'] ?? [] : []; ?>
        <div class="card">
            <h3 class="text-lg font-bold mb-4 border-b pb-2">Hero Section Acasă</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium mb-1">Titlu Principal (H1)</label>
                    <input type="text" name="website[pages][home][hero][title]" value="<?php echo $home['hero']['title'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium mb-1">Subtitlu / Descriere Hero</label>
                    <textarea name="website[pages][home][hero][subtitle]" class="w-full border rounded px-3 py-2" rows="2"><?php echo $home['hero']['subtitle'] ?? ''; ?></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Text Buton CTA</label>
                    <input type="text" name="website[pages][home][hero][cta]" value="<?php echo $home['hero']['cta'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Imagine Hero (URL)</label>
                    <input type="text" name="website[pages][home][hero][image]" value="<?php echo $home['hero']['image'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
                </div>
            </div>
        </div>
    <?php endif; ?>

    <?php if ($activeTab === 'seo'): ?>
        <div class="card">
            <h3 class="text-lg font-bold mb-4 border-b pb-2">SEO Global & Overrides</h3>
            <div class="bg-blue-50 p-4 border-l-4 border-blue-500 mb-4 text-sm text-blue-700">
                Lăsați câmpurile goale pentru a folosi <strong>AI SEO Generator</strong> (titluri și descrieri generate automat din conținut).
            </div>
            <?php 
            $pagesData = isset($content['pages']) ? json_decode($content['pages']['content_json'], true) : []; 
            foreach (['home', 'about', 'services', 'contact', 'portfolio'] as $p): ?>
                <div class="mb-6 p-4 border rounded bg-gray-50">
                    <h4 class="font-bold mb-3 uppercase text-xs text-gray-500">Pagina: <?php echo ucfirst($p); ?></h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium mb-1 text-gray-400">SEO Title Override</label>
                            <input type="text" name="website[pages][<?php echo $p; ?>][seo][title]" value="<?php echo $pagesData[$p]['seo']['title'] ?? ''; ?>" class="w-full border rounded px-3 py-2 text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-medium mb-1 text-gray-400">SEO Meta Description Override</label>
                            <input type="text" name="website[pages][<?php echo $p; ?>][seo][description]" value="<?php echo $pagesData[$p]['seo']['description'] ?? ''; ?>" class="w-full border rounded px-3 py-2 text-sm">
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 flex justify-center shadow-lg">
        <button type="submit" class="bg-blue-600 text-white px-12 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">
            SALVEAZĂ & REGENEREAZĂ SITE-UL
        </button>
    </div>
</form>

<script>
document.getElementById('deployBtn').addEventListener('click', async function() {
    if (!confirm('Vrei să faci PUSH la varianta live pe daserdesign.ro?')) return;
    
    const btn = this;
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Depunere...';

    try {
        const response = await fetch('deploy.php?token=<?php echo $deployToken; ?>&pull=1');
        const result = await response.json();
        
        if (result.success) {
            alert('🎉 Site-ul a fost actualizat cu succes!');
        } else {
            alert('❌ Eroare: ' + result.message);
        }
    } catch (error) {
        alert('❌ Eroare la contactarea scriptului: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
});
</script>

<style>
.bg-magenta { background-color: #d01d83; }
.text-magenta { color: #d01d83; }
.border-magenta { border-color: #d01d83; }
.card { background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; }
</style>
