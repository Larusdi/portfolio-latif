/* ===============================================================
📁 FILE: main.js (lanjutan)
🧠 Fungsi: Preloader, Badut ai, Chatbot Badut, Iklan Popup., Kursor.
=================================================================== */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const aiButton = document.getElementById("toggleChat");
  const chatNotif = document.getElementById("chatNotif");
  const chatBox = document.getElementById("chatBox");
  const audio = document.getElementById("preloader-audio");

  // 🔒 Kunci scroll selama preloader tampil
  document.documentElement.classList.add("loading");
  document.body.classList.add("loading");

  // 🔊 Putar audio saat preloader mulai
  if (audio) {
    audio.volume = 0.9;
    audio.currentTime = 0;
    audio.play().catch(e => {
      console.warn("Audio gagal diputar:", e);
    });
  }

  // ⏱️ Delay 3 detik lalu fade-out preloader
  setTimeout(() => {
    preloader.classList.add("fade-out");

    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";

      setTimeout(() => {
        // 🛑 Hentikan audio setelah preloader selesai
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }

        preloader.remove(); // Hapus elemen preloader
        document.documentElement.classList.remove("loading");
        document.body.classList.remove("loading");

        // 🎭 Tampilkan tombol AI setelah 5 detik
        setTimeout(() => {
          if (aiButton) {
            aiButton.style.display = "flex";
            setTimeout(() => aiButton.classList.add("show"), 50);

            if (typeof animateBadutAI === "function") {
              setInterval(animateBadutAI, 5000);
            }

            setTimeout(() => {
              if (chatNotif && chatBox && !chatBox.classList.contains("show")) {
                chatNotif.style.display = "flex";
                chatNotif.classList.add("show");
              }
            }, 10000);
          }
        }, 5000);
      }, 800);
    }, 500);
  }, 3000);
});


/*==================== 🤡 TOGGLE CHATBOX & NOTIF BADUT AI ====================*/

// Ambil elemen penting: tombol toggle, chatbox, notifikasi, dan area pesan
const toggleChat = document.getElementById("toggleChat");
const chatBox = document.getElementById("chatBox");
const chatNotif = document.getElementById("chatNotif");
const chatMessages = document.getElementById("chatMessages");

// ✅ Ketika ikon Badut AI ditekan
if (toggleChat && chatBox && chatMessages) {
  toggleChat.addEventListener("click", () => {
    // Toggle tampilan chatbox (muncul/sembunyi)
    chatBox.classList.toggle("show");

    // ❌ Nonaktifkan sambutan otomatis saat chatbox dibuka
    // showAssistantGreeting(); // Aktifkan ini jika ingin sambutan langsung muncul

    // ✅ Sembunyikan notifikasi jika sedang tampil
    if (chatNotif) {
      chatNotif.classList.remove("show");
      chatNotif.style.display = "none";
    }
  });
}



