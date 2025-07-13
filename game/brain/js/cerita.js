// ==================== 🎮 Mainkan Episode ====================
function playEpisode(epNumber) {
  showToast(`🎬 Membuka Episode ${epNumber}...`);

  // Simpan sementara episode yg dimainkan
  localStorage.setItem("currentEpisode", epNumber);

  setTimeout(() => {
    window.location.href = `episode${epNumber}.html`;
  }, 1200);
}

// ==================== ✅ Tandai Episode Selesai ====================
function completeEpisode(epNumber) {
  const lastCompleted = parseInt(localStorage.getItem("lastCompletedEpisode")) || 0;

  if (epNumber > lastCompleted) {
    localStorage.setItem("lastCompletedEpisode", epNumber);
  }
}

// ==================== 🔓 Unlock Episode ====================
function unlockEpisodes() {
  const lastCompleted = parseInt(localStorage.getItem("lastCompletedEpisode")) || 0;
  const storyLevels = document.querySelectorAll(".story-level");

  storyLevels.forEach((level, index) => {
    const ep = index + 1;
    const btn = level.querySelector("button");

    if (ep === 1 || ep <= lastCompleted + 1) {
      // Unlock tampilan
      if (level.classList.contains("locked")) {
        playUnlockEffect(level);
      }

      level.classList.remove("locked");
      btn.textContent = "🎮 Mainkan";
      btn.disabled = false;
      btn.setAttribute("onclick", `playEpisode(${ep})`);
    }

    // Tambahkan tanda selesai
    if (ep <= lastCompleted) {
      if (!level.querySelector(".badge-selesai")) {
        const badge = document.createElement("span");
        badge.className = "badge-selesai";
        badge.textContent = "✅ Selesai";
        level.querySelector(".story-info").appendChild(badge);
      }
    }
  });
}

// ==================== ✨ Efek Animasi Unlock ====================
function playUnlockEffect(level) {
  const unlockSound = new Audio("sound/unlock.mp3"); // pastikan file ada
  unlockSound.volume = 0.5;
  unlockSound.play();

  level.classList.add("unlock-anim");
  setTimeout(() => {
    level.classList.remove("unlock-anim");
  }, 1000);
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
    }, 3000);
  }, 100);
}

// ==================== 🔊 Efek Tombol ====================
function playButtonEffect() {
  const activeBtns = document.querySelectorAll("button:active");
  activeBtns.forEach((btn) => {
    btn.style.transform = "scale(0.96)";
    setTimeout(() => (btn.style.transform = "scale(1)"), 150);
  });
}

// ==================== 🔙 Kembali ke Game ====================
function backToGame() {
  playButtonEffect();
  window.location.href = "../../brain.html";
}

// ==================== 🚀 Inisialisasi ====================
document.addEventListener("DOMContentLoaded", () => {
  unlockEpisodes();
});
