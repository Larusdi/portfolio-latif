// ==================== 📦 HEADER BUTTON ====================
document.querySelectorAll(".header-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const label = btn.textContent.trim().toLowerCase();
    if (label.includes("kirim")) {
      window.location.href = "game/brain/kirim.html";
    } else if (label.includes("masuk")) {
      window.location.href = "game/brain/login.html";
    } else if (label.includes("pengaturan")) {
      window.location.href = "game/brain/pengaturan.html";
    }
  });
});

function goToProfile() {
  window.location.href = "game/brain/saya.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const avatar = localStorage.getItem("playerAvatar") || "saya1.png";
  document.getElementById("profileAvatar").src = `game/brain/icon/${avatar}`;
});


// ==================== 🔥 MODE CERITA ====================
document.querySelector(".big-button")?.addEventListener("click", () => {
  window.location.href = "game/brain/cerita.html";
});


// ==================== 🧠 MENU TENGAH ====================
const menuMap = {
  "Level Puzzle": "level.html",
  "Mode Cepat": "mode-cepat.html",
  "Brain VS Brain": "versus.html",
  "Daily Test": "daily.html",
  "Logika Klasik": "logika.html",
  "Lainnya": "lainnya.html"
};

document.querySelectorAll(".menu-btn").forEach(btn => {
  const label = btn.textContent.trim();
  const target = menuMap[label];
  btn.addEventListener("click", () => {
    if (target) {
      window.location.href = target;
    } else {
      alert("🚧 Fitur belum tersedia.");
    }
  });
});



// ==================== 🚀 MULAI TES ====================
document.querySelector(".btn-mulai")?.addEventListener("click", () => {
  window.location.href = "level.html"; // ganti jika lokasi berbeda
});

document.querySelectorAll(".footer-nav button").forEach(btn => {
  const label = btn.textContent.trim();
  if (label === "🚀 Mulai Tes") return;
  const page = footerMap[label];
  btn.addEventListener("click", () => {
    if (page) {
      window.location.href = page;
    } else {
      alert("🚧 Fitur belum tersedia.");
    }
  });
});


// ==================== 🔻 FOOTER NAVIGATION ====================
const footerMap = {
  "VIP": "vip.html",
  "Undang": "undang.html",
  "Hadiah": "reward.html",
  "Teman": "teman.html",
  "Inbox": "inbox.html",
  "Toko": "store.html"
};