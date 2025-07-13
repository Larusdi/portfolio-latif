// ==================== 🔄 Handle Reset Password ====================
function handleForgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (!email || !email.includes("@")) {
    showToast("⚠️ Masukkan email yang valid!");
    return;
  }

  // Tampilkan spinner loading
  const btn = event.target.querySelector("button[type='submit']");
  const spinner = document.createElement("span");
  spinner.className = "spinner";
  btn.appendChild(spinner);

  btn.disabled = true;

  showToast("⏳ Memproses permintaan...");

  // Simulasi kirim email reset
  setTimeout(() => {
    btn.removeChild(spinner);
    btn.disabled = false;

    showToast("📬 Email reset dikirim ke " + email);

    // Redirect setelah sukses
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }, 2500);
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
  const form = document.getElementById("forgotForm");
  if (form) {
    form.addEventListener("submit", handleForgotPassword);
  }
});
