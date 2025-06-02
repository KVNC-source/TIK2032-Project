// common.js

// Check saved dark mode setting on page load
window.addEventListener("load", function () {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
});

// Function to toggle dark mode and save the setting
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.removeItem("darkMode");
  }
}

// Function to update date and time dynamically
function updateDateTime() {
  const now = new Date();

  // Format and update date
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dateElement = document.getElementById("date");
  if (dateElement) {
    // Check if the element exists on the page
    dateElement.textContent = now.toLocaleString("en-US", dateOptions);
  }

  // Format and update time
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const timeElement = document.getElementById("time");
  if (timeElement) {
    // Check if the element exists on the page
    timeElement.textContent = now.toLocaleString("en-US", timeOptions);
  }
}

// Update date and time every second
setInterval(updateDateTime, 1000);
// Initial call to display date and time immediately on load
updateDateTime();
