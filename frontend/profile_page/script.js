// Sample user data
document.addEventListener("DOMContentLoaded", () => {
  // 🧠 Get user data from localStorage (fallback to guest)
  let user = JSON.parse(localStorage.getItem("user")) || {
    id: "1",
    name: "Guest User",
    email: "guest@example.com",
    phone: "Not available",
    bio: "Welcome to Lost & Found system.",
  };

  // 🧾 Sample items data (can later be fetched from backend)
  const items = [
    { id: "i1", userId: "1", title: "Lost Wallet", description: "Black leather wallet near station", status: "lost", location: "City Station", date: "2025-09-12", claims: [] },
    { id: "i2", userId: "1", title: "Found Phone", description: "iPhone found near park", status: "found", location: "Green Park", date: "2025-10-01", claims: [{}, {}] },
    { id: "i3", userId: "1", title: "Claimed Keys", description: "Car keys with keychain", status: "claimed", location: "Mall", date: "2025-08-22", claims: [{}] },
  ];

  // 📊 Initialize Profile Info
  document.getElementById("userName").innerText = user.name;
  document.getElementById("userBio").innerText = user.bio || "No bio provided.";
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userPhone").innerText = user.phone || "Not provided";
  document.getElementById("avatar").innerText = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // 📈 Calculate item stats
  const myItems = items.filter((i) => i.userId === user.id);
  const lostItems = myItems.filter((i) => i.status === "lost");
  const foundItems = myItems.filter((i) => i.status === "found");

  document.getElementById("totalReports").innerText = myItems.length;
  document.getElementById("lostCount").innerText = lostItems.length;
  document.getElementById("foundCount").innerText = foundItems.length;

  // 🗂️ Tab Switching Logic
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
        <div class="border rounded-lg p-4 mb-3 hover:bg-gray-50 cursor-pointer transition">
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
                ? `<span class="ml-auto border px-2 rounded">${i.claims.length} claim${
                    i.claims.length > 1 ? "s" : ""
                  }</span>`
                : ""
            }
          </div>
        </div>`
        )
        .join("");
    }
    lucide.createIcons();
  };

  // Default Tab
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

  // ✏️ Edit Profile Logic
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

    // Save updated user info
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

  // 🚪 Logout
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../login_page/index.html";
  });

  // ⬅️ Back to Dashboard
  const backHome = document.getElementById("backHome");
  backHome.addEventListener("click", () => {
    window.location.href = "../dashboard/index.html";
  });

  lucide.createIcons();
});
