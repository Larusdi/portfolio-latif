// ==================== ⏱️ RESET HARIAN ====================
function checkDailyReset() {
  const today = new Date().toLocaleDateString("id-ID");
  const lastClaim = localStorage.getItem("hadiahClaimDate");

  if (lastClaim !== today) {
    localStorage.removeItem("hadiahClaimed");
    localStorage.setItem("hadiahClaimDate", today);
  }
}

// ==================== 🎁 KLAIM HADIAH ====================
function klaimHadiah(button) {
  if (localStorage.getItem("hadiahClaimed") === "true") {
    showToast("❗ Kamu sudah klaim hadiah hari ini.");
    return;
  }

  // Update tampilan UI
  button.disabled = true;
  button.textContent = "Sudah Diklik";

  const card = button.closest(".hadiah-item");
  card.classList.remove("tersedia");
  card.classList.add("terklaim");
  card.style.opacity = "0.6";

  // Simpan status klaim
  localStorage.setItem("hadiahClaimed", "true");
  localStorage.setItem("hadiahClaimDate", new Date().toLocaleDateString("id-ID"));

  // Efek dan notifikasi
  showToast("🎉 Hadiah berhasil diklaim!");
  launchConfetti();
}

// ==================== 🎊 EFEK CONFETTI ====================
function launchConfetti() {
  const count = 30;
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    confetti.style.backgroundColor = getRandomColor();
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

function getRandomColor() {
  const colors = ["#FFD700", "#34C759", "#FF3B30", "#007AFF", "#AF52DE"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ==================== 🔔 TOAST NOTIFIKASI ====================
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

// ==================== 🔙 TOMBOL KEMBALI ====================
function backToGame() {
  window.location.href = "../../brain.html"; // Sesuaikan path
}

// ==================== 🚀 INISIALISASI ====================
window.addEventListener("DOMContentLoaded", () => {
  checkDailyReset();

  // Jika sudah klaim hari ini, ubah tampilan
  if (localStorage.getItem("hadiahClaimed") === "true") {
    const card = document.querySelector(".hadiah-item.tersedia");
    if (card) {
      card.classList.remove("tersedia");
      card.classList.add("terklaim");
      card.style.opacity = "0.6";

      const btn = card.querySelector("button");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sudah Diklik";
      }
    }
  }
});
