// ==================== 📥 Load Data Profil ====================
let playerName = "";
let playerXP = 0;
let playerLevel = 1;
let coin = 0;
let diamond = 0;

function loadProfile() {
  playerName = localStorage.getItem("playerName") || "";
  playerXP = parseInt(localStorage.getItem("playerXP")) || 0;
  playerLevel = parseInt(localStorage.getItem("playerLevel")) || 1;

  document.getElementById("playerName").value = playerName;

  updateXPDisplay();
  updateCurrencyDisplay();
}

// ==================== 🎮 Simpan Profil ====================
function saveProfile() {
  const nameInput = document.getElementById("playerName").value.trim();
  if (nameInput === "") {
    showToast("⚠️ Nama pemain tidak boleh kosong.");
    return;
  }

  playerName = nameInput;
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("playerXP", playerXP);
  localStorage.setItem("playerLevel", playerLevel);
  showToast("✅ Profil berhasil disimpan.");
}

// ==================== 🎭 Avatar Modal ====================
function selectAvatar(filename) {
  // Simpan avatar ke localStorage
  localStorage.setItem("playerAvatar", filename);

  // Tampilkan avatar baru
  document.getElementById("playerAvatar").src = `icon/${filename}`;

  // Tutup modal
  closeAvatarModal();
  showToast("✅ Avatar berhasil diganti!");
}

function closeAvatarModal() {
  document.getElementById("avatarModal").classList.add("hidden");
}

// ==================== 💰 Data Coin & Diamond ====================
function loadCurrency() {
  coin = parseInt(localStorage.getItem("coin")) || 150;
  diamond = parseInt(localStorage.getItem("diamond")) || 25;
}

function updateCurrencyDisplay() {
  document.querySelectorAll(".coin-display").forEach(el => {
    el.textContent = coin.toLocaleString();
  });
  document.querySelectorAll(".diamond-display").forEach(el => {
    el.textContent = diamond.toLocaleString();
  });
}

// ==================== ⭐ XP & Level ====================
function updateXPDisplay() {
  const xpPerLevel = 100;
  const currentXP = playerXP % xpPerLevel;
  const progressPercent = (currentXP / xpPerLevel) * 100;

  document.getElementById("levelText").textContent = playerLevel;
  document.getElementById("xpText").textContent = `${currentXP}/${xpPerLevel} XP`;
  document.querySelector(".progress-fill").style.width = `${progressPercent}%`;
}

function addXP(amount = 20) {
  const xpPerLevel = 100;
  playerXP += amount;

  while (playerXP >= playerLevel * xpPerLevel) {
    playerXP -= playerLevel * xpPerLevel;
    playerLevel++;
    showToast(`🎉 Level naik ke ${playerLevel}!`);
  }

  updateXPDisplay();
  saveProfile();
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
  activeBtns.forEach(btn => {
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);
  });
}

// ==================== 🔙 Kembali ====================
function backToGame() {
  playButtonEffect();
  window.location.href = "../../brain.html";
}

// ==================== 🚀 Inisialisasi ====================
document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadCurrency();

  // Set avatar dari localStorage
  const savedAvatar = localStorage.getItem("playerAvatar") || "avatar1.png";
  document.getElementById("playerAvatar").src = `icon/${savedAvatar}`;

  // Tombol simpan & tambah XP
  document.getElementById("simpanBtn").addEventListener("click", saveProfile);
  document.getElementById("xpTestBtn").addEventListener("click", () => addXP(20));

  // Tombol buka modal avatar
 document.getElementById("editAvatarBtn").addEventListener("click", tampilkanAvatarModal);
  });


// ==================== avatar ====================
function tampilkanAvatarModal() {
  const avatarGrid = document.querySelector(".avatar-grid");
  avatarGrid.innerHTML = ""; // Bersihkan

  const owned = JSON.parse(localStorage.getItem("ownedAvatars")) || ["avatar1.png"];
  const currentAvatar = localStorage.getItem("playerAvatar") || "avatar1.png";

  // Semua avatar yang tersedia (daftar lengkap)
  const allAvatars = [
    "avatar1.png", "saya1.png", "saya2.png", "saya3.png", "saya4.png", "saya5.png", "saya6.png",
    "saya7.png", "saya8.png", "saya9.png",
  ];

  allAvatars.forEach(filename => {
    const img = document.createElement("img");
    img.src = `icon/${filename}`;

    if (owned.includes(filename)) {
      // Avatar sudah dimiliki
      img.onclick = () => selectAvatar(filename);

      if (filename === currentAvatar) {
        img.classList.add("active-avatar"); // tambahkan efek border biru
      }
    } else {
      // Avatar belum dimiliki
      img.classList.add("locked");
    }

    avatarGrid.appendChild(img);
  });

  document.getElementById("avatarModal").classList.remove("hidden");
}

