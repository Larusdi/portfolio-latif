// ==================== 🎛️ INISIALISASI ====================
document.addEventListener("DOMContentLoaded", () => {
  const soundToggle = document.getElementById("soundToggle");
  const musicToggle = document.getElementById("musicToggle");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const notifToggle = document.getElementById("notifToggle");

  // Load preferensi dari localStorage
  soundToggle.checked = getPref("sound", true);
  musicToggle.checked = getPref("music", true);
  darkModeToggle.checked = getPref("darkMode", false);
  notifToggle.checked = getPref("notif", true);

  // Terapkan preferensi saat awal
  toggleDarkMode(darkModeToggle.checked);
  playButtonEffect();

  // Event listener untuk toggle
  soundToggle.addEventListener("change", () => {
    setPref("sound", soundToggle.checked);
    playButtonEffect();
  });

  musicToggle.addEventListener("change", () => {
    setPref("music", musicToggle.checked);
    playButtonEffect();
  });

  darkModeToggle.addEventListener("change", () => {
    setPref("darkMode", darkModeToggle.checked);
    toggleDarkMode(darkModeToggle.checked);
    playButtonEffect();
  });

  notifToggle.addEventListener("change", () => {
    setPref("notif", notifToggle.checked);
    playButtonEffect();
  });
});

// ==================== 🌙 MODE GELAP ====================
function toggleDarkMode(isOn) {
  document.body.classList.toggle("dark-mode", isOn);
}

// ==================== 💾 LOCAL STORAGE ====================
function setPref(key, value) {
  localStorage.setItem(`braintest_pref_${key}`, value);
}

function getPref(key, defaultVal = false) {
  const stored = localStorage.getItem(`braintest_pref_${key}`);
  return stored === null ? defaultVal : stored === "true";
}

// ==================== 🔊 EFEK TOMBOL ====================
function playButtonEffect() {
  const audio = new Audio("game/brain/audio/tap.mp3");
  audio.volume = 0.3;
  audio.play().catch(() => {});
}

// ==================== ⬅️ KEMBALI ====================
function backToGame() {
  window.location.href = "../../brain.html"; // arahkan kembali ke halaman utama game
}
