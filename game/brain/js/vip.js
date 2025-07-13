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

// ==================== ✨ Efek Confetti ====================
function launchConfetti() {
  const count = 50;
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
  const colors = ["#FFD700", "#FF3B30", "#34C759", "#AF52DE", "#007AFF"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ==================== 🚀 Upgrade VIP ====================
function upgradeVIP(level) {
  const harga = getHargaVIP(level);
  localStorage.setItem("vipLevel", level);
  showToast(`🎉 Kamu sekarang VIP Level ${level} - Rp${harga.toLocaleString("id-ID")}`);
  highlightActiveVIP(level);
  playButtonEffect();
  launchConfetti();
}

// ==================== ✨ Highlight Tombol VIP Aktif ====================
function highlightActiveVIP(level) {
  const buttons = document.querySelectorAll(".vip-options button");
  buttons.forEach(btn => {
    btn.classList.remove("active-vip");
    if (btn.textContent.includes(`VIP ${level}`)) {
      btn.classList.add("active-vip");
    }
  });
}

// ==================== 💰 Harga VIP Berdasarkan Level ====================
function getHargaVIP(level) {
  const hargaMap = {
    1: 15000,
    2: 30000,
    3: 50000,
    4: 75000,
    5: 100000,
    6: 150000,
    7: 200000,
    8: 300000,
    9: 500000,
    10: 1000000
  };
  return hargaMap[level] || 0;
}

// ==================== 🔊 Efek Tombol Klik ====================
function playButtonEffect() {
  const activeBtns = document.querySelectorAll("button:active");
  activeBtns.forEach(btn => {
    btn.style.transform = "scale(0.96)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 120);
  });
}

// ==================== 🔙 Tombol Kembali ====================
function backToGame() {
  window.location.href = "../../brain.html";
}

// ==================== 🚀 Inisialisasi Saat Halaman Dibuka ====================
window.addEventListener("DOMContentLoaded", () => {
  const savedLevel = localStorage.getItem("vipLevel");
  if (savedLevel) {
    highlightActiveVIP(savedLevel);
  }

  // ✨ Animasi Masuk Elemen
  const vipItems = document.querySelectorAll(".vip-benefits li, .vip-options button");
  vipItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.animation = `fadeSlideIn 0.4s ease ${(index + 1) * 0.1}s forwards`;
  });

  // Tombol Kembali
  const backBtn = document.querySelector(".vip-footer button");
  if (backBtn) {
    backBtn.addEventListener("click", backToGame);
  }
});
