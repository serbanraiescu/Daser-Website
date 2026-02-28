<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="card">
        <h3 class="text-sm font-medium text-gray-500 uppercase">Total Projects</h3>
        <p class="text-3xl font-bold"><?php echo $stats['total']; ?></p>
    </div>
    <div class="card">
        <h3 class="text-sm font-medium text-gray-500 uppercase">Projects in Work</h3>
        <p class="text-3xl font-bold text-blue-600"><?php echo $stats['active']; ?></p>
    </div>
    <div class="card">
        <h3 class="text-sm font-medium text-gray-500 uppercase">Estimated Profit</h3>
        <p class="text-3xl font-bold text-green-600"><?php echo number_format($stats['profit'], 2); ?> RON</p>
    </div>
</div>

<div class="card">
    <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-left">
            <thead>
                <tr class="text-gray-400 text-sm uppercase">
                    <th class="pb-3 px-4">User</th>
                    <th class="pb-3 px-4">Action</th>
                    <th class="pb-3 px-4">Entity</th>
                    <th class="pb-3 px-4">Date</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <?php foreach ($recent as $log): ?>
                <tr>
                    <td class="py-3 px-4"><?php echo $log['user_name'] ?? 'System'; ?></td>
                    <td class="py-3 px-4 font-medium"><?php echo $log['action']; ?></td>
                    <td class="py-3 px-4"><?php echo $log['entity_type'] . '#' . $log['entity_id']; ?></td>
                    <td class="py-3 px-4 text-gray-500 text-sm"><?php echo date('d.m.Y H:i', strtotime($log['created_at'])); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