/*==================== 🤖 CHATBOT AI OFFLINE MODE ====================*/
document.addEventListener("DOMContentLoaded", () => {
const aiToggle = document.querySelector(".ai-assistant-toggle");
const aiChatbox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("sendButton");
const chatClose = document.getElementById("closeChat");
const resetChat = document.getElementById("resetChat");
const soundToggle = document.getElementById("soundToggle");

let soundOn = true;

// 🎵 Suara efek
const soundOpen = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_3f59c1f116.mp3?filename=pop-94319.mp3");
const soundMessage = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_b1930b8200.mp3?filename=message-94103.mp3");

// 💾 Simpan pesan ke localStorage
function saveChatToLocal(sender, message) {
const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
history.push({ sender, message });
localStorage.setItem("chatHistory", JSON.stringify(history));
}

// 📜 Muat ulang pesan sebelumnya dari localStorage
function loadChatFromLocal() {
const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
chatMessages.innerHTML = "";
history.forEach((entry) => {
const div = document.createElement("div");
div.className = "chat-message " + (entry.sender === "user" ? "user" : "ai");
div.innerHTML = entry.sender === "user"
? entry.message
: `<div class="bubble">${entry.message}</div>`;
chatMessages.appendChild(div);
});
chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 🧹 Bersihkan chat dari localStorage saat reload
window.addEventListener("load", () => {
  localStorage.removeItem("chatHistory");
});


// 🔊 Putar efek suara
function playSound(type = "message") {
if (!soundOn) return;
const sfx = type === "open" ? soundOpen : soundMessage;
sfx.pause();
sfx.currentTime = 0;
sfx.play();
}

// 🎛️ Tampilkan chatbot
aiToggle.addEventListener("click", () => {
aiChatbox.classList.add("active");
aiToggle.style.display = "none";
loadChatFromLocal();
});

// ❌ Tutup chatbot
chatClose.addEventListener("click", () => {
aiChatbox.classList.remove("active");
aiToggle.style.display = "flex";
chatMessages.innerHTML = "";
chatInput.value = "";
localStorage.removeItem("chatHistory");
});

// 🔄 Reset chat manual
resetChat.addEventListener("click", () => {
const confirmReset = confirm("Yakin ingin menghapus semua pesan?");
if (confirmReset) {
chatMessages.innerHTML = "";
localStorage.removeItem("chatHistory");
playSound("open");
}
});

// 🔇 Tombol suara ON/OFF
soundToggle.addEventListener("click", () => {
soundOn = !soundOn;
const icon = soundToggle.querySelector("i");
icon.classList.toggle("fa-volume-mute", !soundOn);
icon.classList.toggle("fa-volume-up", soundOn);
});

// ⌨️ Tinggi input otomatis
chatInput.addEventListener("input", () => {
chatInput.style.height = "auto";
chatInput.style.height = chatInput.scrollHeight + "px";
});

// ⏎ Enter untuk kirim (tanpa shift)
chatInput.addEventListener("keydown", (e) => {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
sendMessage();
}
});

// 🖱️ Tombol kirim
chatSend.addEventListener("click", sendMessage);



// 🔄 Helper scroll ke bawah
function scrollToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

/*==================== 🧠 BALASAN AI OFFLINE SEDERHANA ====================*/
function getOfflineReply(input) {
const msg = input.toLowerCase().trim();
const replies = {
"halo": "Hai juga! Ada yang bisa dibantu?",
"hai": "Halo! Aku Badut AI 🤡",
"assalamualaikum": "Waalaikumsalam! 😊",
"selamat pagi": "Pagi juga! Semangat ya!",
"siapa kamu": "Aku Badut AI, teman offline-mu! 🎪",
"terima kasih": "Sama-sama! Senang bisa bantu 🎉",
"aku sedih": "Yuk senyum dulu... 😊",
"kamu jomblo?": "Iya dong, AI fokus sukses 🤓",
"latif siapa": "Latif itu penciptaku 🔧❤️",
"bye": "Sampai jumpa lagi ya 👋"
};

if (replies[msg]) return addEmoji(replies[msg]);

const fallback = [
"Hmm... belum ngerti 😅",
"Coba ulangi ya 🙈",
"Aku masih belajar 🤹‍♂️",
];
return addEmoji(fallback[Math.floor(Math.random() * fallback.length)]);
}

// 🎉 Tambah emoji acak ke balasan
function addEmoji(text) {
const emojis = ["🎈", "🎪", "🤡", "✨", "💬"];
return `${text} ${emojis[Math.floor(Math.random() * emojis.length)]}`;
}

// ==================== 📺 Tombol Fullscreen Chatbox ====================
const fullscreenToggle = document.getElementById("toggleFullscreen");
if (fullscreenToggle) {
  fullscreenToggle.addEventListener("click", () => {
    document.body.classList.toggle("fullscreen-mode");
  });
}

// ==================== 🎭 Tombol Buka Chatbox dari Ikon Badut ====================
const toggleChat = document.getElementById("toggleChat");
const chatBox = document.getElementById("chatBox");
if (toggleChat && chatBox) {
  toggleChat.addEventListener("click", () => {
    chatBox.classList.add("active");             // ✅ Gunakan class
    toggleChat.classList.add("hidden");          // ✅ Sembunyikan tombol badut pakai class
    showAssistantGreeting();
  });
}

// ==================== ❌ Tombol Close Chatbox ====================
const closeChat = document.getElementById("closeChat");
if (closeChat && toggleChat && chatBox) {
  closeChat.addEventListener("click", () => {
    chatBox.classList.remove("active");          // ✅ Sembunyikan dengan class
    toggleChat.classList.remove("hidden");       // ✅ Tampilkan ikon badut
    document.body.classList.remove("fullscreen-mode");
  });
}


/*==================== 🤖 TANGGAPAN DARI TOMBOL PILIHAN ====================*/
// 👋 Sambutan profesional + efek mengetik
async function showAssistantGreeting() {
  const chatMessages = document.getElementById("chatMessages");
  if (!chatMessages) {
    console.warn("❌ Elemen chatMessages tidak ditemukan.");
    return;
  }

  // 🟡 Tampilkan indikator mengetik
  const typingBubble = document.createElement("div");
  typingBubble.className = "chat-message ai";
  typingBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble typing-indicator">
      <span></span><span></span><span></span>
    </div>`;
  chatMessages.appendChild(typingBubble);
  playSound("message");
  scrollToBottom();

  // ⏳ Tunggu efek ngetik (1 detik)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 🧹 Hapus typing bubble
  chatMessages.removeChild(typingBubble);

  // 📦 Konten sambutan + tombol
  const greeting = `Halo! 👋<br>
    Selamat datang di <strong>Badut AI Assistant</strong>.<br>
    Saya siap membantu Anda kapan saja.<br><br>
    Silakan pilih layanan berikut atau ketik langsung pertanyaan Anda:`;

  const greetBubble = document.createElement("div");
  greetBubble.className = "chat-message ai";
  greetBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble">
      ${greeting}
      <div class="assistant-options vertical">
        <button class="option-btn" data-type="website">🖥️ Buat Website</button>
        <button class="option-btn" data-type="portfolio">📁 Buat Portofolio</button>
        <button class="option-btn" data-type="toko">🏪 Buka Toko Online</button>
        <button class="option-btn" data-type="promo">🎉 Tampilkan Penawaran</button>
        <button class="option-btn" data-type="game">🎮 Main Game Seru</button>
        <button class="option-btn" data-type="desain">🎨 Butuh Desain Logo / Branding</button>
        <button class="option-btn" data-type="cv">📝 Buat CV Profesional</button>
        <button class="option-btn" data-type="curhat">💬 Tanya Biasa / Curhat</button>
        <button class="option-btn" data-type="kontak">📞 Hubungi Admin / Bantuan Langsung</button>
        <button class="option-btn" data-type="lainnya">📌 Lainnya</button>
      </div>
    </div>`;
  chatMessages.appendChild(greetBubble);
  scrollToBottom();

  // ✅ Tambahkan event listener ke tombol
  const optionButtons = greetBubble.querySelectorAll(".option-btn");
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-type");
      if (type) handleOption(type);
    });
  });
}


