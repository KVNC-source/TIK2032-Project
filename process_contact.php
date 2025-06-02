<?php
// 1. Database Connection Parameters
$servername = "localhost";
$username = "root";
$password = "kenola20";
$dbname = "tugas";

// 2. Create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Instead of dying, return a JSON error response
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// 3. Process Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit();
    }

    // 4. Prepare and Execute SQL INSERT Query (using prepared statements for security)
    $stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message); // "sss" indicates three string parameters

    if ($stmt->execute()) {
        // 5. Success: Return a JSON success message
        echo json_encode(['success' => true, 'message' => 'Message successfully sent!']);
        exit();
    } else {
        // 6. Error: Return a JSON error message
        echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
        exit();
    }

    $stmt->close();
}

$conn->close();
?>