// Load selected item from localStorage
const item = JSON.parse(localStorage.getItem("selectedItem"));

const container = document.getElementById("itemDetails");

if (!item) {
  container.innerHTML = "<p>No item selected</p>";
} else {
  container.innerHTML = `
    <h3>${item.title}</h3>
    <p><b>Description:</b> ${item.description}</p>
    <p><b>Location:</b> ${item.location}</p>
    <p><b>Status:</b> ${item.status}</p>

    <h4>Reported By</h4>
    <p>${item.contactName}</p>
    <p>${item.contactInfo}</p>

    ${item.imageUrl ? `<img src="${item.imageUrl}" />` : ""}

    <br>
    <button onclick="openModal()">Claim Item</button>
  `;
}

function openModal() {
  document.getElementById("claimModal").style.display = "block";
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

  alert("✅ Claim submitted successfully!");
  closeModal();
  window.location.href = "../dashboard/index.html";
}

function goHome() {
  window.location.href = "../dashboard/index.html";
}
