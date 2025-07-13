// ==================== ⚙️ Inisialisasi Coin & Diamond ====================
let coin = 0;
let diamond = 0;

// Ambil nilai dari localStorage atau default
function loadCurrency() {
  coin = parseInt(localStorage.getItem("coin"));
  diamond = parseInt(localStorage.getItem("diamond"));

  // Jika tidak ada (null), set default
  if (isNaN(coin)) coin = 150;
  if (isNaN(diamond)) diamond = 25;

  saveCurrency(); // Pastikan tersimpan saat awal
}

// Update tampilan
function updateCurrencyDisplay() {
  document.querySelectorAll(".coin-display").forEach(el => {
    el.textContent = coin.toLocaleString();
  });
  document.querySelectorAll(".diamond-display").forEach(el => {
    el.textContent = diamond.toLocaleString();
  });
}

// Simpan ke localStorage
function saveCurrency() {
  localStorage.setItem("coin", coin);
  localStorage.setItem("diamond", diamond);
}

// Reset data
function resetCurrency() {
  if (confirm("Yakin ingin reset coin dan diamond ke awal?")) {
    coin = 150;
    diamond = 25;
    saveCurrency();
    updateCurrencyDisplay();
    alert("🔄 Akun berhasil direset ke nilai awal.");
  }
}

// Beli item (pakai coin)
function buyItem(item, price) {
  if (coin < price) {
    alert("❌ Coin kamu tidak cukup.");
    return;
  }

  if (confirm(`Yakin beli ${item.toUpperCase()} seharga ${price} coin?`)) {
    coin -= price;
    saveCurrency();
    updateCurrencyDisplay();

    const pesan = {
      hint: "🪄 Hint aktif: 2 jawaban salah disembunyikan.",
      skip: "⏩ Soal akan dilewati.",
      reveal: "🧠 Jawaban ditampilkan otomatis."
    }[item] || "✅ Item berhasil dibeli!";

    alert(pesan);
  }
}

// Tambah coin/diamond
function buyCoin(amount) {
  coin += amount;
  saveCurrency();
  updateCurrencyDisplay();
  alert(`✅ Kamu mendapatkan ${amount} coin.`);
}

function buyDiamond(amount) {
  diamond += amount;
  saveCurrency();
  updateCurrencyDisplay();
  alert(`✅ Kamu mendapatkan ${amount} diamond.`);
}


// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  loadCurrency();
  updateCurrencyDisplay();
});

//localStorage.removeItem("coin");------ tombol reset
//localStorage.removeItem("diamond");------ tombol reset


// ==================== 🎭 BELI AVATAR ====================
function beliAvatar(filename, harga) {
  let owned = JSON.parse(localStorage.getItem("ownedAvatars")) || ["avatar1.png"];

  // Sudah punya?
  if (owned.includes(filename)) {
    alert("✅ Kamu sudah memiliki avatar ini.");
    return;
  }

  // Coin cukup?
  if (coin < harga) {
    alert("❌ Coin tidak cukup.");
    return;
  }

  // Konfirmasi
  if (!confirm(`Beli avatar "${filename}" seharga ${harga} coin?`)) return;

  // Kurangi coin & simpan
  coin -= harga;
  owned.push(filename);
  saveCurrency();
  localStorage.setItem("ownedAvatars", JSON.stringify(owned));

  updateCurrencyDisplay();
  alert("🎉 Avatar berhasil dibeli!");
}


// ==================== 🔁 GANTI TAB TOKO ====================
function showTab(tabId) {
  document.querySelectorAll(".store-tab").forEach(tab => {
    tab.classList.remove("active");
  });

  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add("active");
}

// ==================== 🚀 SAAT HALAMAN DIBUKA ====================
window.addEventListener("DOMContentLoaded", () => {
  loadCurrency();
  updateCurrencyDisplay();
});

// ==================== 🔙 Fungsi Kembali ====================
function goBackWithExit(target = "../../brain.html") {

  requestAnimationFrame(() => {
    document.body.classList.add("page-exit");
    setTimeout(() => {
      window.location.href = target; "../../brain.html"
    }, 500);
  });
}
