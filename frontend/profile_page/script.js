// ==========================
// PROFILE PAGE SCRIPT
// ==========================

document.addEventListener("DOMContentLoaded", () => {

  // 🧠 Load logged-in user
  let user = JSON.parse(localStorage.getItem("user")) || {
    id: "1",
    name: "Guest User",
    email: "guest@example.com",
    phone: "Not available",
    bio: "Welcome to Lost & Found system.",
  };

  // ⭐ ADMIN BUTTON LOGIC
  const regBtn = document.getElementById("registeredUsersBtn");
  if (regBtn) {
    if (user.role === "admin") {
      regBtn.classList.remove("hidden"); // show button
    } else {
      regBtn.classList.add("hidden"); // hide button
    }
  }

  // ⭐ Load all users (for Registered Users Modal)
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");


  // ============================================
  // 📌 REGISTERED USERS POPUP LOGIC
  // ============================================

  const usersModal = document.getElementById("usersModal");
  const closeUsersModal = document.getElementById("closeUsersModal");
  const usersList = document.getElementById("usersList");
  const totalUsersText = document.getElementById("totalUsersText");

  if (regBtn) {
    regBtn.addEventListener("click", () => {
      totalUsersText.innerText = `Total of ${allUsers.length} registered user${
        allUsers.length !== 1 ? "s" : ""
      } in the system`;

      usersList.innerHTML = allUsers
        .map((u, index) => {
          const initials = u.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return `
            <div class="flex items-start gap-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition">
              <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-lg font-semibold">
                ${initials}
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-semibold text-gray-900">${u.name}</h4>
                  <span class="px-2 py-1 text-xs rounded-full border">User #${index + 1}</span>
                </div>

                <p class="text-gray-600 mb-2">${u.bio || "No bio provided."}</p>

                <div class="space-y-1 text-sm">
                  <div class="flex items-center gap-2 text-gray-700">
                    <i data-lucide="mail" class="w-3 h-3"></i>
                    ${u.email}
                  </div>

                  ${
                    u.phone
                      ? `<div class="flex items-center gap-2 text-gray-700">
                      <i data-lucide="phone" class="w-3 h-3"></i>${u.phone}
                    </div>`
                      : ""
                  }
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      usersModal.classList.remove("hidden");
      lucide.createIcons();
    });
  }

  closeUsersModal.addEventListener("click", () => {
    usersModal.classList.add("hidden");
  });

  usersModal.addEventListener("click", (e) => {
    if (e.target === usersModal) usersModal.classList.add("hidden");
  });


  // =====================================================
  // PROFILE INFO
  // =====================================================

  document.getElementById("userName").innerText = user.name;
  document.getElementById("userBio").innerText = user.bio || "No bio provided.";
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userPhone").innerText = user.phone || "Not provided";
  document.getElementById("avatar").innerText = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();


  // SAMPLE ITEMS
  const items = [
    { id: "i1", userId: "1", title: "Lost Wallet", description: "Black leather wallet near station", status: "lost", location: "City Station", date: "2025-09-12", claims: [] },
    { id: "i2", userId: "1", title: "Found Phone", description: "iPhone found near park", status: "found", location: "Green Park", date: "2025-10-01", claims: [{}, {}] },
    { id: "i3", userId: "1", title: "Claimed Keys", description: "Car keys with keychain", status: "claimed", location: "Mall", date: "2025-08-22", claims: [{}] },
  ];

  const myItems = items.filter((i) => i.userId === user.id);
  const lostItems = myItems.filter((i) => i.status === "lost");
  const foundItems = myItems.filter((i) => i.status === "found");

  document.getElementById("totalReports").innerText = myItems.length;
  document.getElementById("lostCount").innerText = lostItems.length;
  document.getElementById("foundCount").innerText = foundItems.length;


  // ======================================
  // TABS LOGIC
  // ======================================

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContent = document.getElementById("tabContent");

  const renderItems = (filter) => {
    const filtered =
      filter === "all" ? myItems : myItems.filter((i) => i.status === filter);

    if (filtered.length === 0) {
      tabContent.innerHTML = `
        <div class="text-center py-12 text-gray-500">
          <i data-lucide="package" class="w-12 h-12 mx-auto mb-3 text-gray-400"></i>
          <p>No items found</p>
        </div>`;
    } else {
      tabContent.innerHTML = filtered
        .map(
          (i) => `
        <div class="border rounded-lg p-4 mb-3 hover:bg-gray-50 transition">
          <div class="flex justify-between mb-2">
            <h4 class="font-semibold">${i.title}</h4>
            <span class="px-2 py-1 text-xs rounded-full ${
              i.status === "lost"
                ? "bg-red-100 text-red-700"
                : i.status === "claimed"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }">${i.status}</span>
          </div>
          <p class="text-gray-600 mb-2">${i.description}</p>
          <div class="flex gap-4 text-sm text-gray-500">
            <span class="flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3"></i> ${i.location}
            </span>
            <span class="flex items-center gap-1">
              <i data-lucide="calendar" class="w-3 h-3"></i> ${new Date(
                i.date
              ).toLocaleDateString()}
            </span>
            ${
              i.claims.length
                ? `<span class="ml-auto border px-2 rounded">${i.claims.length} claim${i.claims.length > 1 ? "s" : ""}</span>`
                : ""
            }
          </div>
        </div>`
        )
        .join("");
    }

    lucide.createIcons();
  };

  renderItems("all");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) =>
        b.classList.remove("text-blue-600", "border-b-2", "border-blue-600")
      );
      btn.classList.add("text-blue-600", "border-b-2", "border-blue-600");

      renderItems(btn.dataset.tab);
    });
  });


  // ====================================
  // EDIT PROFILE LOGIC
  // ====================================

  const editBtn = document.getElementById("editBtn");
  const editForm = document.getElementById("editForm");
  const profileView = document.getElementById("profileView");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  editBtn.addEventListener("click", () => {
    profileView.classList.add("hidden");
    editForm.classList.remove("hidden");
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPhone").value = user.phone;
    document.getElementById("editBio").value = user.bio;
  });

  cancelBtn.addEventListener("click", () => {
    editForm.classList.add("hidden");
    profileView.classList.remove("hidden");
  });

  saveBtn.addEventListener("click", () => {
    user.name = document.getElementById("editName").value;
    user.email = document.getElementById("editEmail").value;
    user.phone = document.getElementById("editPhone").value;
    user.bio = document.getElementById("editBio").value;

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("userPhone").innerText = user.phone;
    document.getElementById("userBio").innerText = user.bio;
    document.getElementById("avatar").innerText = user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    editForm.classList.add("hidden");
    profileView.classList.remove("hidden");
  });


  // LOGOUT
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../login_page/index.html";
  });

  // BACK
  document.getElementById("backHome").addEventListener("click", () => {
    window.location.href = "../dashboard/index.html";
  });

  lucide.createIcons();
});
