/// ======================================================
/// 🔹 Handle Login Form Submission
/// ======================================================
document.getElementById('login').addEventListener('submit', e => {
  e.preventDefault();

  const email = e.target.querySelector('input[type="email"]').value.trim();
  const name = email.split('@')[0];

  // ⭐ Determine role (admin OR normal user)
  const role = email === "admin@gmail.com" ? "admin" : "user";

  // Full user object
  const user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    phone: "555-1234",
    bio: "Helping reunite lost items with their owners.",
    role: role   // ⭐ Added role here
  };

  // Save main logged-in user
  localStorage.setItem('user', JSON.stringify(user));

  // ⭐ Save user to allUsers list
  saveUserToAllUsers(user);

  window.location.href = '../dashboard/index.html';
});


/// ======================================================
/// 🔹 Handle Signup Form Submission
/// ======================================================
document.getElementById('signup').addEventListener('submit', e => {
  e.preventDefault();

  const name = e.target.querySelector('input[type="text"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();

  if (!name || !email) {
    alert('Please fill in all fields.');
    return;
  }

  // ⭐ Signup users are always normal users
  const user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    phone: "",
    bio: "",
    role: "user"  // ⭐ added role for signup too
  };

  localStorage.setItem('user', JSON.stringify(user));

  // ⭐ Save new registered user
  saveUserToAllUsers(user);

  alert('🎉 Account created successfully!');
  window.location.href = '../dashboard/index.html';
});


/// ======================================================
/// 🔹 Auto-Redirect If Already Logged In
/// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    window.location.href = '../dashboard/index.html';
  }
});


/// ======================================================
/// ⭐ FUNCTION: Save user into allUsers array
/// ======================================================
function saveUserToAllUsers(user) {
  let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  // Avoid duplicates: check email
  if (!allUsers.some(u => u.email === user.email)) {
    allUsers.push(user);
  }

  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

