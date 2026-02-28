<?php
$hero = isset($content['hero']) ? json_decode($content['hero']['content_json'], true) : [];
$services = isset($content['services']) ? json_decode($content['services']['content_json'], true) : [];
?>

<div class="mb-6">
    <h2 class="text-2xl font-bold">Website Manager</h2>
    <p class="text-gray-500 text-sm">Update the landing page content. Changes will generate site_content.json.</p>
</div>

<form action="/website-manager/save" method="POST" class="space-y-8">
    <!-- Hero Section -->
    <div class="card">
        <h3 class="text-lg font-bold mb-4 border-b pb-2">Hero Section</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Title</label>
                <input type="text" name="website[hero][title]" value="<?php echo $hero['title'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Subtitle</label>
                <input type="text" name="website[hero][subtitle]" value="<?php echo $hero['subtitle'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">CTA Text</label>
                <input type="text" name="website[hero][cta]" value="<?php echo $hero['cta'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Hero Image URL</label>
                <input type="text" name="website[hero][image]" value="<?php echo $hero['image'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
            </div>
        </div>
    </div>

    <!-- Contact Info -->
    <div class="card">
        <h3 class="text-lg font-bold mb-4 border-b pb-2">Contact Details</h3>
        <?php $contact = isset($content['contact']) ? json_decode($content['contact']['content_json'], true) : []; ?>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Phone</label>
                <input type="text" name="website[contact][phone]" value="<?php echo $contact['phone'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="website[contact][email]" value="<?php echo $contact['email'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Address</label>
                <input type="text" name="website[contact][address]" value="<?php echo $contact['address'] ?? ''; ?>" class="w-full border rounded px-3 py-2">
            </div>
        </div>
    </div>

    <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border mt-8">
        <div>
            <h4 class="font-bold text-gray-700">Production Deployment</h4>
            <p class="text-xs text-gray-500">Manually sync the latest build from the repository to the live site.</p>
        </div>
        <button type="button" id="deployBtn" class="bg-magenta text-white px-6 py-2 rounded font-bold shadow hover:opacity-90 transition flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            DEPLOY FULL LANDING
        </button>
    </div>

    <div class="flex justify-end mt-4">
        <button type="submit" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">SAVE & DEPLOY JSON</button>
    </div>
</form>

<script>
document.getElementById('deployBtn').addEventListener('click', async function() {
    if (!confirm('Are you sure you want to deploy the latest build to the live site?')) return;
    
    const btn = this;
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Deploying...';

    try {
        const response = await fetch('deploy.php?token=<?php echo $deployToken; ?>&pull=1');
        const result = await response.json();
        
        if (result.success) {
            alert('🎉 ' + result.message);
        } else {
            alert('❌ Deployment failed: ' + result.message);
        }
    } catch (error) {
        alert('❌ Error contacting deployment script: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
});
</script>

<style>
.bg-magenta { background-color: #d01d83; }
</style>