// 🧠 Tanggapan & aksi langsung dari tombol pilihan
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        resolve(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(`Elemen ${selector} tidak ditemukan dalam ${timeout}ms`);
      }
    }, 100);
  });
}

// 🧠 Fungsi utama (pakai async)
async function handleOption(type) {
  console.log("👉 Tombol diklik:", type);

  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");

  if (!chatMessages || !chatInput) {
    console.warn("Elemen chatMessages atau chatInput tidak ditemukan.");
    return;
  }

  let userText = "";
  let action = null;

  switch(type) {
    case 'website':
      userText = "Saya ingin membuat website profesional.";
      break;
    case 'portfolio':
      userText = "Saya ingin membuat portofolio online.";
      break;
    case 'toko':
      userText = "Saya ingin membuka toko online.";
      break;


case 'promo': {
  const promoText = "Tampilkan penawaran spesial yang tersedia.";
  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user";
  userBubble.innerText = promoText;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", promoText);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // ⏳ Efek ketik AI
  await new Promise(resolve => setTimeout(resolve, 600));
  const replyBubble = document.createElement("div");
  replyBubble.className = "chat-message ai";
  replyBubble.innerHTML = `
    <div class="icon-circle glow"></div>
    <div class="bubble">
      <strong>🎁 Penawaran Eksklusif untuk Kamu!</strong><br><br>
      Kami punya <span class="highlight">promo spesial terbatas</span> hari ini.<br>
      Ingin melihat iklan yang sempat kamu tutup tadi? 👀<br><br>

      <div class="btn-group">
        <button class="option-btn glow" id="confirmShowAd">✅ Tampilkan Lagi</button>
        <button class="option-btn secondary" id="cancelShowAd">⏳ Nanti Saja</button>
      </div>
    </div>`;
  chatMessages.appendChild(replyBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  playSound("message");

  try {
    const confirmBtn = await waitForElement("#confirmShowAd");
    const cancelBtn = await waitForElement("#cancelShowAd");

    // ✅ Tampilkan kembali popup
    confirmBtn.addEventListener("click", () => {
      const popup = document.getElementById("popup-ad");
      if (popup) {
        popup.classList.add("show");
        playSound("open");
        // Optional: tracking atau log tambahan
        saveChatToLocal("ai", "Menampilkan ulang popup promo.");
      } else {
        alert("❌ Popup belum ditemukan di halaman.");
        console.warn("❌ Elemen #popup-ad tidak ditemukan.");
      }
    });

    // ⏳ Tunda dulu
    cancelBtn.addEventListener("click", async () => {
      const waitReply = document.createElement("div");
      waitReply.className = "chat-message ai";
      waitReply.innerHTML = `
        <div class="icon-circle glow"></div>
        <div class="bubble">Baiklah, kapan saja kamu siap tekan saja tombol <span class="highlight">Promo</span> lagi ya 😊</div>`;
      chatMessages.appendChild(waitReply);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      playSound("message");

      await new Promise(r => setTimeout(r, 800));
      showAssistantGreeting(); // Tampilkan menu utama lagi
    });
  } catch (err) {
    console.warn("❌ Gagal memuat tombol promo:", err);
  }

  return; // 🚫 Stop kirim ke AI online
}


case 'game': {
  userText = "Saya ingin bermain game seru di sini!";

  // 💬 Tampilkan pesan user
  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user";
  userBubble.innerText = userText;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", userText);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // ⏳ Efek ketik
  await new Promise(r => setTimeout(r, 1000));

  // 🎮 Balasan AI
  const replyBubble = document.createElement("div");
  replyBubble.className = "chat-message ai";
  replyBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble">
      Seru! Saya punya beberapa <strong>mini game eksklusif</strong> untuk hiburan sekaligus melatih fokus dan logika kamu 🧠🎮<br><br>

      🔹 <a href="brain.html" class="chat-link" target="_blank" rel="noopener">🧠 Brain Test</a><br>
      <small>Uji logikamu dalam tantangan pilihan ganda dan teka-teki cerdas.</small><br><br>

      🔸 <a href="game-tebak-gambar.html" class="chat-link" target="_blank" rel="noopener">🖼️ Tebak Gambar</a><br>
      <small>Tantangan visual – tebak objek dari potongan gambar.</small><br><br>

      🔸 <a href="game-puzzle.html" class="chat-link" target="_blank" rel="noopener">🧩 Puzzle Logika</a><br>
      <small>Susun potongan, pecahkan pola, dan latih kesabaranmu!</small><br><br>

      💡 Ingin game lain? Ketik saja <strong>game lainnya</strong> atau sebutkan jenis game yang kamu suka (misal: kuis, teka-teki, memori, matematika ringan, dll).<br><br>

      Selamat bermain dan jangan lupa rehat sejenak juga ya! 🎉😉
    </div>`;
  chatMessages.appendChild(replyBubble);
  playSound("message");
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return;
}


case 'desain': {
  userText = "Saya butuh desain logo atau branding.";

  // 💬 Tampilkan pesan user
  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user";
  userBubble.innerText = userText;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", userText);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // ⏳ Efek ketik
  await new Promise(r => setTimeout(r, 1000));

  // 🤖 Balasan AI detail
  const replyBubble = document.createElement("div");
  replyBubble.className = "chat-message ai";
  replyBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble">
      Desain bukan hanya soal estetika — ini soal <strong>identitas, kredibilitas, dan daya saing</strong> 💡<br><br>

      Saya bekerja sebagai <strong>Visual Branding Specialist</strong>, membantu brand seperti Anda tampil profesional dan dipercaya secara instan.<br><br>

      ✨ Layanan desain yang saya tawarkan:<br>
      • Logo Premium (versi utama & sekunder)<br>
      • Branding Kit (warna, tipografi, logo usage guide)<br>
      • Desain Kemasan Produk<br>
      • Desain Feed Sosial Media<br>
      • Company Profile (PDF + Web)<br>
      • Visual Identity Guidelines<br><br>

      💼 Semua proyek saya dikerjakan secara:<br>
      • 100% custom, tanpa template<br>
      • Riset pasar & kompetitor<br>
      • Mockup profesional<br>
      • Preview sebelum finalisasi<br><br>

      💰 Berikut pilihan paket:<br>
      🔹 <strong>Basic</strong> – Rp150.000<br>
      - 1 konsep logo + 1 revisi<br>
      - File PNG/WEBP<br><br>

      🔸 <strong>Pro</strong> – Rp300.000<br>
      - 2 konsep logo + 3 revisi<br>
      - Branding Kit (warna + font)<br>
      - File PNG, SVG, PDF<br><br>

      🟣 <strong>Corporate</strong> – Rp600.000+<br>
      - 3 konsep logo + 5 revisi<br>
      - Branding Kit Lengkap<br>
      - Visual Guideline PDF<br>
      - Mockup Produk + Media Sosial<br><br>

      📥 Jika kamu siap atau ingin konsultasi dulu,<br>
      silakan klik bagian <strong><a href="#contact" class="chat-link">Contact Me</a></strong> dan isi kebutuhanmu ya ✍️<br><br>

      Saya akan bantu langsung dengan komunikasi cepat, hasil profesional, dan pengalaman menyenangkan. 🎯🚀
    </div>`;
  chatMessages.appendChild(replyBubble);
  playSound("message");
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // 🔽 Scroll otomatis ke kontak
  await new Promise(r => setTimeout(r, 2800));
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }

  return;
}


case 'cv': {
  userText = "Saya ingin membuat CV yang profesional.";

  // Tampilkan bubble user
  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user";
  userBubble.innerText = userText;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", userText);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Efek ketik AI
  await new Promise(r => setTimeout(r, 800));

  // Bubble balasan AI
  const replyBubble = document.createElement("div");
  replyBubble.className = "chat-message ai";
  replyBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble">
      Tentu! Saya siap bantu kamu membuat <strong>CV profesional</strong> yang akan menonjol di mata HRD dan perekrut kerja 🔍<br><br>

      Berikut pilihan paket yang tersedia:<br><br>

      🔹 <strong>Basic – Rp25.000</strong><br>
      • CV 1 halaman dalam format PDF<br>
      • Desain clean & formal<br>
      • Estimasi selesai: 1 hari kerja<br><br>

      🔸 <strong>Pro – Rp50.000</strong><br>
      • CV 1–2 halaman (PDF + DOCX)<br>
      • Desain kreatif sesuai bidangmu (IT, Desain, Marketing, dll.)<br>
      • Optimasi keyword ATS friendly<br>
      • Estimasi selesai: 1–2 hari kerja<br><br>

      🟣 <strong>Premium – Rp75.000</strong><br>
      • Semua fitur Pro +:<br>
      &nbsp;&nbsp;✓ Desain eksklusif full color<br>
      &nbsp;&nbsp;✓ File siap cetak (PDF HD, Canva Link jika perlu edit ulang)<br>
      &nbsp;&nbsp;✓ Revisi GRATIS 1x<br>
      &nbsp;&nbsp;✓ Bonus: Template Surat Lamaran kerja<br>
      • Estimasi selesai: 2 hari kerja<br><br>

      🎯 Semuanya bisa disesuaikan dengan <em>bidang pekerjaan</em> dan <em>gaya pribadi</em> kamu!<br><br>

      Silakan isi kebutuhan lengkapmu di bagian <strong><a href="#contact" class="chat-link">Contact Me</a></strong> di bawah ya!<br>
      Saya siap bantu dari sana 😊
    </div>`;
  chatMessages.appendChild(replyBubble);
  playSound("message");
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Scroll otomatis ke bagian Contact
  await new Promise(r => setTimeout(r, 2500));
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }

  return;
}


case 'curhat': {
  userText = "Saya hanya ingin ngobrol santai 😊";

  // Tampilkan bubble user
  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user";
  userBubble.innerText = userText;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", userText);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Efek ngetik
  await new Promise(r => setTimeout(r, 1000));

  // Bubble AI jawaban santai
  const replyBubble = document.createElement("div");
  replyBubble.className = "chat-message ai";
  replyBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble">
      Wah seru nih! 😄 Kadang kita semua butuh waktu buat santai dan sekadar ngobrol ringan 🍃<br><br>
      Kamu lagi pengin bahas apa nih?<br>
      • 😵 Lagi penat sama kerjaan?<br>
      • 💔 Patah hati atau bingung sama perasaan?<br>
      • 😅 Butuh dengerin jokes receh?<br>
      • 🧠 Atau cuma mau cerita aja, tanpa solusi?<br><br>
      Aku siap jadi teman dengerinmu — tanpa nge-judge, tanpa dipotong 😊<br>
      Silakan ketik apa aja, aku di sini kok!
    </div>`;
  chatMessages.appendChild(replyBubble);
  playSound("message");
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Tampilkan lagi menu utama (opsional)
  await new Promise(r => setTimeout(r, 10000));
  showAssistantGreeting(); // Tampilkan opsi kembali (kalau user berubah pikiran)

  return;
}


case 'kontak': {
  userText = "Saya butuh kontak admin atau bantuan langsung.";

  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user";
  userBubble.innerText = userText;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", userText);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  await new Promise(r => setTimeout(r, 1000));

  const replyBubble = document.createElement("div");
  replyBubble.className = "chat-message ai";
  replyBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble">
      Tentu, berikut informasi lengkap untuk menghubungi admin kami secara langsung:<br><br>

      📱 <strong>Nomor WhatsApp Admin:</strong><br>
      <a href="https://wa.me/6282389160273" target="_blank" class="chat-link">0823-8916-0273</a><br>
      Klik link di atas untuk langsung membuka WhatsApp.<br><br>

      💼 <strong>Jam Operasional:</strong><br>
      Setiap Hari (Senin–Minggu)<br>
      <strong>08.00 – 20.00 WIB</strong><br><br>

      ⚡ <strong>Estimasi Respon:</strong><br>
      Biasanya membalas dalam <strong>5–15 menit</strong> selama jam operasional.<br>
      Jika sedang offline, mohon ditunggu hingga admin aktif kembali.<br><br>

      📩 <strong>Alternatif Kontak (Email):</strong><br>
      <a href="mailto:latifrusdi15@gmail.com" class="chat-link">latifrusdi15@gmail.com</a><br>
      Cocok untuk pengajuan formal, lampiran dokumen, atau penawaran kerja sama.<br><br>

      ✅ <strong>Tips:</strong><br>
      Saat menghubungi admin, mohon sampaikan dengan jelas:<br>
      – Nama lengkap Anda<br>
      – Tujuan atau kebutuhan<br>
      – Jika ada: kode mitra/reseller atau lokasi toko<br><br>

      Kami siap membantu dengan ramah dan profesional 🙌<br>
      Jangan ragu untuk menghubungi kapan saja selama jam layanan.
    </div>`;
  chatMessages.appendChild(replyBubble);
  playSound("message");
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return;
}


default: {
  userText = "Saya butuh bantuan.";

  // Tampilkan bubble user
  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user";
  userBubble.innerText = userText;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", userText);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Efek ngetik AI
  await new Promise(r => setTimeout(r, 1000));

  // Balasan AI fleksibel
  const replyBubble = document.createElement("div");
  replyBubble.className = "chat-message ai";
  replyBubble.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble">
      Siap, saya akan bantu semampu saya 🙌<br><br>
      Anda bisa memilih salah satu opsi berikut atau langsung ketik pertanyaan Anda:<br><br>
      • 💬 <strong>Kontak Admin</strong><br>
      • 🧠 <strong>Konsultasi & Ide Kreatif</strong><br>
      • 📝 <strong>Buat CV / Dokumen</strong><br>
      • 🌐 <strong>Butuh Website atau Portofolio</strong><br>
      • 🤝 <strong>Kebutuhan Lainnya</strong><br><br>
      Jika tidak yakin, cukup beri tahu saya masalah atau kebutuhan Anda saat ini 😊
    </div>`;
  chatMessages.appendChild(replyBubble);
  playSound("message");
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Tampilkan ulang menu utama (opsional)
  await new Promise(r => setTimeout(r, 5000));
  showAssistantGreeting();

  return;
}
}

  // Tampilkan pesan user
  if (userText) {
    chatInput.value = userText;
    sendMessage();
  }

  // Jalankan aksi tambahan jika ada
  if (typeof action === "function") {
    await new Promise(r => setTimeout(r, 1000));
    action();
  }

  // 🟢 Highlight tombol terpilih
  document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("active"));
  const clickedBtn = document.querySelector(`.option-btn[data-type="${type}"]`);
  if (clickedBtn) clickedBtn.classList.add("active");

  // 🔊 Suara klik tombol
  if (typeof playSound === "function") playSound("click");

  // ⚠️ Jika tidak ada aksi dan hanya respons teks
  const noActionTypes = ['cv', 'desain', 'curhat', 'lainnya'];
  if (noActionTypes.includes(type)) {
    await new Promise(r => setTimeout(r, 1000));
    showAssistantGreeting();
  }

  // 🔔 Notifikasi toast jika aksi ada
  if (typeof Toastify !== "undefined" && action) {
    Toastify({
      text: "🔗 Membuka halaman layanan...",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#2563eb",
      },
    }).showToast();
  }
}

