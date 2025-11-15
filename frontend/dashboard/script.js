document.addEventListener("DOMContentLoaded", () => {
  // 🧠 Get user info from localStorage (from login page)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 🔒 Redirect to login if user not found
  if (!user) {
    window.location.href = "../login_page/index.html";
    return;
  }

  // 📋 Update user details in dashboard
  const welcomeText = document.getElementById("welcome-text");
  if (welcomeText) welcomeText.textContent = `Welcome back, ${user.name}!`;

  // Profile details (if shown in sidebar or header)
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  if (profileName) profileName.textContent = user.name;
  if (profileEmail) profileEmail.textContent = user.email;

  // 🗂️ Demo items data
  const items = [
    { id: "1", title: "Wallet", status: "lost", category: "Wallet", description: "Black leather wallet", location: "Cafeteria", date: "2025-11-03" },
    { id: "2", title: "Bag", status: "found", category: "Bag", description: "Blue backpack", location: "Library", date: "2025-11-02" },
    { id: "3", title: "Headphones", status: "lost", category: "Electronics", description: "Sony wireless headset", location: "Auditorium", date: "2025-11-04" },
    { id: "4", title: "Car Keys", status: "found", category: "Keys", description: "Silver keychain with Honda logo", location: "Parking Lot", date: "2025-11-01" },
  ];

  // 📊 Categorize items
  const lostItems = items.filter(i => i.status === "lost");
  const foundItems = items.filter(i => i.status === "found");
  const myItems = items.slice(0, 2);
  const recentItems = items.slice(0, 3);

  // 🏷️ Fill dashboard data
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("total-items", items.length);
  setText("lost-items", lostItems.length);
  setText("found-items", foundItems.length);
  setText("my-items", myItems.length);

  // 🕒 Recent Items List
  const recentList = document.getElementById("recent-items");
  if (recentList) {
    recentItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <div class="item-icon ${item.status === "lost" ? "bg-red-100" : "bg-green-100"}">
          <i data-lucide="${item.status === "lost" ? "alert-circle" : "check-circle-2"}"></i>
        </div>
        <div class="flex-1">
          <h4>${item.title} <span class="badge ${item.status}">${item.status}</span></h4>
          <p>${item.description}</p>
          <small>📍 ${item.location} | 🗓️ ${new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small>
        </div>`;
      recentList.appendChild(div);
    });
  }

  // 🧩 Categories Overview
  const categories = ["Wallet", "Bag", "Electronics", "Keys"];
  const catContainer = document.getElementById("category-list");
  if (catContainer) {
    categories.forEach(cat => {
      const count = items.filter(i => i.category === cat).length;
      const box = document.createElement("div");
      box.className = "category-box";
      box.innerHTML = `
        <div class="count" style="font-size:1.2rem;font-weight:bold;">${count}</div>
        <div>${cat}</div>`;
      catContainer.appendChild(box);
    });
  }

  // 🔔 Initialize Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // 🧭 Navigation Buttons
  const goToProfileBtn = document.getElementById("profile-link");
  if (goToProfileBtn) {
    goToProfileBtn.addEventListener("click", () => {
      window.location.href = "../profile_page/index.html";
    });
  }

  const reportLost = document.getElementById("report-lost-btn");
  if (reportLost) reportLost.addEventListener("click", () => alert("Redirecting to report lost item form..."));

  const reportFound = document.getElementById("report-found-btn");
  if (reportFound) reportFound.addEventListener("click", () => alert("Redirecting to report found item form..."));

  const browseItems = document.getElementById("browse-items-btn");
  if (browseItems) browseItems.addEventListener("click", () => alert("Browsing all items..."));

  // 🚪 Logout Button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "../login_page/index.html";
    });
  }
});


