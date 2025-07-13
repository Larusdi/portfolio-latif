// ==================== 📤 Handle Kirim Hadiah ====================
function handleKirim(event) {
  event.preventDefault();

  const recipient = document.getElementById("recipient").value.trim();
  const item = document.getElementById("item").value;
  const message = document.getElementById("message").value.trim();
  const submitBtn = event.target.querySelector("button[type='submit']");

  if (!recipient || !item) {
    showToast("⚠️ Harap isi semua kolom wajib!");
    return;
  }

  // Tombol disabled saat loading
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Mengirim... <span class="spinner"></span>';

  showToast(`⏳ Mengirim hadiah ke ${recipient}...`);

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    showToast(`🎁 Hadiah berhasil dikirim ke ${recipient}!`);

    // Reset form
    document.getElementById("kirimForm").reset();
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

// ==================== 🚀 Kembali ke Halaman Game ====================
function backToGame() {
  window.location.href = "../../brain.html"; // atau sesuai halaman utama
}

// ==================== ✅ Inisialisasi ====================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("kirimForm");
  if (form) {
    form.addEventListener("submit", handleKirim);
  }
});
