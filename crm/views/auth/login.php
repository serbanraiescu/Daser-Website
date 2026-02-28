<form action="/login" method="POST" class="space-y-4">
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
        <input type="email" name="email" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
    </div>
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input type="password" name="password" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
    </div>
    <button type="submit" class="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sign In</button>
</form>