// 🔑 Global agar bisa dipanggil dari tombol HTML
window.handleOption = handleOption;



/*==================== ✉️ FUNGSI KIRIM PESAN ====================*/
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  // 🧠 Tampilkan pesan user
  const userBubble = document.createElement("div");
  userBubble.className = "chat-message user fade-in";
  userBubble.innerHTML = `<div class="bubble">${text}</div>`;
  chatMessages.appendChild(userBubble);
  saveChatToLocal("user", text);

  chatInput.value = "";
  scrollToBottom();

  // 🎬 Tampilkan efek mengetik
  const loading = document.createElement("div");
  loading.className = "chat-message ai loading fade-in";
  loading.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble typing">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  chatMessages.appendChild(loading);
  scrollToBottom();

  // ⏳ Delay balasan AI
  setTimeout(() => {
    const reply = getOfflineReply(text);
    const replyBubble = document.createElement("div");
    replyBubble.className = "chat-message ai fade-in";
    replyBubble.innerHTML = `
      <div class="icon-circle"></div>
      <div class="bubble">${reply}</div>
    `;

    chatMessages.replaceChild(replyBubble, loading);
    saveChatToLocal("bot", reply);
    playSound("message");
    scrollToBottom();
  }, 1200);
}

/*✨ Scroll halus ke bawah */
function scrollToBottom() {
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: "smooth"
  });
}
});


