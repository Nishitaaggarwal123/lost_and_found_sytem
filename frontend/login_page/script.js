// Tab switching logic
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active states
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Activate clicked tab and related content
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// 🔹 Handle Login Form Submission
document.getElementById('login').addEventListener('submit', e => {
  e.preventDefault();

  const email = e.target.querySelector('input[type="email"]').value.trim();
  const name = email.split('@')[0]; // Extract username before @

  // Store user data (simulate login)
  const user = { name, email };
  localStorage.setItem('user', JSON.stringify(user));

  // Redirect to dashboard
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

  // Store new user data (simulate account creation)
  const user = { name, email };
  localStorage.setItem('user', JSON.stringify(user));

  alert('🎉 Account created successfully! Redirecting to dashboard...');

  // Redirect to dashboard
  window.location.href = '../dashboard/index.html';
});

// 🔹 Auto-Redirect If Already Logged In
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    // If already logged in, skip login and go directly to dashboard
    window.location.href = '../dashboard/index.html';
  }
});
