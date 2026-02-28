<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Clients</h2>
    <!-- Simple add client modal or link could go here -->
</div>

<div class="card overflow-hidden">
    <table class="w-full text-left">
        <thead class="bg-gray-50 border-b">
            <tr>
                <th class="py-3 px-4">Code</th>
                <th class="py-3 px-4">Name</th>
                <th class="py-3 px-4">Company</th>
                <th class="py-3 px-4">Email</th>
                <th class="py-3 px-4">Created</th>
            </tr>
        </thead>
        <tbody class="divide-y">
            <?php foreach ($clients as $client): ?>
            <tr>
                <td class="py-4 px-4 font-mono"><?php echo $client['client_code']; ?></td>
                <td class="py-4 px-4 font-medium"><?php echo $client['name']; ?></td>
                <td class="py-4 px-4"><?php echo $client['company']; ?></td>
                <td class="py-4 px-4"><?php echo $client['email']; ?></td>
                <td class="py-4 px-4 text-sm"><?php echo date('d.m.Y', strtotime($client['created_at'])); ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
