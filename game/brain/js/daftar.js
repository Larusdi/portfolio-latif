// ==================== 🧾 Handle Pendaftaran ====================
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirm = document.getElementById("registerConfirm").value.trim();

  if (!name || !email || !password || !confirm) {
    showToast("⚠️ Semua kolom wajib diisi!");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showToast("📧 Masukkan email yang valid!");
    return;
  }

  if (password.length < 6) {
    showToast("🔒 Password minimal 6 karakter!");
    return;
  }

  if (password !== confirm) {
    showToast("❌ Konfirmasi password tidak cocok!");
    return;
  }

  showToast("✅ Berhasil daftar! Menyimpan data...");

  // Simpan ke localStorage (simulasi database user)
  const userData = { name, email, password };
  localStorage.setItem("registeredUser", JSON.stringify(userData));

  // Redirect ke login setelah 2 detik
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
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

// ==================== 🚀 Inisialisasi ====================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", handleRegister);
  }
});
