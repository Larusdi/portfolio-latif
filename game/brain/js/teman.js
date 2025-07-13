// ==================== 🎁 Kirim Hadiah ke Teman ====================
function kirimHadiah() {
  showToast("🎁 Hadiah telah dikirim ke temanmu!");
  animateClicked(this);
}

// ==================== ⚔️ Tantang Teman Main ====================
function tantangTeman() {
  showToast("⚔️ Tantangan telah dikirim! Tunggu respon teman.");
  animateClicked(this);
}

// ==================== ➕ Ajak / Tambah Teman ====================
function ajakTeman() {
  showToast("🔗 Undangan teman telah disalin ke clipboard!");
  animateClicked(this);

  const inviteLink = "https://braintestpro.com/invite/teman123";
  navigator.clipboard.writeText(inviteLink).catch(() => {
    showToast("❌ Gagal menyalin link.");
  });
}

// ==================== 🔙 Kembali ke Game ====================
function backToGame() {
  window.location.href = "../../brain.html"; // Sesuaikan struktur folder kamu
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

// ==================== ✨ Efek Klik Tombol ====================
function animateClicked(button) {
  if (!button || typeof button !== "object") return;
  button.style.transform = "scale(0.96)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 120);
}

// ==================== 🔁 Animasi Masuk & Event Listener ====================
window.addEventListener("DOMContentLoaded", () => {
  // 🔁 Efek animasi masuk tiap item
  const temanItems = document.querySelectorAll(".teman-item");
  temanItems.forEach((item, index) => {
    item.style.animation = `fadeSlideIn 0.4s ease ${(index + 1) * 0.1}s forwards`;
    item.style.opacity = 0;
  });

  // ✅ Pasang event listener ke tombol-tombol
  document.querySelectorAll(".teman-actions button").forEach(btn => {
    btn.addEventListener("click", function () {
      animateClicked(this);
    });
  });

  const ajakBtn = document.querySelector("button[onclick*='ajakTeman']");
  const kembaliBtn = document.querySelector("button[onclick*='backToGame']");

  if (ajakBtn) ajakBtn.addEventListener("click", ajakTeman);
  if (kembaliBtn) kembaliBtn.addEventListener("click", backToGame);
});
