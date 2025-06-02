// contact-page.js

// Get references to pop-up elements
const messagePopup = document.getElementById("messagePopup");
const popupMessage = document.getElementById("popupMessage");
const closePopupBtn = document.getElementById("closePopup");
const contactForm = document.getElementById("contactForm");

// Function to show the custom pop-up message
function showPopup(message, isSuccess) {
  if (!messagePopup || !popupMessage) return; // Exit if elements not found

  popupMessage.textContent = message;

  // Apply success or error styling
  if (isSuccess) {
    messagePopup.classList.remove("error");
    messagePopup.classList.add("success");
  } else {
    messagePopup.classList.remove("success");
    messagePopup.classList.add("error");
  }

  // Show the pop-up
  messagePopup.classList.add("show");
}

// Function to hide the custom pop-up message
function hidePopup() {
  if (messagePopup) {
    messagePopup.classList.remove("show");
  }
}

// Add event listeners for the pop-up close button and overlay click
if (closePopupBtn) {
  closePopupBtn.addEventListener("click", hidePopup);
}

if (messagePopup) {
  messagePopup.addEventListener("click", (event) => {
    // Close pop-up if clicked on the overlay, not the content itself
    if (event.target === messagePopup) {
      hidePopup();
    }
  });
}

// Handle contact form submission using Fetch API
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission (browser navigating away)

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((response) => response.json()) // Parse the JSON response from PHP
      .then((data) => {
        if (data.success) {
          showPopup(data.message, true); // Show success pop-up
          form.reset(); // Clear the form fields
        } else {
          showPopup("Error: " + data.message, false); // Show error pop-up
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        showPopup(
          "There was an error sending your message. Please try again later.",
          false
        ); // Show a generic error pop-up for network issues
      });
  });
}