/*==================== 🔧 TOGGLE PANEL FITUR TAMBAHAN & EMOJI PICKER ====================*/

// 🎛️ Ambil elemen tombol ➕, panel fitur tambahan, tombol emoji, panel emoji, dan input chat
const toggleExtra = document.getElementById("toggleExtra");
const extraPanel = document.getElementById("extraPanel");
const emojiToggleBtn = document.getElementById("emojiToggle");
const emojiPicker = document.getElementById("emojiPicker");
const chatInput = document.getElementById("chatInput");

// ➕ Saat ditekan → tampil/sembunyikan panel fitur, tutup panel emoji
toggleExtra.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔒 Mencegah klik menyebar ke dokumen
  extraPanel.classList.toggle("show");          // Toggle fitur tambahan
  emojiPicker.classList.remove("show");         // Tutup emoji picker
});

// 😊 Saat ditekan → tampil/sembunyikan emoji picker, tutup panel ➕
emojiToggleBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Hindari penutupan saat klik tombol
  emojiPicker.classList.toggle("show");         // Toggle emoji picker
  extraPanel.classList.remove("show");          // Tutup fitur tambahan
});

// 😄 Saat emoji diklik → tambahkan ke input chat
emojiPicker.addEventListener("emoji-click", (event) => {
  chatInput.value += event.detail.unicode;      // Tambahkan emoji
  chatInput.focus();                            // Fokuskan kembali ke textarea
});

