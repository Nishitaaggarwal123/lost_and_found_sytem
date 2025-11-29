// Load item from localStorage
const item = JSON.parse(localStorage.getItem("selectedItem"));
const container = document.getElementById("itemDetails");

if (!item) {
  container.innerHTML = "<p>No item selected</p>";
} else {
  container.innerHTML = `
  <div class="item-title">${item.title}</div>

<div class="badge-row">
  <span class="badge-status">${item.status}</span>
  <span class="badge-category">${item.category}</span>
</div>


    <div class="section-title">Description</div>
    <div class="description-text">${item.description}</div>

    <div class="divider"></div>

    <div class="detail-grid">
      <div class="detail-box">
        <h4>Location</h4>
        <p>${item.location}</p>
      </div>

      <div class="detail-box">
        <h4>Date</h4>
        <p>${item.date}</p>
      </div>
    </div>

    <div class="section-title">Reported By</div>
    <div class="description-text">
      <p>${item.contactName}</p>
      <p>${item.contactInfo}</p>
    </div>

    ${item.imageUrl ? `<img src="${item.imageUrl}" class="item-image">` : ""}

    <button class="claim-btn" onclick="openModal()">Claim Item</button>
  `;
}


// MODAL FUNCTIONS
function openModal() {
  document.getElementById("claimModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("claimModal").style.display = "none";
}

function submitClaim() {
  const reason = document.getElementById("claimReason").value;

  if (!reason) {
    alert("Please enter a reason");
    return;
  }

  alert("Claim submitted!");
  closeModal();
}


function goHome() {
  window.location.href = "../dashboard/index.html";
}


