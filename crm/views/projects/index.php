<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Projects</h2>
    <a href="/projects/create" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">New Project</a>
</div>

<div class="card overflow-hidden">
    <table class="w-full text-left">
        <thead class="bg-gray-50 border-b">
            <tr>
                <th class="py-3 px-4">Number</th>
                <th class="py-3 px-4">Client</th>
                <th class="py-3 px-4">Title</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4">Delivery</th>
                <th class="py-3 px-4">Actions</th>
            </tr>
        </thead>
        <tbody class="divide-y">
            <?php foreach ($projects as $project): ?>
            <tr>
                <td class="py-4 px-4 font-mono font-bold"><?php echo $project['project_number']; ?></td>
                <td class="py-4 px-4"><?php echo $project['client_name']; ?></td>
                <td class="py-4 px-4"><?php echo $project['title']; ?></td>
                <td class="py-4 px-4">
                    <span class="px-2 py-1 rounded text-xs text-white" style="background-color: <?php echo $project['status_color']; ?>">
                        <?php echo strtoupper($project['status_name']); ?>
                    </span>
                </td>
                <td class="py-4 px-4 text-sm"><?php echo $project['estimated_delivery_date']; ?></td>
                <td class="py-4 px-4">
                    <a href="/projects/view?id=<?php echo $project['id']; ?>" class="text-blue-600 hover:underline">View</a>
                </td>
            </tr>
            <?php endforeach; ?>
            <?php if (empty($projects)): ?>
                <tr><td colspan="6" class="py-4 text-center text-gray-500">No projects found.</td></tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>
