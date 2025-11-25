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
  if (welcomeText) welcomeText.textContent = `Welcome back, ${user.name}!`;

  /* =====================================
     ITEMS DATA
  ====================================== */
  const items = [
    { id: "1", title: "Wallet", status: "lost", category: "Wallet", description: "Black leather wallet", location: "Cafeteria", date: "2025-11-03", contactName: "Rahul Sharma", contactInfo: "rahul@gmail.com" },
    { id: "2", title: "Bag", status: "found", category: "Bag", description: "Blue backpack", location: "Library", date: "2025-11-02", contactName: "Sarah Singh", contactInfo: "sarah@gmail.com" },
    { id: "3", title: "Headphones", status: "lost", category: "Electronics", description: "Sony wireless headset", location: "Auditorium", date: "2025-11-04", contactName: "Arjun Mehta", contactInfo: "arjun@gmail.com" },
    { id: "4", title: "Car Keys", status: "found", category: "Keys", description: "Silver keychain (Honda logo)", location: "Parking Lot", date: "2025-11-01", contactName: "Neha Verma", contactInfo: "neha@gmail.com" }
  ];

  const lostItems  = items.filter(i => i.status === "lost");
  const foundItems = items.filter(i => i.status === "found");
  const myItems    = items.slice(0, 2);
  const recentItems = items.slice(0, 3);

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
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
      recentList.innerHTML += `
        <div class="item">
          <div class="item-icon ${item.status === "lost" ? "bg-red-100" : "bg-green-100"}">
            <i data-lucide="${item.status}"></i>
          </div>
          <div>
            <h4>${item.title} <span class="badge ${item.status}">${item.status}</span></h4>
            <p>${item.description}</p>
            <small>📍 ${item.location} | 🗓 ${item.date}</small>
          </div>
        </div>
      `;
    });
  }

  if (typeof lucide !== "undefined") lucide.createIcons();


  /* =====================================
     MODALS
  ====================================== */
  function openModal(id) {
    document.getElementById(id).style.display = "flex";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }

  document.querySelectorAll("#report-lost-btn").forEach(btn =>
    btn.addEventListener("click", () => openModal("lostModal"))
  );

  document.querySelectorAll("#report-found-btn").forEach(btn =>
    btn.addEventListener("click", () => openModal("foundModal"))
  );

  document.getElementById("closeLostModal").onclick = () => closeModal("lostModal");
  document.getElementById("closeFoundModal").onclick = () => closeModal("foundModal");

  const cancelFound = document.getElementById("cancelFoundForm");
  if (cancelFound) cancelFound.onclick = () => closeModal("foundModal");

  window.onclick = (e) => {
    if (e.target.id === "lostModal") closeModal("lostModal");
    if (e.target.id === "foundModal") closeModal("foundModal");
  };


  /* =====================================
     DASHBOARD ↔ BROWSE TOGGLE
  ====================================== */

  const dashboardBtn = document.getElementById("dashboard-link");
  const browseBtn = document.getElementById("browse-link");

  const browseSection = document.getElementById("browseSection");
  const welcomeSec = document.querySelector(".welcome-section");
  const statsGrid = document.querySelector(".stats-grid");
  const actionsGrid = document.querySelector(".actions-grid");
  const categoriesCard = document.querySelector(".categories-card");

  function showDashboard() {
    dashboardBtn.classList.add("active");
    browseBtn.classList.remove("active");

    browseSection.style.display = "none";
    welcomeSec.style.display = "block";
    statsGrid.style.display = "grid";
    actionsGrid.style.display = "grid";
    categoriesCard.style.display = "block";
  }

  function showBrowse() {
    browseBtn.classList.add("active");
    dashboardBtn.classList.remove("active");

    browseSection.style.display = "block";
    welcomeSec.style.display = "none";
    statsGrid.style.display = "none";
    actionsGrid.style.display = "none";
    categoriesCard.style.display = "none";

    loadBrowseItems("all");
  }

  dashboardBtn.onclick = showDashboard;
  browseBtn.onclick = showBrowse;

  document.getElementById("browse-items-btn").onclick = showBrowse;

  /* =====================================
     BROWSE ITEMS WITH VIEW DETAILS
  ====================================== */
  function loadBrowseItems(filter = "all") {
    const container = document.getElementById("browseList");
    container.innerHTML = "";

    items
      .filter(i => filter === "all" || i.status === filter)
      .forEach(item => {
        container.innerHTML += `
        <div class="browse-card">
          <h3>${item.title}</h3>
          <div class="browse-category">${item.category}</div>
          <p>${item.description}</p>
          <div class="browse-info">
            📍 ${item.location}
            <span>🗓 ${item.date}</span>
          </div>

          <button class="view-btn" onclick="viewDetails('${item.id}')">
            View Details
          </button>
        </div>`;
      });
  }

  /* Browse filter buttons */
  document.getElementById("showAll").onclick = () => {
    setActive("showAll");
    loadBrowseItems("all");
  };

  document.getElementById("showLost").onclick = () => {
    setActive("showLost");
    loadBrowseItems("lost");
  };

  document.getElementById("showFound").onclick = () => {
    setActive("showFound");
    loadBrowseItems("found");
  };

  function setActive(id) {
    document.querySelectorAll(".browse-btn").forEach(b =>
      b.classList.remove("active-browse")
    );
    document.getElementById(id).classList.add("active-browse");
  }

  /* =====================================
     LOGOUT
  ====================================== */
  document.getElementById("logout-btn").onclick = () => {
    localStorage.removeItem("user");
    window.location.href = "../login_page/index.html";
  };

});


/* =====================================
   VIEW DETAILS FUNCTION
===================================== */
function viewDetails(itemId) {

  const items = [
    { id: "1", title: "Wallet", status: "lost", category: "Wallet", description: "Black leather wallet", location: "Cafeteria", date: "2025-11-03", contactName: "Rahul Sharma", contactInfo: "rahul@gmail.com" },
    { id: "2", title: "Bag", status: "found", category: "Bag", description: "Blue backpack", location: "Library", date: "2025-11-02", contactName: "Sarah Singh", contactInfo: "sarah@gmail.com" },
    { id: "3", title: "Headphones", status: "lost", category: "Electronics", description: "Sony wireless headset", location: "Auditorium", date: "2025-11-04", contactName: "Arjun Mehta", contactInfo: "arjun@gmail.com" },
    { id: "4", title: "Car Keys", status: "found", category: "Keys", description: "Silver keychain (Honda logo)", location: "Parking Lot", date: "2025-11-01", contactName: "Neha Verma", contactInfo: "neha@gmail.com" }
  ];

  const selectedItem = items.find(i => i.id === itemId);

  localStorage.setItem("selectedItem", JSON.stringify(selectedItem));

  window.location.href = "../item_details/index.html";
}


/* =====================================
   PROFILE BUTTON
===================================== */
const profileBtn = document.getElementById("profile-link");
if (profileBtn) {
  profileBtn.onclick = () => {
    window.location.href = "../profile_page/index.html";
  };
}
