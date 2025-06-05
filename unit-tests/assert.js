function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error(`❌ ${message}: expected ${expected}, got ${actual}`);
    } else {
        console.log(`✅ ${message}`);
    }
}

function add(a, b) {
    return a + b;
}

// Run tests
assertEqual(add(1, 2), 3, "add(1, 2) should return 3");
assertEqual(add(2, 2), 5, "add(2, 2) should return 4"); // will fail