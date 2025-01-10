// Wait for Firebase SDK to load
document.addEventListener("DOMContentLoaded", function () {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBxeR7fDR_csebxqqVTRMuR0FJaDn3kVms",
    authDomain: "sia-final-exam-2d6ab.firebaseapp.com",
    databaseURL:
      "https://sia-final-exam-2d6ab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sia-final-exam-2d6ab",
    storageBucket: "sia-final-exam-2d6ab.firebasestorage.app",
    messagingSenderId: "532671754304",
    appId: "1:532671754304:web:49075685a36aa1570d6fa5",
    measurementId: "G-MXB46SSF2N",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.database();

  // Get form element
  const registerForm = document.getElementById("registerForm");
  const errorMessage = document.getElementById("errorMessage");

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function hideError() {
    errorMessage.classList.add("hidden");
  }

  // Add submit event listener
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    // Get all form inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const FirstName = document.getElementById("FirstName").value;
    const LastName = document.getElementById("LastName").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;

    try {
      // Generate a unique key using Firebase's push() method
      const newUserRef = db.ref("user").push();

      await newUserRef.set({
        email: email,
        password: password,
        age: age,
        gender: gender,
        firstname: FirstName,
        lastname: LastName,
        registeredAt: firebase.database.ServerValue.TIMESTAMP,
      });

      alert("Registration successful!");
      registerForm.reset();
    } catch (error) {
      console.error("Registration error:", error);
      showError("Failed to register. Please try again.");
    }
  });
});
