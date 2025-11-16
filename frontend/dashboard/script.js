document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     USER CHECK + WELCOME MESSAGE
  ====================================== */
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    window.location.href = "../login_page/index.html";
    return;
  }

  const welcomeText = document.getElementById("welcome-text");
  if (welcomeText) {
    welcomeText.textContent = `Welcome back, ${user.name}!`;
  }


  /* =====================================
     DEMO DATA + DASHBOARD STATS
  ====================================== */
  const items = [
    { id: "1", title: "Wallet",       status: "lost",  category: "Wallet",      description: "Black leather wallet",           location: "Cafeteria",    date: "2025-11-03" },
    { id: "2", title: "Bag",          status: "found", category: "Bag",         description: "Blue backpack",                 location: "Library",      date: "2025-11-02" },
    { id: "3", title: "Headphones",   status: "lost",  category: "Electronics", description: "Sony wireless headset",         location: "Auditorium",   date: "2025-11-04" },
    { id: "4", title: "Car Keys",     status: "found", category: "Keys",        description: "Silver keychain (Honda logo)",  location: "Parking Lot",  date: "2025-11-01" }
  ];

  const lostItems  = items.filter(i => i.status === "lost");
  const foundItems = items.filter(i => i.status === "found");
  const myItems    = items.slice(0, 2);
  const recentItems = items.slice(0, 3);

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("total-items", items.length);
  setText("lost-items", lostItems.length);
  setText("found-items", foundItems.length);
  setText("my-items", myItems.length);


  /* =====================================
     RECENT ACTIVITY
  ====================================== */
  const recentList = document.getElementById("recent-items");

  if (recentList) {
    recentItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "item";

      div.innerHTML = `
        <div class="item-icon ${item.status === "lost" ? "bg-red-100" : "bg-green-100"}">
          <i data-lucide="${item.status === "lost" ? "alert-circle" : "check-circle-2"}"></i>
        </div>
        <div>
          <h4>${item.title} <span class="badge ${item.status}">${item.status}</span></h4>
          <p>${item.description}</p>
          <small>📍 ${item.location} | 🗓 ${new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small>
        </div>
      `;

      recentList.appendChild(div);
    });
  }


  /* =====================================
     POPULAR CATEGORIES (HTML VERSION USED)
  ====================================== */
  const categories = ["Wallet", "Bag", "Electronics", "Keys"];
  const categoryBoxes = document.querySelectorAll(".category-box");

  categoryBoxes.forEach((box, index) => {
    const category = categories[index];
    const count = items.filter(i => i.category === category).length;

    box.querySelector(".category-count").textContent = count;
  });


  if (typeof lucide !== "undefined") lucide.createIcons();


  /* =====================================
     MODAL OPEN/CLOSE FUNCTIONS
  ====================================== */
  function openModal(id) {
    document.getElementById(id).style.display = "flex";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }


  /* =====================================
     OPEN MODAL BUTTONS
  ====================================== */
  document.querySelectorAll("#report-lost-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal("lostModal"));
  });

  document.querySelectorAll("#report-found-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal("foundModal"));
  });


  /* =====================================
     CLOSE MODAL BUTTONS
  ====================================== */
  document.getElementById("closeLostModal")
    .addEventListener("click", () => closeModal("lostModal"));

  document.getElementById("closeFoundModal")
    .addEventListener("click", () => closeModal("foundModal"));


  /* =====================================
     CANCEL BUTTON (FOUND FORM ONLY)
  ====================================== */
  const cancelFound = document.getElementById("cancelFoundForm");
  if (cancelFound) {
    cancelFound.addEventListener("click", () => closeModal("foundModal"));
  }


  /* =====================================
     CLOSE MODAL WHEN CLICKING OUTSIDE
  ====================================== */
  window.addEventListener("click", (e) => {
    if (e.target.id === "lostModal")  closeModal("lostModal");
    if (e.target.id === "foundModal") closeModal("foundModal");
  });


  /* =====================================
     BROWSE ITEMS
  ====================================== */
  const browseItems = document.getElementById("browse-items-btn");
  if (browseItems) {
    browseItems.addEventListener("click", () => alert("Browsing all items..."));
  }


  /* =====================================
     LOGOUT BUTTON
  ====================================== */
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "../login_page/index.html";
    });
  }

});

