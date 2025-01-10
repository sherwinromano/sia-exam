document.addEventListener("DOMContentLoaded", function () {
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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.database();
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function hideError() {
    errorMessage.classList.add("hidden");
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const usersRef = db.ref("user");
      const snapshot = await usersRef.once("value");
      const users = snapshot.val();

      let userFound = false;
      for (let userId in users) {
        const user = users[userId];
        if (user.email === email && user.password === password) {
          userFound = true;
          // Store user info in sessionStorage
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify({
              id: userId,
              email: user.email,
              nickname: user.nickname,
            })
          );

          alert("Login successful!");
          window.location.href = "dashboard.html"; // Redirect to dashboard
          break;
        }
      }

      if (!userFound) {
        showError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      showError("Failed to login. Please try again.");
    }
  });
});
