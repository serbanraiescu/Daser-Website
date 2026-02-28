<div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Create New Project</h2>
    <form action="/projects/create" method="POST" class="card space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <select name="client_id" required class="w-full border rounded px-3 py-2">
                    <?php foreach ($clients as $client): ?>
                        <option value="<?php echo $client['id']; ?>"><?php echo $client['name']; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status_id" required class="w-full border rounded px-3 py-2">
                    <?php foreach ($statuses as $status): ?>
                        <option value="<?php echo $status['id']; ?>"><?php echo $status['name']; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input type="text" name="title" required class="w-full border rounded px-3 py-2">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="3" class="w-full border rounded px-3 py-2"></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Est. Value (Net)</label>
                <input type="number" step="0.01" name="estimated_value" value="0.00" class="w-full border rounded px-3 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">VAT %</label>
                <input type="number" step="0.01" name="vat_percent" value="19.00" class="w-full border rounded px-3 py-2">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                <input type="date" name="estimated_delivery_date" class="w-full border rounded px-3 py-2">
            </div>
        </div>

        <div class="flex justify-end space-x-4">
            <a href="/projects" class="px-4 py-2 border rounded hover:bg-gray-50">Cancel</a>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Project</button>
        </div>
    </form>
</div>