// 📦 Tutup panel jika klik di luar elemen terkait
document.addEventListener("click", (event) => {
  // ❌ Tutup fitur tambahan jika klik bukan pada tombol/panel ➕
  if (!toggleExtra.contains(event.target) && !extraPanel.contains(event.target)) {
    extraPanel.classList.remove("show");
  }

  // ❌ Tutup emoji picker jika klik bukan pada tombol/panel emoji
  if (!emojiToggleBtn.contains(event.target) && !emojiPicker.contains(event.target)) {
    emojiPicker.classList.remove("show");
  }
});


// ==================== 🔒 Konfigurasi Maksimal File Upload ====================
const MAX_SIZE_MB = 2;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024; // 2MB

// ==================== 📎 Kirim File dari Komputer ====================
document.getElementById("uploadFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 🔒 Cek ukuran file
  if (file.size > MAX_SIZE) {
    addBotMessage(`⚠️ File terlalu besar. Maksimal ${MAX_SIZE_MB}MB.`);
    return;
  }

  const ext = file.name.split(".").pop().toLowerCase();

  // ✅ Jika file adalah gambar → tampilkan sebagai gambar
  if (file.type.startsWith("image/")) {
    const imgURL = URL.createObjectURL(file);
    const msg = `<img src="${imgURL}" alt="Preview" style="max-width:150px;border-radius:8px;" />`;
    addUserMessage(msg, true);
  }

  // 📄 Jika file adalah dokumen → tampilkan nama + tombol unduh
  else if (["pdf", "docx", "xlsx", "txt"].includes(ext)) {
    const fileURL = URL.createObjectURL(file);
    const msg = `
      📎 File terkirim: ${file.name}<br>
      <a href="${fileURL}" download="${file.name}" style="display:inline-block;margin-top:6px;font-size:0.9rem;color:#007bff;text-decoration:underline;">
        📥 Unduh File
      </a>`;
    addUserMessage(msg, true);
  }

  // ❌ Format tidak dikenali
  else {
    addBotMessage("❌ Format file tidak didukung.");
  }
});

