<div class="mb-6">
    <h2 class="text-2xl font-bold">System Settings</h2>
    <p class="text-gray-500 text-sm">Configure global system behavior and company information.</p>
</div>

<form action="/settings/save" method="POST" class="space-y-6">
    <div class="grid grid-cols-1 gap-6">
        <?php foreach ($settings as $setting): ?>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
                <label class="block text-sm font-bold text-gray-700 mb-2"><?php echo htmlspecialchars($setting['description'] ?: $setting['key']); ?></label>
                <div class="flex gap-4">
                    <input type="text" name="settings[<?php echo $setting['key']; ?>]" value="<?php echo htmlspecialchars($setting['value']); ?>" 
                           class="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                    <span class="text-xs text-gray-400 self-center">Key: <?php echo $setting['key']; ?></span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <div class="flex justify-end mt-8">
        <button type="submit" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">SAVE SETTINGS</button>
    </div>
</form>
