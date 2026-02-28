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

    <div class="flex justify-end">
        <button type="submit" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">SAVE & DEPLOY JSON</button>
    </div>
</form>
