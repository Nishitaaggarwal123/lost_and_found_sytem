/// 🔹 Handle Login Form Submission
document.getElementById('login').addEventListener('submit', e => {
  e.preventDefault();

  const email = e.target.querySelector('input[type="email"]').value.trim();
  const name = email.split('@')[0];

  // Full user object
  const user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    phone: "555-1234",
    bio: "Helping reunite lost items with their owners."
  };

  localStorage.setItem('user', JSON.stringify(user));

  window.location.href = '../dashboard/index.html';
});

// 🔹 Handle Signup Form Submission
document.getElementById('signup').addEventListener('submit', e => {
  e.preventDefault();

  const name = e.target.querySelector('input[type="text"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();

  if (!name || !email) {
    alert('Please fill in all fields.');
    return;
  }

  const user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    phone: "",
    bio: ""
  };

  localStorage.setItem('user', JSON.stringify(user));

  alert('🎉 Account created successfully!');
  window.location.href = '../dashboard/index.html';
});

// 🔹 Auto-Redirect If Already Logged In
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    window.location.href = '../dashboard/index.html';
  }
});
