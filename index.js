document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Display user email in header
  document.getElementById("userEmail").textContent = currentUser.email;

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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.database();

  // Fetch and display users
  function loadUsers() {
    const userTableBody = document.getElementById("userTableBody");
    const usersRef = db.ref("user");

    usersRef.on("value", (snapshot) => {
      userTableBody.innerHTML = "";
      const users = snapshot.val();

      for (let userId in users) {
        const user = users[userId];
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.age}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.gender}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.firstname}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.lastname}</td>
                `;
        userTableBody.appendChild(row);
      }
    });
  }

  // Handle logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // Load users when page loads
  loadUsers();
});
