// =================== ✅ Reset Harian Klaim ===================
function checkRewardReset() {
  const today = new Date().toLocaleDateString("id-ID");
  const lastClaimDate = localStorage.getItem("rewardClaimDate");

  if (lastClaimDate !== today) {
    localStorage.removeItem("rewardClaimed");
    localStorage.setItem("rewardClaimDate", today);
  }
}

// =================== 🎁 Fungsi Klaim Hadiah ===================
function claimReward() {
  const alreadyClaimed = localStorage.getItem("rewardClaimed") === "true";
  if (alreadyClaimed) {
    showToast("Kamu sudah klaim hari ini! 🎉");
    return;
  }

  // Tampilkan pop-up reward
  const reward = document.createElement("div");
  reward.className = "reward-popup";
  reward.innerHTML = "🎁 +50 Coin!";
  document.body.appendChild(reward);

  // Efek menghilang setelah 2 detik
  setTimeout(() => {
    reward.classList.add("fade-out");
    setTimeout(() => reward.remove(), 1000);
  }, 2000);

  // Simpan status klaim dan tanggal
  localStorage.setItem("rewardClaimed", "true");
  localStorage.setItem("rewardClaimDate", new Date().toLocaleDateString("id-ID"));

  // Efek & notifikasi
  showToast("Berhasil klaim hadiah harian! 💰");
  launchConfetti();
}

// =================== 🔔 Toast Notifikasi ===================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Tampilkan dan hilangkan dengan animasi
  setTimeout(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }, 100);
}

// =================== 🎊 Efek Confetti ===================
function launchConfetti() {
  const count = 40;
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    confetti.style.backgroundColor = getRandomColor();
    document.body.appendChild(confetti);

    // Hapus setelah selesai jatuh
    setTimeout(() => confetti.remove(), 4000);
  }
}

function getRandomColor() {
  const colors = ["#FFD700", "#34C759", "#FF3B30", "#007AFF", "#AF52DE"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// =================== 🔙 Navigasi Kembali ===================
function backToGame() {
  window.location.href = "../../brain.html"; // Sesuaikan dengan struktur file kamu
}

// =================== ✨ Efek Masuk Inbox ===================
document.addEventListener("DOMContentLoaded", () => {
  checkRewardReset(); // Cek & reset klaim jika hari baru

  // Efek masuk item inbox
  const inboxItems = document.querySelectorAll(".inbox-item");
  inboxItems.forEach((item, index) => {
    item.style.animation = `fadeSlideIn 0.4s ease ${(index + 1) * 0.1}s forwards`;
    item.style.opacity = 0;
  });

  // Aksi tombol kembali
  const backBtn = document.querySelector(".btn-back");
  if (backBtn) {
    backBtn.addEventListener("click", backToGame);
  }
});