// ==================== 📷 Ambil Foto Langsung dari Kamera ====================
document.getElementById("ambilFoto").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 🔒 Validasi ukuran
  if (file.size > MAX_SIZE) {
    addBotMessage(`⚠️ Foto terlalu besar. Maksimal ${MAX_SIZE_MB}MB.`);
    return;
  }

  // ✅ Hanya izinkan gambar dari kamera
  if (file.type.startsWith("image/")) {
    const imgURL = URL.createObjectURL(file);
    const msg = `<img src="${imgURL}" alt="Foto" style="max-width:150px;border-radius:8px;" />`;
    addUserMessage(msg, true);
  } else {
    addBotMessage("❌ Hanya gambar yang didukung dari kamera.");
  }
});

// ==================== 🧩 Fungsi Bantuan: Tambahkan Pesan dari User ====================
function addUserMessage(content, html = false) {
  const div = document.createElement("div");
  div.className = "chat-message user";
  div.innerHTML = html ? content : `<div class="bubble">${content}</div>`;
  chatMessages.appendChild(div);
  saveChatToLocal("user", div.innerHTML); // Simpan ke localStorage
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ==================== 🧠 Fungsi Bantuan: Tambahkan Pesan dari Bot ====================
function addBotMessage(content) {
  const div = document.createElement("div");
  div.className = "chat-message ai";
  div.innerHTML = `<div class="icon-circle"></div><div class="bubble">${content}</div>`;
  chatMessages.appendChild(div);
  saveChatToLocal("bot", content); // Simpan ke localStorage
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


/*==================== 👇 SEMBUNYIKAN TOMBOL AI SAAT SCROLL KE BAWAH ====================*/

// 📌 Simpan posisi scroll sebelumnya
let lastScrollY = window.scrollY;

// 🎯 Saat user melakukan scroll...
window.addEventListener("scroll", () => {
  const aiToggle = document.querySelector(".ai-assistant-toggle");
  if (!aiToggle) return; // ❌ Jika tombol AI tidak ditemukan, hentikan

  // 🔽 Jika user scroll ke bawah → sembunyikan tombol AI
  if (window.scrollY > lastScrollY) {
    aiToggle.classList.add("hide-on-scroll");
  } 
  // 🔼 Jika scroll ke atas → tampilkan lagi
  else {
    aiToggle.classList.remove("hide-on-scroll");
  }

  // 🔄 Perbarui posisi scroll terakhir
  lastScrollY = window.scrollY;
});


/*==================== 🎭 ANIMASI BADUT AI BERGERAK ====================*/
// 🤡 Fungsi untuk memberi animasi goyang pada tombol AI

function animateBadutAI() {
  const badutAI = document.getElementById("toggleChat");

  // ❌ Jika elemen tidak ada atau disembunyikan, hentikan
  if (!badutAI || badutAI.style.display === "none") return;

  // ✅ Tambahkan kelas animasi 'shake'
  badutAI.classList.add("animate-shake");

  // 🧹 Hapus kelas animasi setelah 600ms (selesai animasi)
  setTimeout(() => {
    badutAI.classList.remove("animate-shake");
  }, 600);
}


// ==================== 🤡 TOMBOL BADUT HILANG DAN MUNCUL ====================

window.onload = () => {
  const toggleButton = document.getElementById("toggle-badut");
  const badutBox = document.getElementById("toggleChat");

  // Jalankan toggle saat sudah bisa interaksi
  toggleButton.addEventListener("click", () => {
    if (badutBox.classList.contains("hidden")) {
      badutBox.classList.remove("hidden");
      badutBox.classList.add("visible");
    } else {
      badutBox.classList.remove("visible");
      badutBox.classList.add("hidden");
    }
  });
};
