document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");
  const previewBox = document.getElementById("previewImage");
  const buktiInput = document.getElementById("buktiTransfer");
  const notifBox = document.getElementById("notifBox");
  const rememberMe = document.getElementById("rememberMe");
  const namaInput = form.elements["nama"];
  const metodeInput = form.elements["metode"];
  const timerEl = document.getElementById("timer");
  const submitBtn = document.getElementById("submitBtn");

  const nomorWA = "6282389160273"; //

  // ========== COUNTDOWN 15 MENIT ==========
  let timeLeft = 15 * 60;
  const countdown = setInterval(() => {
    const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const s = String(timeLeft % 60).padStart(2, "0");
    timerEl.textContent = `${m}:${s}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdown);
      timerEl.textContent = "Waktu habis";
      showNotif("⏰ Waktu pembayaran telah habis!", "error");
      submitBtn.disabled = true;
    }
  }, 1000);

  // ========== PREVIEW GAMBAR ==========
  buktiInput.addEventListener("change", () => {
    const file = buktiInput.files[0];
    previewBox.innerHTML = "";

    if (file && file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = () => URL.revokeObjectURL(img.src);
      previewBox.appendChild(img);
    } else {
      showNotif("📷 File tidak valid. Upload gambar saja.", "error");
    }
  });

  // ========== SUBMIT FORM ==========
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = namaInput.value.trim();
    const metode = metodeInput.value;
    const bukti = buktiInput.files[0];

    if (!nama || !metode || !bukti) {
      showNotif("⚠️ Harap lengkapi semua kolom!", "error");
      playSound("error");
      return;
    }

    // Spinner dan loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner"></span> Mengirim...`;

    const pesan = `*💳 Pembayaran Website*\n` +
      `👤 Nama: ${nama}\n` +
      `💰 Metode: ${metode}\n` +
      `📆 Waktu: ${new Date().toLocaleString("id-ID")}\n\n` +
      `📸 Bukti transfer telah diupload.\nSilakan dicek ya 🙏`;

    const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    setTimeout(() => {
      showNotif("✅ Data siap dikirim ke WhatsApp!", "success");
      playSound("success");
      submitBtn.disabled = false;
      submitBtn.textContent = "Kirim Pembayaran";

      window.open(linkWA, "_blank");

      // Redirect ke home opsional:
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }, 2000);
  });

  // ========== NOTIFIKASI ==========
  function showNotif(message, type) {
    notifBox.textContent = message;
    notifBox.className = `notif ${type}`;
    notifBox.style.display = "block";

    setTimeout(() => {
      notifBox.style.display = "none";
    }, 4000);
  }

  // ========== EFEK SUARA ==========
  function playSound(type) {
    const url = {
      success: "assets/sound/success.mp3",
      error: "assets/sound/error.mp3"
    }[type];

    if (!url) return;
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }
});
