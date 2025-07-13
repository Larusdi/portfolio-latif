// ==================== 📋 Salin Link ====================
function salinLink() {
  const input = document.getElementById("referralLink");
  input.select();
  input.setSelectionRange(0, 99999); // Untuk mobile

  navigator.clipboard.writeText(input.value).then(() => {
    showToast("✅ Link berhasil disalin!");
  }).catch(() => {
    showToast("❌ Gagal menyalin link.");
  });
}

// ==================== 🟢 Bagikan via WhatsApp ====================
function shareWhatsapp() {
  const link = document.getElementById("referralLink").value;
  const message = `Yuk main bareng di Brain Test Pro 2025! 🎮\nGabung lewat link ini: ${link}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
}

// ==================== 🔔 Tampilkan Toast ====================
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

// ==================== 🔙 Kembali ke Game ====================
function backToGame() {
  window.location.href = "../../brain.html"; // Sesuaikan struktur kamu
}
