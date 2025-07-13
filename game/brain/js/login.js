// ==================== 🔐 Login Validasi ====================
function handleLogin(event) {
  event.preventDefault(); // Mencegah reload

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember")?.checked;

  if (!username || !password) {
    showToast("⚠️ Username dan Password wajib diisi!");
    playButtonEffect();
    return;
  }

  // Simulasi login (dummy user)
  if (username === "player" && password === "123456") {
    showToast("✅ Login berhasil!");

    if (remember) {
      localStorage.setItem("rememberedUser", username);
    } else {
      localStorage.removeItem("rememberedUser");
    }

    setTimeout(() => {
      window.location.href = "../../brain.html"; // arahkan ke halaman utama
    }, 1500);
  } else {
    showToast("❌ Username atau Password salah!");
  }

  playButtonEffect();
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

// ==================== 🔊 Efek Tombol Klik ====================
function playButtonEffect() {
  const buttons = document.querySelectorAll("button:active");
  buttons.forEach(btn => {
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);
  });
}

// ==================== 🌟 Toggle Lihat Password ====================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      toggleBtn.innerHTML = type === "password"
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
    });
  }

  // Auto-isi nama pemain jika di-remember
  const rememberedUser = localStorage.getItem("rememberedUser");
  if (rememberedUser) {
    document.getElementById("username").value = rememberedUser;
    const checkbox = document.getElementById("remember");
    if (checkbox) checkbox.checked = true;
  }
});

// ==================== 🔁 Login Sosial Media Dummy ====================
function socialLogin(platform) {
  const platformName = platform === "google" ? "Google" : "Facebook";
  showToast(`🔒 Login dengan ${platformName} (dummy)`);

  setTimeout(() => {
    window.location.href = "../../brain.html"; // dummy redirect
  }, 1500);
}

// ==================== 🔙 Kembali ke Game ====================
function backToGame() {
  window.location.href = "../../brain.html";
}
