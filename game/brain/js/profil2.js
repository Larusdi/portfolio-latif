// ==================== ✏️ Toggle Edit Nama Pemain ====================
function editName() {
  const nameInput = document.getElementById("playerName");

  // Jika readonly → aktifkan edit
  if (nameInput.hasAttribute("readonly")) {
    nameInput.removeAttribute("readonly");
    nameInput.focus();
    nameInput.style.color = "#007aff";
    showToast("🔓 Edit nama aktif");
  } else {
    // Jika sedang edit → simpan & kunci
    const newName = nameInput.value.trim() || "Pemain";
    localStorage.setItem("playerName", newName);
    nameInput.setAttribute("readonly", true);
    nameInput.style.color = "#333";
    showToast("✅ Nama disimpan!");
  }
}

// ==================== 💾 Ambil Nama dari localStorage ====================
window.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("playerName");
  const savedName = localStorage.getItem("playerName");
  if (savedName) {
    nameInput.value = savedName;
  }

  // Efek animasi item statistik
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item, index) => {
    item.style.animation = `fadeSlideIn 0.4s ease ${(index + 1) * 0.1}s forwards`;
    item.style.opacity = 0;
  });

  // Tombol kembali
  const backBtn = document.querySelector(".profil-footer button");
  if (backBtn) backBtn.addEventListener("click", backToGame);
});

// ==================== 🔙 Kembali ke Game ====================
function backToGame() {
  window.location.href = "teman.html"; // Sesuaikan path sesuai struktur folder kamu
}

// ==================== 🔔 Toast Notifikasi ====================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }, 100);
}
