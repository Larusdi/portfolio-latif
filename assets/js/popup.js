/*==================== 📢 POPUP IKLAN OTOMATIS ====================*/
window.addEventListener("load", () => {
  const agreeTerms = document.getElementById("agreeTerms");
  const btnToPayment = document.getElementById("btnToPayment");

  // 🔄 Reset status checkbox & tombol saat halaman dimuat
  if (agreeTerms) agreeTerms.checked = false;
  if (btnToPayment) btnToPayment.disabled = true;

  // ⏳ Tampilkan popup iklan setelah 10 detik
  setTimeout(() => {
    const popup = document.getElementById("popup-ad");
    if (popup) popup.classList.add("show");
  }, 10000);
});

/*==================== ❌ TUTUP POPUP IKLAN ====================*/
function closePopupAd() {
  const popup = document.getElementById("popup-ad");
  if (popup) popup.classList.remove("show");
}

/*==================== 💳 BUKA MODAL PEMBAYARAN ====================*/
function openPaymentModal() {
  // Tutup iklan terlebih dahulu
  closePopupAd();

  const modal = document.getElementById("payment-modal");
  const agreeTerms = document.getElementById("agreeTerms");
  const btnToPayment = document.getElementById("btnToPayment");

  if (modal) modal.classList.add("show-modal");

  // 🔁 Reset centang dan nonaktifkan tombol saat modal dibuka
  if (agreeTerms) agreeTerms.checked = false;
  if (btnToPayment) btnToPayment.disabled = true;
}

/*==================== ❌ TUTUP MODAL PEMBAYARAN ====================*/
function closePaymentModal() {
  const modal = document.getElementById("payment-modal");
  if (modal) modal.classList.remove("show-modal");

  // Tampilkan kembali popup iklan
  const popup = document.getElementById("popup-ad");
  if (popup) popup.classList.add("show");
}

/*==================== ✅ CEKLIST SYARAT & AKSI LANJUT ====================*/
const agreeTerms = document.getElementById("agreeTerms");
const btnToPayment = document.getElementById("btnToPayment");

if (agreeTerms && btnToPayment) {
  // Aktifkan tombol jika checkbox disetujui
  agreeTerms.addEventListener("change", () => {
    btnToPayment.disabled = !agreeTerms.checked;
  });

  // Arahkan ke halaman pembayaran saat tombol ditekan
  btnToPayment.addEventListener("click", () => {
    window.location.href = "pembayaran.html";
  });
}
