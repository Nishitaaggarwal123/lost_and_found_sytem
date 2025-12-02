document.addEventListener("DOMContentLoaded", () => {

  /* =======================
      USER CHECK
  ======================== */
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "../login_page/index.html";
    return;
  }

  document.getElementById("welcome-text").textContent =
    `Welcome back, ${user.name}!`;


  /* =======================
      LOAD ITEMS (LOCAL STORAGE)
  ======================== */
  let items = JSON.parse(localStorage.getItem("items")) || [];



  /* =======================
      UPDATE DASHBOARD STATS
  ======================== */
  function updateDashboard() {
    const lost = items.filter(i => i.status === "lost").length;
    const found = items.filter(i => i.status === "found").length;

    document.getElementById("total-items").textContent = items.length;
    document.getElementById("lost-items").textContent = lost;
    document.getElementById("found-items").textContent = found;
    document.getElementById("my-items").textContent = items.length; 
  }


  /* =======================
      RECENT ITEMS
  ======================== */
  function loadRecent() {
    const recentList = document.getElementById("recent-items");
    recentList.innerHTML = "";

    items.slice(-3).reverse().forEach(item => {
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

    lucide.createIcons();
  }


  /* =======================
      BROWSE ITEMS
  ======================== */
  function loadBrowseItems(filter = "all") {
    const container = document.getElementById("browseList");
    container.innerHTML = "";

    items
      .filter(item => filter === "all" || item.status === filter)
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

            <div class="button-right">
              <button class="view-btn" onclick="viewDetails('${item.id}')">
                View Details
              </button>
            </div>
          </div>
        `;
      });
  }


  /* =======================
      MODALS (FULLY FIXED)
  ======================== */
  const lostModal = document.getElementById("lostModal");
  const foundModal = document.getElementById("foundModal");

  document.querySelectorAll(".report-lost-btn").forEach(btn =>
    btn.addEventListener("click", () => lostModal.style.display = "flex")
  );

  document.querySelectorAll(".report-found-btn").forEach(btn =>
    btn.addEventListener("click", () => foundModal.style.display = "flex")
  );

  document.getElementById("closeLostModal").onclick = () =>
    lostModal.style.display = "none";

  document.getElementById("closeFoundModal").onclick = () =>
    foundModal.style.display = "none";

  document.getElementById("cancelFoundForm").onclick = () =>
    foundModal.style.display = "none";

  window.onclick = event => {
    if (event.target === lostModal) lostModal.style.display = "none";
    if (event.target === foundModal) foundModal.style.display = "none";
  };


  /* =======================
      LOST FORM SUBMIT
  ======================== */
  const lostForm = document.querySelector("#lostModal form");

  lostForm.addEventListener("submit", e => {
    e.preventDefault();

    const fields = lostForm.querySelectorAll("input, textarea, select");

    const newItem = {
      id: Date.now().toString(),
      title: fields[0].value,
      category: fields[1].value,
      description: fields[2].value,
      location: fields[3].value,
      date: fields[4].value,
      status: "lost",
      contactName: user.name,
      contactInfo: user.email || "N/A"
    };

    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    lostModal.style.display = "none";
    lostForm.reset();

    updateDashboard();
    loadRecent();
    loadBrowseItems("all");
  });


  /* =======================
      FOUND FORM SUBMIT
  ======================== */
  const foundForm = document.querySelector("#foundModal form");

  foundForm.addEventListener("submit", e => {
    e.preventDefault();

    const fields = foundForm.querySelectorAll("input, textarea");

    const newItem = {
      id: Date.now().toString(),
      title: fields[0].value,
      description: fields[1].value,
      location: fields[2].value,
      date: fields[3].value,
      contactName: fields[4].value,
      contactInfo: fields[5].value,
      status: "found",
      category: "General"
    };

    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    foundModal.style.display = "none";
    foundForm.reset();

    updateDashboard();
    loadRecent();
    loadBrowseItems("all");
  });


  /* =======================
      DASHBOARD ↔ BROWSE TOGGLE
  ======================== */
  const browseSection = document.getElementById("browseSection");

  document.getElementById("dashboard-link").onclick = () => {
    browseSection.style.display = "none";
    document.querySelector(".welcome-section").style.display = "block";
    document.querySelector(".stats-grid").style.display = "grid";
    document.querySelector(".actions-grid").style.display = "grid";
  };

  document.getElementById("browse-link").onclick = () => {
    browseSection.style.display = "block";
    document.querySelector(".welcome-section").style.display = "none";
    document.querySelector(".stats-grid").style.display = "none";
    document.querySelector(".actions-grid").style.display = "none";
    loadBrowseItems("all");
  };

  document.getElementById("browse-items-btn").onclick = () => {
    browseSection.style.display = "block";
    document.querySelector(".welcome-section").style.display = "none";
    document.querySelector(".stats-grid").style.display = "none";
    document.querySelector(".actions-grid").style.display = "none";
    loadBrowseItems("all");
  };


  /* =======================
      FILTER BUTTONS
  ======================== */
  document.getElementById("showAll").onclick = () => loadBrowseItems("all");
  document.getElementById("showLost").onclick = () => loadBrowseItems("lost");
  document.getElementById("showFound").onclick = () => loadBrowseItems("found");


  /* =======================
      LOGOUT
  ======================== */
  document.getElementById("logout-btn").onclick = () => {
    localStorage.removeItem("user");
    window.location.href = "../login_page/index.html";
  };


  /* =======================
      INITIAL LOAD
  ======================== */
  updateDashboard();
  loadRecent();
/* =======================
     PROFILE BUTTON
======================= */
const profileBtn = document.getElementById("profile-link");
if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    window.location.href = "../profile_page/index.html";
  });
}
updateDashboard();
loadRecent();

}); // DOMContentLoaded END


/* ============================
   VIEW DETAILS FUNCTION
============================ */
function viewDetails(id) {
  const items = JSON.parse(localStorage.getItem("items"));
  const selected = items.find(i => i.id === id);
  localStorage.setItem("selectedItem", JSON.stringify(selected));
  window.location.href = "../item_details/index.html";
}
