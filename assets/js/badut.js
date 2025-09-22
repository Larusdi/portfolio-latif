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


    case 'website': {
    try {
      console.info('[website] start');

      // ---- helpers minimal agar tidak “diam” kalau belum ada ----
      if (typeof wait !== 'function') {
        window.wait = (ms) => new Promise(r => setTimeout(r, ms));
      }
      if (typeof smartScrollBottom !== 'function') {
        window.smartScrollBottom = function () {
          const c = document.getElementById('chatMessages');
          if (c) c.scrollTop = c.scrollHeight;
        };
      }
      if (typeof saveChatToLocal !== 'function') {
        window.saveChatToLocal = function(){};
      }
      if (typeof showToast !== 'function') {
        window.showToast = function (msg) {
          let root = document.getElementById('toast-root');
          if (!root) {
            root = document.createElement('div');
            root.id = 'toast-root';
            document.body.appendChild(root);
          }
          const el = document.createElement('div');
          el.className = 'toast';
          el.textContent = msg;
          root.appendChild(el);
          requestAnimationFrame(() => el.classList.add('show'));
          setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 250);
          }, 2600);
        };
      }
      if (typeof playSound !== 'function') {
        window.playSound = function(){};
      }

      // ---- target container wajib ada ----
      const chatMessages = document.getElementById('chatMessages');
      if (!chatMessages) {
        console.warn('[website] #chatMessages tidak ditemukan.');
        alert('Elemen chat (#chatMessages) tidak ada di halaman.');
        return;
      }

      // user bubble
      const userText = "Saya ingin membuat website profesional.";
      {
        const userBubble = document.createElement("div");
        userBubble.className = "chat-message user";
        userBubble.textContent = userText;
        chatMessages.appendChild(userBubble);
        saveChatToLocal("user", userText);
        smartScrollBottom();
      }

      await wait(900);

      // typing bubble
      const typing = document.createElement("div");
      typing.className = "chat-message ai typing";
      typing.setAttribute("aria-live", "polite");
      typing.innerHTML = `
        <div class="icon-circle"></div>
        <div class="bubble" aria-label="AI sedang mengetik">
          <span class="typing-dots">●●●</span>
        </div>`;
      chatMessages.appendChild(typing);
      smartScrollBottom();

      await wait(500);

      // reply
      const replyHTML = `
        <div class="icon-circle"></div>
        <div class="bubble" role="group" aria-label="Penawaran pembuatan website profesional">
          <p>
            Mantap! Website profesional bukan cuma tampilan keren, tapi juga <strong>cepat, aman, dan mudah dikelola</strong> 🚀<br>
            Aku bisa bantu bangun website yang modern, mobile-first, dan SEO-ready.
          </p>

          <h4 class="section-subtitle">🎯 Jenis Website</h4>
          <ul class="list-clean">
            <li>• Company Profile / Portofolio</li>
            <li>• Landing Page Produk / Campaign</li>
            <li>• Blog / Artikel SEO</li>
            <li>• Website Personal Brand</li>
          </ul>

          <h4 class="section-subtitle">📦 Paket Website</h4>
          <ul class="plan-grid" role="list">
            <li class="plan-card" aria-label="Paket Basic">
              <div class="plan-head">
                <h5 class="plan-title">Basic</h5>
                <div class="plan-price">Rp750.000</div>
                <div class="plan-sub">Landing cepat & profesional</div>
              </div>
              <ul class="plan-list">
                <li>• Landing Page (About, Services, Contact)</li>
                <li>• 1–2 section custom</li>
                <li>• Integrasi WhatsApp/Email</li>
                <li>• SEO dasar</li>
              </ul>
              <div class="cta-row">
                <button class="button button--primary" id="btnWebBasic">Pilih Basic</button>
              </div>
            </li>

            <li class="plan-card" aria-label="Paket Pro">
              <div class="plan-head">
                <h5 class="plan-title">Pro</h5>
                <div class="plan-price">Rp1.500.000</div>
                <div class="plan-sub">Multi-page lengkap</div>
              </div>
              <ul class="plan-list">
                <li>• Halaman: Home, About, Services, Blog, Contact</li>
                <li>• 5–7 section custom</li>
                <li>• Optimasi kecepatan</li>
                <li>• Form kontak + proteksi spam</li>
              </ul>
              <div class="cta-row">
                <button class="button button--primary" id="btnWebPro">Pilih Pro</button>
              </div>
            </li>

            <li class="plan-card" aria-label="Paket Business">
              <div class="plan-head">
                <h5 class="plan-title">Business</h5>
                <div class="plan-price">Rp3.000.000+</div>
                <div class="plan-sub">Full kustom + integrasi</div>
              </div>
              <ul class="plan-list">
                <li>• Semua fitur Pro</li>
                <li>• CMS ringan (WordPress/Headless)</li>
                <li>• Multi bahasa (opsional)</li>
                <li>• Integrasi API/CRM</li>
              </ul>
              <div class="cta-row">
                <button class="button button--primary" id="btnWebBusiness">Pilih Business</button>
              </div>
            </li>
          </ul>

          <p class="muted">*Harga dapat disesuaikan dengan kompleksitas & kebutuhan integrasi.</p>

          <div class="cta-row">
            <a href="#contact" class="button button--primary" id="btnContactWebsite" aria-label="Menuju formulir kontak">
              Konsultasi Cepat
            </a>
            <button class="button button--ghost" id="btnChecklistWebsite">Checklist Konten</button>
          </div>
        </div>
      `;

      typing.classList.remove("typing");
      typing.classList.add("ai");
      typing.innerHTML = replyHTML;

      playSound("message");
      saveChatToLocal("ai", typing.textContent?.trim() || "Website plans");
      smartScrollBottom();

      // handlers
      const pickWebsite = (pkg) => {
        const msg = `Paket ${pkg} dipilih ✅. Silakan isi detail di Contact.`;
        showToast(msg);
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      };

      document.getElementById("btnWebBasic")?.addEventListener("click", () => pickWebsite("Basic"));
      document.getElementById("btnWebPro")?.addEventListener("click", () => pickWebsite("Pro"));
      document.getElementById("btnWebBusiness")?.addEventListener("click", () => pickWebsite("Business"));

      document.getElementById("btnContactWebsite")?.addEventListener("click", () => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      });

      document.getElementById("btnChecklistWebsite")?.addEventListener("click", () => {
        const checklist = [
          "Logo & brand identity (opsional)",
          "Konten teks (About, Services, dll.)",
          "Gambar/ilustrasi produk/jasa",
          "Kontak aktif (email, WA, IG, LinkedIn)",
          "Domain & hosting (jika sudah ada)"
        ];
        const bubble = document.createElement("div");
        bubble.className = "chat-message ai";
        bubble.innerHTML = `
          <div class="icon-circle"></div>
          <div class="bubble">
            <strong>Checklist Konten Website</strong>
            <ul class="list-clean">${checklist.map(i => `<li>• ${i}</li>`).join("")}</ul>
            <a href="#contact" class="button button--primary">Kirim Konten Sekarang</a>
          </div>`;
        chatMessages.appendChild(bubble);
        playSound("message");
        smartScrollBottom();
      });

      console.info('[website] rendered');
      return;
    } catch (err) {
      console.error('[website] error:', err);
      showToast?.('Terjadi kesalahan saat menampilkan paket website.');
      // fallback aman agar pengguna tetap dapat balasan
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        const fallback = document.createElement('div');
        fallback.className = 'chat-message ai';
        fallback.innerHTML = `
          <div class="icon-circle"></div>
          <div class="bubble">
            Maaf, ada gangguan teknis. Coba klik lagi menu <strong>Website</strong>
            atau hubungi saya lewat <a href="#contact">Contact</a>.
          </div>`;
        chatMessages.appendChild(fallback);
        smartScrollBottom?.();
      }
      return;
    }
  }


    case 'portfolio': {
    const chatMessages =
      window.chatMessages || document.querySelector('.chat-messages') || document.body;

    const wait = window.wait || (ms => new Promise(r => setTimeout(r, ms)));
    const smartScrollBottom = window.smartScrollBottom || (() => {
      if (chatMessages && chatMessages.scrollTop != null) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
    const playSound = window.playSound || (() => {});
    const saveChatToLocal = window.saveChatToLocal || (() => {});

    // ==== CSS ====
    (function ensurePortfolioCSS() {
      if (document.getElementById('portfolio-css')) return;
      const css = `
  /* ==================== 💼 PORTFOLIO PLANS ==================== */
  .plan-grid{display:grid;gap:.9rem;margin:.75rem 0 1rem;padding:0}
  @media (min-width:768px){.plan-grid{grid-template-columns:repeat(3,1fr)}}
  .plan-card{list-style:none;border:1px solid var(--scroll-bar-color);border-radius:.9rem;background:var(--container-color);box-shadow:var(--shadow-1,0 1px 2px rgba(0,0,0,.04));padding:.9rem 1rem;transition:transform .15s ease,box-shadow .2s ease,border-color .2s ease}
  .plan-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-2);border-color:color-mix(in srgb,var(--first-color) 25%,var(--scroll-bar-color))}
  .plan-head{display:grid;gap:.25rem;margin-bottom:.5rem}
  .plan-title{margin:0;font-size:var(--h3-font-size);color:var(--title-color)}
  .plan-price{font-weight:700;color:var(--first-color)}
  .plan-sub{font-size:var(--small-font-size);color:var(--text-color)}
  .plan-list{margin:.25rem 0 0;padding-left:0;display:grid;gap:.25rem}
  .plan-list li{list-style:none;color:var(--text-color);font-size:var(--small-font-size);line-height:1.4}
  .cta-row{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem}
  .button.button--primary{display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1rem;border-radius:.75rem;background:var(--first-color);color:#fff;border:none;font-size:.9rem;font-weight:600;cursor:pointer;transition:transform .15s ease,box-shadow .2s ease}
  .button.button--primary:hover{transform:translateY(-1px);box-shadow:var(--shadow-2)}
  .button.button--ghost{display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1rem;border-radius:.75rem;background:var(--container-color);color:var(--title-color);border:1px solid var(--scroll-bar-color);font-size:.9rem;cursor:pointer;transition:background .2s ease,transform .15s ease}
  .button.button--ghost:hover{background:var(--input-color);transform:translateY(-1px)}
  .section-subtitle{margin:.75rem 0 .35rem;color:var(--title-color);font-weight:600;font-size:var(--normal-font-size)}
  .list-clean{margin:.25rem 0 1rem;padding:0;display:grid;gap:.25rem;color:var(--text-color);font-size:var(--small-font-size)}
  .muted{color:var(--text-color-light);font-size:var(--small-font-size);margin-top:.5rem}
  `;
      const style = document.createElement('style');
      style.id = 'portfolio-css';
      style.textContent = css;
      document.head.appendChild(style);
    })();

    window.showToast ||= (msg = 'OK') => {
      let root = document.getElementById('toast-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'toast-root';
        root.style.position = 'fixed';
        root.style.right = '1rem';
        root.style.bottom = '1rem';
        root.style.display = 'grid';
        root.style.gap = '.5rem';
        root.style.zIndex = '9999';
        document.body.appendChild(root);
      }
      const t = document.createElement('div');
      t.className = 'toast show';
      t.style.pointerEvents = 'auto';
      t.style.background = 'var(--container-color)';
      t.style.color = 'var(--title-color)';
      t.style.border = '1px solid var(--scroll-bar-color)';
      t.style.boxShadow = 'var(--shadow-2, 0 6px 18px rgba(0,0,0,.12))';
      t.style.padding = '.7rem 1rem';
      t.style.borderRadius = '.75rem';
      t.textContent = msg;
      root.appendChild(t);
      setTimeout(() => t.classList.remove('show'), 2400);
      setTimeout(() => t.remove(), 2800);
    };

    const userText = 'Saya ingin membuat portofolio online.';

    {
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-message user';
      userBubble.textContent = userText;
      chatMessages.appendChild(userBubble);
      saveChatToLocal('user', userText);
      smartScrollBottom();
    }

    await wait(900);

    const typing = document.createElement('div');
    typing.className = 'chat-message ai typing';
    typing.setAttribute('aria-live', 'polite');
    typing.innerHTML = `
      <div class="icon-circle"></div>
      <div class="bubble" aria-label="AI sedang mengetik">
        <span class="typing-dots">●●●</span>
      </div>`;
    chatMessages.appendChild(typing);
    smartScrollBottom();

    await wait(500);

    const replyHTML = `
      <div class="icon-circle"></div>
      <div class="bubble" role="group" aria-label="Penawaran pembuatan portofolio online">
        <p>
          Keren! Portofolio online yang bagus itu ringkas, cepat, dan mudah dilihat di semua device. 
          Aku bisa bantu kamu bikin portofolio yang <strong>profesional</strong>, <strong>futuristik</strong>, dan <strong>ATS/SEO-aware</strong> tanpa lebay.
        </p>

        <h4 class="section-subtitle">🎯 Cocok untuk:</h4>
        <ul class="list-clean">
          <li>• Freelancer / kreator (desain, foto, video, UI/UX, dev)</li>
          <li>• Fresh graduate / job seeker profesional</li>
          <li>• UMKM & personal brand</li>
        </ul>

        <h4 class="section-subtitle">📦 Paket Portofolio</h4>
        <ul class="plan-grid" role="list">
          <li class="plan-card" aria-label="Paket Starter">
            <div class="plan-head">
              <h5 class="plan-title">Starter</h5>
              <div class="plan-price">Rp199.000</div>
              <div class="plan-sub">1 halaman, cepat & bersih</div>
            </div>
            <ul class="plan-list">
              <li>• 1 landing (About, Works ringkas, Kontak)</li>
              <li>• 3 showcase project (gambar + deskripsi)</li>
              <li>• Mobile-first, loading cepat</li>
              <li>• Integrasi WhatsApp / Email</li>
            </ul>
            <div class="cta-row">
              <button class="button button--primary" id="btnStarter">Pilih Starter</button>
              <button class="button button--ghost" data-wireframe="starter">Minta Wireframe</button>
            </div>
          </li>

          <li class="plan-card" aria-label="Paket Pro">
            <div class="plan-head">
              <h5 class="plan-title">Pro</h5>
              <div class="plan-price">Rp349.000</div>
              <div class="plan-sub">Multi-section + blog/notes</div>
            </div>
            <ul class="plan-list">
              <li>• Halaman: Home, About, Works, Detail Project, Contact</li>
              <li>• 6–9 showcase project (grid responsif)</li>
              <li>• Halaman “Case Study” (SEO-ready)</li>
              <li>• Tombol CTA & form kontak (spam-protected)</li>
            </ul>
            <div class="cta-row">
              <button class="button button--primary" id="btnPro">Pilih Pro</button>
              <button class="button button--ghost" data-wireframe="pro">Minta Wireframe</button>
            </div>
          </li>

          <li class="plan-card" aria-label="Paket Elite">
            <div class="plan-head">
              <h5 class="plan-title">Elite</h5>
              <div class="plan-price">Rp599.000</div>
              <div class="plan-sub">Full brand touch + CMS ringan</div>
            </div>
            <ul class="plan-list">
              <li>• Semua fitur Pro + halaman: Services / Pricing</li>
              <li>• CMS ringan (Notion/Markdown-based) ✨</li>
              <li>• Style Guide mini (warna/typografi/komponen)</li>
              <li>• Optimasi skor Lighthouse (Perf/SEO/A11y)</li>
            </ul>
            <div class="cta-row">
              <button class="button button--primary" id="btnElite">Pilih Elite</button>
              <button class="button button--ghost" data-wireframe="elite">Minta Wireframe</button>
            </div>
          </li>
        </ul>

        <p class="muted">Catatan: Harga dapat disesuaikan dengan kebutuhan & jumlah konten. Domain/hosting opsional.</p>

        <div class="cta-row">
          <a href="#contact" class="button button--primary" id="btnContactPortfolio" aria-label="Menuju formulir kontak">
            Konsultasi Cepat
          </a>
          <button class="button button--ghost" id="btnChecklistPortfolio">Checklist Konten</button>
        </div>
      </div>
    `;

    typing.classList.remove('typing');
    typing.classList.add('ai');
    typing.innerHTML = replyHTML;

    try { playSound('message'); } catch {}
    saveChatToLocal('ai', typing.textContent?.trim() || 'Portfolio plans');
    smartScrollBottom();

    document.getElementById('btnContactPortfolio')?.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    });

    const pick = name => {
      const msg = `Siap! Paket ${name} dipilih. Silakan isi kebutuhanmu di Contact, ya.`;
      if (typeof window.showToast === 'function') window.showToast(msg);
      else alert(msg);
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    document.getElementById('btnStarter')?.addEventListener('click', () => pick('Starter'));
    document.getElementById('btnPro')?.addEventListener('click', () => pick('Pro'));
    document.getElementById('btnElite')?.addEventListener('click', () => pick('Elite'));

    document.querySelectorAll('button[data-wireframe]').forEach(btn => {
      btn.addEventListener('click', async e => {
        const type = e.currentTarget.getAttribute('data-wireframe');
        const wireReply = document.createElement('div');
        wireReply.className = 'chat-message ai';
        wireReply.innerHTML = `
          <div class="icon-circle"></div>
          <div class="bubble">
            Oke, aku siapkan <strong>wireframe ${type}</strong> (struktur halaman + penempatan konten).
            Kirimkan 3–5 proyek terbaikmu, foto profil, bio singkat (50–80 kata), dan kontak aktif.
            Setelah itu, aku kirim draft awalnya.
          </div>`;
        chatMessages.appendChild(wireReply);
        playSound('message');
        smartScrollBottom();
        await wait(800);
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    document.getElementById('btnChecklistPortfolio')?.addEventListener('click', () => {
      const checklist = [
        'Foto profil + tagline singkat',
        'Bio 50–80 kata (siapa kamu & keahlian inti)',
        '3–9 proyek terbaik (judul, peran, tantangan, solusi, hasil)',
        'Testimoni (opsional, 1–3)',
        'Kontak aktif (email/WA/LinkedIn/IG)',
        'Aset brand (logo, warna utama, font—jika ada)'
      ];
      const bubble = document.createElement('div');
      bubble.className = 'chat-message ai';
      bubble.innerHTML = `
        <div class="icon-circle"></div>
        <div class="bubble">
          <strong>Checklist Konten Portofolio</strong>
          <ul class="list-clean">${checklist.map(i => `<li>• ${i}</li>`).join('')}</ul>
          <a href="#contact" class="button button--primary">Kirim Konten Sekarang</a>
        </div>`;
      chatMessages.appendChild(bubble);
      playSound('message');
      smartScrollBottom();
    });

    return;
  }


    case 'toko': {
    const userText = "Saya ingin membuat website toko online.";

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms) => new Promise(r => setTimeout(r, prefersReducedMotion ? Math.min(ms, 140) : ms));
    const smartScrollBottom = () => {
      chatMessages.scroll({
        top: chatMessages.scrollHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    };
    const smartScrollIntoView = (el) => {
      if (!el) return;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    };
    const nfIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

    const coreFeatures = [
      'Desain responsif mobile-first',
      'Katalog produk rapi (kategori, pencarian)',
      'Optimasi kecepatan & SEO dasar',
      'Form kontak/WhatsApp CTA',
    ];
    const integrationFeatures = [
      'Pembayaran (transfer manual / gateway)',
      'Pengiriman (ongkir otomatis / kurir populer)',
      'Notifikasi email',
      'Integrasi Meta/Google for Business',
    ];
    const securityFeatures = [
      'HTTPS & header keamanan dasar',
      'Proteksi spam form',
      'Backup konten',
    ];

    const plans = [
      {
        tag: 'Starter',
        price: 750_000,
        highlight: 'Cocok untuk mulai jualan cepat',
        features: [
          'Landing + katalog s/d 20 produk',
          'Tombol order via WhatsApp',
          'SEO dasar + Analytics',
          '1x revisi minor',
          'File aset & panduan singkat'
        ]
      },
      {
        tag: 'Pro',
        price: 1_800_000,
        highlight: 'Katalog lebih lengkap + keranjang',
        features: [
          'Katalog produk tanpa batas',
          'Keranjang + checkout (transfer manual)',
          'Manajemen produk sederhana (admin)',
          'Voucher diskon dasar',
          '1x revisi minor'
        ]
      },
      {
        tag: 'Business',
        price: 3_500_000,
        note: 'mulai',
        highlight: 'Siap scale dengan integrasi penuh',
        features: [
          'Payment gateway + ongkir otomatis',
          'Variant & stok per SKU',
          'Voucher/kupon & biaya admin',
          'Dashboard laporan ringkas',
          'Dokumentasi & pelatihan singkat'
        ]
      }
    ];

    const planCards = plans.map(p => {
      const priceLabel = (p.note === 'mulai') ? `${nfIDR.format(p.price)}+` : nfIDR.format(p.price);
      return `
        <li class="plan-card" data-plan="${p.tag}">
          <header class="plan-head">
            <h4 class="plan-title">${p.tag}</h4>
            <div class="plan-price">${priceLabel}</div>
            <div class="plan-sub">${p.highlight}</div>
          </header>
          <ul class="plan-list">
            ${p.features.map(f => `<li>• ${f}</li>`).join('')}
          </ul>
        </li>
      `;
    }).join('');

    const frag = document.createDocumentFragment();

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-message user';
    userBubble.textContent = userText;
    frag.appendChild(userBubble);
    saveChatToLocal?.('user', userText);

    const typing = document.createElement('div');
    typing.className = 'chat-message ai typing';
    typing.setAttribute('aria-live', 'polite');
    typing.innerHTML = `
      <div class="icon-circle"></div>
      <div class="bubble" aria-label="AI sedang mengetik">
        <span class="typing-dots" aria-hidden="true">●●●</span>
      </div>
    `;
    frag.appendChild(typing);

    chatMessages.appendChild(frag);
    smartScrollBottom();
    await wait(900);

    const replyHTML = `
      <div class="icon-circle" aria-hidden="true"></div>
      <div class="bubble" role="group" aria-label="Pembuatan website toko online">
        <p>
          Siap! Kita bangun <strong>website toko online</strong> yang cepat, rapi, dan mudah dikelola—tanpa ribet.
        </p>

        <h4 class="section-subtitle">🎯 Fitur inti</h4>
        <ul class="list-clean">
          ${coreFeatures.map(i => `<li>• ${i}</li>`).join('')}
        </ul>

        <h4 class="section-subtitle">🔌 Integrasi</h4>
        <ul class="list-clean">
          ${integrationFeatures.map(i => `<li>• ${i}</li>`).join('')}
        </ul>

        <h4 class="section-subtitle">🛡️ Keamanan & keandalan</h4>
        <ul class="list-clean">
          ${securityFeatures.map(i => `<li>• ${i}</li>`).join('')}
        </ul>

        <h4 class="section-subtitle">💼 Paket</h4>
        <ul class="plan-grid" role="list">
          ${planCards}
        </ul>

        <p class="muted">Catatan: Paket dapat disesuaikan dengan kebutuhan brand & alur operasionalmu.</p>

        <div class="cta-row">
          <a href="#contact" class="button button--primary btn-start-brief" data-autofocus="true">Hubungi Admin</a>
        </div>
      </div>
    `;

    typing.classList.remove('typing');
    typing.classList.add('ai');
    typing.innerHTML = replyHTML;

    try { playSound?.('message'); } catch {}
    saveChatToLocal?.('ai', typing.textContent?.trim() || 'Ecommerce plans sent');
    smartScrollBottom();

    if (!window.__tokoHandlersAttached) {
      document.addEventListener('click', (e) => {
        const start = e.target.closest('.btn-start-brief');
        if (start) {
          e.preventDefault();
          const contact = document.getElementById('contact');
          if (contact) {
            smartScrollIntoView(contact);
            contact.focus?.({ preventScroll: true });
            try { playSound?.('tap'); } catch {}
          } else {
            if (typeof window.showToast === 'function') {
              window.showToast('Bagian kontak belum tersedia di halaman.', { duration: 2400 });
            } else {
              console.warn('Bagian kontak tidak ditemukan.');
            }
          }
        }

        const help = e.target.closest('.btn-need-help');
        if (help) {
          e.preventDefault();
          const q = document.createElement('div');
          q.className = 'chat-message ai';
          q.innerHTML = `
            <div class="icon-circle" aria-hidden="true"></div>
            <div class="bubble">
              Biar tepat sasaran, jawab 3 hal ini ya:<br><br>
              1) Perkiraan jumlah produk aktif?<br>
              2) Metode pembayaran yang diinginkan (transfer / gateway / COD)?<br>
              3) Butuh ongkir otomatis & kurir tertentu?<br><br>
              Balas di sini, nanti aku rekomendasikan paket + opsi penyesuaiannya. 🙂
            </div>
          `;
          chatMessages.appendChild(q);
          smartScrollBottom();
          try { playSound?.('message'); } catch {}
        }
      });
      window.__tokoHandlersAttached = true;
    }

    typing.querySelector('[data-autofocus="true"]')?.focus?.({ preventScroll: true });

    return;
  }


    case 'promo': {
    const promoText = "Tampilkan penawaran spesial yang tersedia.";

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms) => new Promise(r => setTimeout(r, prefersReducedMotion ? Math.min(ms, 120) : ms));
    const smartScrollBottom = () => {
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';
      if (typeof chatMessages.scroll === 'function') {
        chatMessages.scroll({ top: chatMessages.scrollHeight, behavior });
      } else {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    };

    const ensureToast = () => {
      if (typeof window.showToast === 'function') return window.showToast;
      return function showToast(message, opts = {}) {
        const duration = opts.duration ?? 2400;
        let root = document.getElementById('toast-root');
        if (!root) {
          root = document.createElement('div');
          root.id = 'toast-root';
          root.setAttribute('aria-live', 'polite');
          root.setAttribute('aria-atomic', 'true');
          document.body.appendChild(root);
        }
        const el = document.createElement('div');
        el.className = 'toast';
        el.textContent = message;
        root.appendChild(el);
        requestAnimationFrame(() => el.classList.add('show'));
        setTimeout(() => {
          el.classList.remove('show');
          el.addEventListener('transitionend', () => el.remove(), { once: true });
        }, duration);
      };
    };
    const toast = ensureToast();

    const userBubble = document.createElement("div");
    userBubble.className = "chat-message user";
    userBubble.innerText = promoText;
    chatMessages.appendChild(userBubble);
    saveChatToLocal?.("user", promoText);
    smartScrollBottom();

    await wait(600);

    const uid = Date.now().toString(36);
    const confirmId = `confirmShowAd_${uid}`;
    const cancelId  = `cancelShowAd_${uid}`;

    const replyBubble = document.createElement("div");
    replyBubble.className = "chat-message ai";
    replyBubble.innerHTML = `
      <div class="icon-circle glow" aria-hidden="true"></div>
      <div class="bubble" role="group" aria-label="Penawaran spesial">
        <strong>🎁 Penawaran Eksklusif untuk Kamu</strong><br><br>
        Ada <span class="highlight">promo terbatas</span> yang sayang dilewatkan.<br>
        Ingin menampilkan kembali iklan yang tadi kamu tutup?<br><br>

        <div class="btn-group">
          <button class="option-btn glow" id="${confirmId}">✅ Tampilkan Lagi</button>
          <button class="option-btn secondary" id="${cancelId}">⏳ Nanti Saja</button>
        </div>
      </div>`;
    chatMessages.appendChild(replyBubble);
    smartScrollBottom();
    try { playSound?.("message"); } catch {}

    const confirmBtn = document.getElementById(confirmId);
    const cancelBtn  = document.getElementById(cancelId);

    confirmBtn?.addEventListener("click", () => {
      const popup = document.getElementById("popup-ad");
      if (popup) {
        popup.classList.add("show");
        popup.removeAttribute('inert');
        popup.setAttribute('aria-hidden', 'false');
        const focusable = popup.querySelector('[data-close], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusable?.focus?.({ preventScroll: true });
        try { playSound?.("open"); } catch {}
        saveChatToLocal?.("ai", "Menampilkan ulang popup promo.");
      } else {
        toast("❌ Popup promo belum ditemukan di halaman.");
        console.warn("❌ Elemen #popup-ad tidak ditemukan.");
      }
    }, { once: true });

    cancelBtn?.addEventListener("click", async () => {
      const waitReply = document.createElement("div");
      waitReply.className = "chat-message ai";
      waitReply.innerHTML = `
        <div class="icon-circle glow" aria-hidden="true"></div>
        <div class="bubble">
          Baik, kalau kamu butuh kapan saja tinggal tekan menu <span class="highlight">Promo</span> lagi ya.
        </div>`;
      chatMessages.appendChild(waitReply);
      smartScrollBottom();
      try { playSound?.("message"); } catch {}
      await wait(800);
      try { showAssistantGreeting?.(); } catch {}
    }, { once: true });

    return;
  }


  case 'game': {
  const userText = "Saya ingin bermain game seru di sini!";

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise(r => setTimeout(r, prefersReducedMotion ? Math.min(ms, 140) : ms));

  const smartScrollBottom = () => {
    chatMessages.scroll({
      top: chatMessages.scrollHeight,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  // ==============================
  // Data game
  // ==============================
  const games = [
    {
      id: 'brain',
      title: 'Brain Test',
      emoji: '🧠',
      href: 'brain.html',
      desc: 'Uji logika dengan pilihan ganda & teka-teki cerdas.',
      tags: ['Logika', 'Kuis']
    },
    {
      id: 'tebak-gambar',
      title: 'Tebak Gambar',
      emoji: '🖼️',
      href: 'game-tebak-gambar.html',
      desc: 'Tantangan visual—tebak objek dari potongan gambar.',
      tags: ['Visual', 'Tebakan']
    },
    {
      id: 'puzzle',
      title: 'Puzzle Logika',
      emoji: '🧩',
      href: 'game-puzzle.html',
      desc: 'Susun pola, pecahkan potongan, latih fokus & kesabaran.',
      tags: ['Puzzle', 'Fokus']
    }
  ];

  // Semua game dibuat "belum rilis" (sesuai permintaan)
  const SOON_IDS = new Set(['brain', 'tebak-gambar', 'puzzle']);
  const hasAvailable = games.some(g => !SOON_IDS.has(g.id));

  // ==============================
  // Delegasi klik (1x attach)
  // ==============================
  if (!window.__gameHandlersAttached) {
    document.addEventListener('click', (e) => {
      // Click pada kartu/link game:
      const link = e.target.closest('.game-link');
      if (link) {
        // Untuk yang tersedia, buka tab baru (yang 'soon' ditangani di handler lain)
        if (!link.hasAttribute('data-state')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener');
          try { playSound?.('tap'); } catch {}
        }
      }

      // Tombol "Mainkan Acak"
      const rnd = e.target.closest('.btn-random-game');
      if (rnd) {
        e.preventDefault();
        const available = [...document.querySelectorAll('.game-link:not([data-state="soon"])')];
        if (available.length) {
          const pick = available[Math.floor(Math.random() * available.length)];
          try { playSound?.('tap'); } catch {}
          window.open(pick.href, '_blank', 'noopener');
        } else {
          showToast('Belum ada game yang tersedia untuk dimainkan.');
        }
      }
    });

    window.__gameHandlersAttached = true;
  }

  // ==============================
  // Handler khusus "Coming Soon" (1x attach)
  // ==============================
  if (!window.__gameSoonHandlersAttached) {
    document.addEventListener('click', (e) => {
      // Coming Soon → tampilkan toast + cegah navigasi
      const soonLink = e.target.closest('.game-link[data-state="soon"]');
      if (soonLink) {
        e.preventDefault();
        const title = soonLink.querySelector('.game-title')?.textContent?.trim() || 'Game';
        showToast(`${title} sedang dalam pengembangan. Nantikan rilisnya!`);
        try { playSound?.('tap'); } catch {}
        return;
      }
    });

    // Utilitas toast ringan
    window.showToast = function showToast(message, opts = {}) {
      const duration = opts.duration ?? 2400;
      let root = document.getElementById('toast-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'toast-root';
        root.setAttribute('aria-live', 'polite');
        root.setAttribute('aria-atomic', 'true');
        document.body.appendChild(root);
      }
      const el = document.createElement('div');
      el.className = 'toast';
      el.textContent = message;
      root.appendChild(el);
      requestAnimationFrame(() => el.classList.add('show'));
      setTimeout(() => {
        el.classList.remove('show');
        el.addEventListener('transitionend', () => el.remove(), { once: true });
      }, duration);
    };

    window.__gameSoonHandlersAttached = true;
  }

  // ==============================
  // Render daftar game
  // ==============================
  const gameCardsHTML = games.map(g => {
    const tags = g.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const isSoon = SOON_IDS.has(g.id);

    const badge = isSoon
      ? `<span class="badge badge--soon" aria-label="Segera Hadir">Segera&nbsp;Hadir</span>`
      : '';

    const ctaLabel = isSoon ? 'Segera Hadir' : 'Mainkan';
    const anchorAttrs = isSoon
      ? `href="#"
          role="link"
          aria-disabled="true"
          tabindex="-1"
          data-state="soon"`
      : `href="${g.href}" target="_blank" rel="noopener"`;

    return `
      <li class="game-card ${isSoon ? 'is-soon' : ''}" data-id="${g.id}">
        <a class="game-link" ${anchorAttrs} aria-label="${ctaLabel} ${g.title}">
          <div class="game-card__header">
            <span class="game-emoji" aria-hidden="true">${g.emoji}</span>
            <h4 class="game-title">${g.title}</h4>
            ${badge}
          </div>
          <p class="game-desc">${g.desc}</p>
          <div class="game-tags">${tags}</div>
          <div class="game-cta">${ctaLabel}</div>
        </a>
      </li>
    `;
  }).join('');

  // ==============================
  // Sisipkan ke chat UI
  // ==============================
  const frag = document.createDocumentFragment();

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-message user';
  userBubble.textContent = userText;
  frag.appendChild(userBubble);
  saveChatToLocal?.('user', userText);

  const typing = document.createElement('div');
  typing.className = 'chat-message ai typing';
  typing.setAttribute('aria-live', 'polite');
  typing.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble" aria-label="AI sedang mengetik">
      <span class="typing-dots" aria-hidden="true">●●●</span>
    </div>
  `;
  frag.appendChild(typing);

  chatMessages.appendChild(frag);
  smartScrollBottom();

  await wait(1000);

  const hintHTML = hasAvailable
    ? `
      Ingin rekomendasi cepat? <a href="brain.html" class="btn-random-game">Mainkan Acak</a> ·
      Atau ketik <strong>game lainnya</strong> untuk opsi lain (kuis, memori, matematika ringan, dll).
    `
    : `
      Saat ini semua game sedang dalam pengembangan. Aktifkan notifikasi atau cek kembali nanti ya!
    `;

  const replyHTML = `
    <div class="icon-circle" aria-hidden="true"></div>
    <div class="bubble" role="group" aria-label="Daftar mini game">
      <p>
        Mantap! Aku punya beberapa <strong>mini game eksklusif</strong>—ringan, seru, sekaligus melatih fokus & logika 🧠🎮
      </p>

      <ul class="game-list" role="list">
        ${gameCardsHTML}
      </ul>

      <div class="hint">
        ${hintHTML}
      </div>
    </div>
  `;

  typing.classList.remove('typing');
  typing.classList.add('ai');
  typing.innerHTML = replyHTML;

  try { playSound?.('message'); } catch {}
  saveChatToLocal?.('ai', typing.textContent?.trim() || 'Game list sent');
  smartScrollBottom();

  return;
}


case 'desain': {
  const userText = "Saya butuh desain logo atau branding.";

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise(r => setTimeout(r, prefersReducedMotion ? Math.min(ms, 140) : ms));
  const nfIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

  const smartScrollIntoView = (el) => {
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  if (!window.__chatLinkHandlerAttached) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('.chat-link');
      if (a && a.getAttribute('href') === '#contact') {
        e.preventDefault();
        const contact = document.getElementById('contact');
        smartScrollIntoView(contact);
        contact?.focus?.({ preventScroll: true });
      }
    });
    window.__chatLinkHandlerAttached = true;
  }

  const services = [
    'Logo Premium (utama & sekunder)',
    'Branding Kit (warna, tipografi, usage guide)',
    'Desain Kemasan Produk',
    'Desain Feed Sosial Media',
    'Company Profile (PDF/Web)',
    'Visual Identity Guidelines'
  ];

  const principles = [
    '100% custom, tanpa template',
    'Riset pasar & kompetitor',
    'Mockup profesional',
    'Preview sebelum finalisasi'
  ];

  const packages = [
    {
      tag: 'Basic',
      price: 150000,
      features: [
        '1 konsep logo + 1 revisi',
        'File PNG/WEBP'
      ]
    },
    {
      tag: 'Pro',
      price: 300000,
      features: [
        '2 konsep logo + 3 revisi',
        'Branding Kit (warna + font)',
        'File PNG, SVG, PDF'
      ]
    },
    {
      tag: 'Corporate',
      price: 600000,
      note: 'mulai',
      features: [
        '3 konsep logo + 5 revisi',
        'Branding Kit lengkap',
        'Visual Guideline PDF',
        'Mockup Produk + Media Sosial'
      ]
    }
  ];

  const frag = document.createDocumentFragment();

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-message user';
  userBubble.textContent = userText;
  frag.appendChild(userBubble);
  saveChatToLocal?.('user', userText);

  const typing = document.createElement('div');
  typing.className = 'chat-message ai typing';
  typing.setAttribute('aria-live', 'polite');
  typing.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble" aria-label="AI sedang mengetik">
      <span class="typing-dots" aria-hidden="true">●●●</span>
    </div>
  `;
  frag.appendChild(typing);

  chatMessages.appendChild(frag);
  chatMessages.scroll({ top: chatMessages.scrollHeight, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

  await wait(1000);

  const asList = (arr) => `<ul class="list-clean">${arr.map(i => `<li>• ${i}</li>`).join('')}</ul>`;

  const pkgHTML = packages.map(p => {
    const priceLabel = p.note === 'mulai'
      ? `${nfIDR.format(p.price)}+`
      : nfIDR.format(p.price);
    return `
      <section class="brand-plan" data-plan="${p.tag}">
        <h4 class="brand-plan__title">
          ${p.tag} – <span class="brand-plan__price">${priceLabel}</span>
        </h4>
        <ul class="brand-plan__features">
          ${p.features.map(f => `<li>• ${f}</li>`).join('')}
        </ul>
      </section>
    `;
  }).join('');

  const replyHTML = `
    <div class="icon-circle" aria-hidden="true"></div>
    <div class="bubble" role="group" aria-label="Layanan desain & paket branding">
      <p>
        Desain bukan hanya estetika—ini <strong>identitas, kredibilitas, dan daya saing</strong> 💡
      </p>
      <p>
        Saya bekerja sebagai <strong>Visual Branding Specialist</strong> untuk membantu brand tampil profesional dan dipercaya.
      </p>

      <h4 class="section-subtitle">✨ Layanan</h4>
      ${asList(services)}

      <h4 class="section-subtitle">💼 Cara kerja</h4>
      ${asList(principles)}

      <h4 class="section-subtitle">💰 Paket</h4>
      <div class="brand-plans">
        ${pkgHTML}
      </div>

      <p class="brand-note">
        <em>Semua paket bisa disesuaikan dengan industri & gaya visual kamu.</em>
      </p>

      <div class="brand-cta">
        <a href="#contact" class="chat-link button button--primary" data-autofocus="true">
          Hubungi Admin
        </a>
      </div>
    </div>
  `;

  typing.classList.remove('typing');
  typing.classList.add('ai');
  typing.innerHTML = replyHTML;

  playSound?.('message');
  saveChatToLocal?.('ai', typing.textContent?.trim() || 'Branding packages sent');

  typing.querySelector('[data-autofocus="true"]')?.focus?.({ preventScroll: true });

  await wait(1400);
  const contactSection = document.getElementById('contact');
  if (contactSection) smartScrollIntoView(contactSection);

  return;
}


case 'cv': {
  const userText = "Saya ingin membuat CV yang profesional.";

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise(r => setTimeout(r, prefersReducedMotion ? Math.min(ms, 120) : ms));
  const nfIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

  const smartScrollIntoView = (el) => {
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  if (!window.__chatLinkHandlerAttached) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('.chat-link');
      if (a && a.getAttribute('href') === '#contact') {
        e.preventDefault();
        const contact = document.getElementById('contact');
        smartScrollIntoView(contact);
        contact?.focus?.({ preventScroll: true });
      }
    });
    window.__chatLinkHandlerAttached = true;
  }

  const packages = [
    {
      tag: 'Basic',
      price: 25000,
      features: [
        'CV 1 halaman (PDF)',
        'Desain clean & formal',
        'Selesai ≤ 1 hari kerja'
      ]
    },
    {
      tag: 'Pro',
      price: 50000,
      features: [
        'CV 1–2 halaman (PDF + DOCX)',
        'Desain sesuai bidang (IT/Desain/Marketing, dll.)',
        'ATS-friendly keyword optimization',
        'Selesai 1–2 hari kerja'
      ]
    },
    {
      tag: 'Premium',
      price: 75000,
      features: [
        'Semua fitur Pro + desain eksklusif',
        'File siap cetak (PDF HD) + opsi Canva Link',
        'Revisi gratis 1x',
        'Bonus: Template Surat Lamaran',
        'Selesai ± 2 hari kerja'
      ]
    }
  ];

  const frag = document.createDocumentFragment();

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-message user';
  userBubble.textContent = userText;
  frag.appendChild(userBubble);

  saveChatToLocal?.('user', userText);

  const typing = document.createElement('div');
  typing.className = 'chat-message ai typing';
  typing.setAttribute('aria-live', 'polite');
  typing.innerHTML = `
    <div class="icon-circle"></div>
    <div class="bubble" aria-label="AI sedang mengetik">
      <span class="typing-dots" aria-hidden="true">●●●</span>
    </div>
  `;
  frag.appendChild(typing);

  chatMessages.appendChild(frag);
  chatMessages.scroll({ top: chatMessages.scrollHeight, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

  await wait(800);

  const pkgListHTML = packages.map(p => {
    const items = p.features.map(f => `<li>• ${f}</li>`).join('');
    return `
      <section class="cv-plan" data-plan="${p.tag}">
        <h4 class="cv-plan__title">${p.tag} – <span class="cv-plan__price">${nfIDR.format(p.price)}</span></h4>
        <ul class="cv-plan__features">${items}</ul>
      </section>
    `;
  }).join('');

  const replyHTML = `
    <div class="icon-circle" aria-hidden="true"></div>
    <div class="bubble" role="group" aria-label="Pilihan paket pembuatan CV profesional">
      <p>
        Tentu! Saya siap bantu kamu membuat <strong>CV profesional</strong> yang menonjol di mata HR & perekrut 🔍
      </p>
      <div class="cv-plans">
        ${pkgListHTML}
      </div>
      <p class="cv-note">
        <em>Semua paket bisa disesuaikan dengan bidang dan gaya personal kamu.</em>
      </p>
      <p>
        Lanjutkan dari bagian <strong><a href="#contact" class="chat-link">Contact Me</a></strong> di bawah ya — tinggal kirim data dasar (profil singkat, pengalaman, skill, portofolio/link) 😉
      </p>
      <div class="cv-cta">
        <a href="#contact" class="chat-link button button--primary" data-autofocus="true">Hubungi Admin</a>
      </div>
    </div>
  `;

  typing.classList.remove('typing');
  typing.classList.add('ai');
  typing.innerHTML = replyHTML;

  playSound?.('message');
  saveChatToLocal?.('ai', typing.textContent?.trim() || 'CV packages sent');

  const cta = typing.querySelector('[data-autofocus="true"]');
  cta?.focus?.({ preventScroll: true });

  await wait(1200);
  const contactSection = document.getElementById('contact');
  if (contactSection) smartScrollIntoView(contactSection);

  return;
}


  case 'curhat': {
    try {
      if (typeof wait !== 'function') window.wait = (ms) => new Promise(r => setTimeout(r, ms));
      if (typeof smartScrollBottom !== 'function') {
        window.smartScrollBottom = function () {
          const c = document.getElementById('chatMessages');
          if (c) c.scrollTop = c.scrollHeight;
        };
      }
      if (typeof saveChatToLocal !== 'function') window.saveChatToLocal = function(){};
      if (typeof playSound !== 'function') window.playSound = function(){};
      if (typeof showToast !== 'function') {
        window.showToast = function (msg) {
          let root = document.getElementById('toast-root');
          if (!root) {
            root = document.createElement('div');
            root.id = 'toast-root';
            document.body.appendChild(root);
          }
          const el = document.createElement('div');
          el.className = 'toast';
          el.textContent = msg;
          root.appendChild(el);
          requestAnimationFrame(() => el.classList.add('show'));
          setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 220);
          }, 2400);
        };
      }

      const chatMessages = document.getElementById('chatMessages');
      if (!chatMessages) {
        console.warn('[curhat] #chatMessages tidak ditemukan.');
        alert('Elemen chat (#chatMessages) tidak ada di halaman.');
        return;
      }

      const userText = "Saya hanya ingin ngobrol santai 😊";

      const userBubble = document.createElement("div");
      userBubble.className = "chat-message user";
      userBubble.innerText = userText;
      chatMessages.appendChild(userBubble);
      saveChatToLocal("user", userText);
      smartScrollBottom();

      await wait(700);
      const typing = document.createElement("div");
      typing.className = "chat-message ai typing";
      typing.setAttribute("aria-live", "polite");
      typing.innerHTML = `
        <div class="icon-circle"></div>
        <div class="bubble" aria-label="AI sedang mengetik">
          <span class="typing-dots">●●●</span>
        </div>`;
      chatMessages.appendChild(typing);
      smartScrollBottom();

      await wait(500);

      const replyHTML = `
        <div class="icon-circle"></div>
        <div class="bubble" role="group" aria-label="Obrolan santai">
          <p>
            Seru! Kadang kita butuh jeda buat <strong>ngobrol ringan</strong> tanpa beban 🍃<br>
            Kamu pengin bahas apa dulu nih?
          </p>

          <div class="quick-replies" role="list">
            <button class="chip" data-curhat="kerjaan">😵 Penat kerjaan</button>
            <button class="chip" data-curhat="perasaan">💔 Soal perasaan</button>
            <button class="chip" data-curhat="jokes">😅 Jokes receh</button>
            <button class="chip" data-curhat="cerita">🧠 Cerita aja</button>
          </div>

          <div class="note">
            <label class="toggle">
              <input type="checkbox" id="listenOnly">
              <span>Dengerin aja (tanpa solusi)</span>
            </label>
          </div>

          <p class="muted">PS: Kamu bisa ketik bebas. Aku dengerin tanpa nge-judge, dan semuanya privat di sini.</p>
        </div>`;
      typing.classList.remove('typing');
      typing.classList.add('ai');
      typing.innerHTML = replyHTML;

      playSound("message");
      saveChatToLocal("ai", typing.textContent?.trim() || "Curhat prompt");
      smartScrollBottom();

      const textarea = document.querySelector('.chat-input-area textarea');
      const chips = typing.querySelectorAll('.chip');
      const listenOnly = typing.querySelector('#listenOnly');

      let backTimer = setTimeout(() => {
        if (typeof showAssistantGreeting === 'function') showAssistantGreeting();
      }, 90000);

      const cancelBackTimer = () => { clearTimeout(backTimer); backTimer = null; };
      textarea?.addEventListener('input', cancelBackTimer);
      chips.forEach(c => c.addEventListener('click', cancelBackTimer));
      listenOnly?.addEventListener('change', cancelBackTimer);

      const respond = (topic) => {
        const bubble = document.createElement('div');
        bubble.className = 'chat-message ai';
        const noAdvice = listenOnly?.checked;

        const blocks = {
          kerjaan: noAdvice
            ? `Oke, aku dengerin ya. Ceritain bagian kerjaan yang bikin kamu paling capek akhir-akhir ini.`
            : `Kerjaan memang bisa bikin penuh. Mau coba bongkar bareng? Kamu bisa ceritain 3 hal: (1) yang paling nguras energi, (2) yang bisa kamu kontrol, (3) dukungan yang kamu butuhin. Aku bantu susun langkah kecilnya.`,
          perasaan: noAdvice
            ? `Aku di sini, dengerin tanpa solusi. Ceritain aja perasaanmu belakangan ini seperti apa.`
            : `Perasaan itu valid. Kalau mau, coba tulis: kejadian pemicu, pikiran yang muncul, dan efek ke badanmu. Nanti aku bantu rangkum dan kasih cara meredakannya pelan-pelan.`,
          jokes: `Siap! Ini satu dulu: Kenapa laptop suka diajak curhat? Karena dia punya “space” buat kamu. 😅 Mau lagi?`,
          cerita: noAdvice
            ? `Silakan cerita apa pun, pelan-pelan juga boleh. Aku dengerin.`
            : `Boleh mulai dari: “Belakangan ini aku lagi …” atau “Yang bikin kepikiran adalah …”. Habis itu kita rapikan bareng ya.`
        };

        bubble.innerHTML = `
          <div class="icon-circle"></div>
          <div class="bubble">${blocks[topic] || 'Ceritain aja ya, aku dengerin.'}</div>`;
        chatMessages.appendChild(bubble);
        playSound("message");
        smartScrollBottom();
      };

      chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
          const topic = e.currentTarget.getAttribute('data-curhat');
          respond(topic);
        });
      });

      return;
    } catch (err) {
      console.error('[curhat] error:', err);
      showToast?.('Ada kendala saat membuka mode curhat.');
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        const fallback = document.createElement('div');
        fallback.className = 'chat-message ai';
        fallback.innerHTML = `
          <div class="icon-circle"></div>
          <div class="bubble">
            Maaf, ada gangguan teknis barusan. Kamu bisa tulis aja ceritamu di sini, aku tetap dengerin ya 🙏
          </div>`;
        chatMessages.appendChild(fallback);
        smartScrollBottom?.();
      }
      return;
    }
  }


  case 'kontak': {
    try {
      if (typeof wait !== 'function') window.wait = (ms) => new Promise(r => setTimeout(r, ms));
      if (typeof smartScrollBottom !== 'function') {
        window.smartScrollBottom = function () {
          const c = document.getElementById('chatMessages');
          if (c) c.scrollTop = c.scrollHeight;
        };
      }
      if (typeof saveChatToLocal !== 'function') window.saveChatToLocal = function(){};
      if (typeof playSound !== 'function') window.playSound = function(){};
      if (typeof showToast !== 'function') {
        window.showToast = function (msg) {
          let root = document.getElementById('toast-root');
          if (!root) {
            root = document.createElement('div');
            root.id = 'toast-root';
            document.body.appendChild(root);
          }
          const el = document.createElement('div');
          el.className = 'toast';
          el.textContent = msg;
          root.appendChild(el);
          requestAnimationFrame(() => el.classList.add('show'));
          setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 220); }, 2400);
        };
      }

      const WA_NUMBER_PLAIN = '6282389160273';
      const WA_NUMBER_DISPLAY = '0823-8916-0273';
      const EMAIL = 'latifrusdi15@gmail.com';
      const WA_URL = `https://wa.me/${WA_NUMBER_PLAIN}`;
      const TEL_URL = `tel:+${WA_NUMBER_PLAIN}`;
      const MAILTO_URL = `mailto:${EMAIL}`;
      const HOURS_LABEL = 'Setiap hari • 08.00–20.00 WIB';

      const isOpenNowWIB = (() => {
        try {
          const nowStr = new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
          }).format(new Date());
          const hour = parseInt(nowStr, 10);
          // 08:00 s.d. 19:59 dianggap buka
          return hour >= 8 && hour < 20;
        } catch {
          const hour = new Date().getHours();
          return hour >= 8 && hour < 20;
        }
      })();

      const statusBadge = isOpenNowWIB
        ? '<span class="badge badge--open" aria-live="polite">Sedang buka</span>'
        : '<span class="badge badge--closed" aria-live="polite">Di luar jam layanan</span>';

      const chatMessages = document.getElementById('chatMessages');
      if (!chatMessages) {
        console.warn('[kontak] #chatMessages tidak ditemukan.');
        alert('Elemen chat (#chatMessages) tidak ada di halaman.');
        return;
      }

      const userText = "Saya butuh kontak admin atau bantuan langsung.";
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-message user';
      userBubble.innerText = userText;
      chatMessages.appendChild(userBubble);
      saveChatToLocal('user', userText);
      smartScrollBottom();

      await wait(600);
      const typing = document.createElement('div');
      typing.className = 'chat-message ai typing';
      typing.setAttribute('aria-live', 'polite');
      typing.innerHTML = `
        <div class="icon-circle"></div>
        <div class="bubble" aria-label="AI sedang mengetik">
          <span class="typing-dots">●●●</span>
        </div>`;
      chatMessages.appendChild(typing);
      smartScrollBottom();

      await wait(450);

      const replyHTML = `
        <div class="icon-circle"></div>
        <div class="bubble" role="group" aria-label="Informasi kontak admin">
          <p><strong>Kontak Admin</strong> ${statusBadge}</p>

          <div class="contact-block">
            <div class="contact-row">
              <span class="contact-label">WhatsApp</span>
              <a href="${WA_URL}" target="_blank" rel="noopener" class="contact-link">${WA_NUMBER_DISPLAY}</a>
            </div>
            <div class="contact-actions">
              <button class="btn btn--primary" id="btnWa">Chat WhatsApp</button>
              <button class="btn btn--ghost" id="btnCopyWa" aria-label="Salin nomor WhatsApp">Salin Nomor</button>
              <a class="btn btn--ghost" id="btnTelp" href="${TEL_URL}">Telepon</a>
            </div>
          </div>

          <div class="contact-block">
            <div class="contact-row">
              <span class="contact-label">Email</span>
              <a href="${MAILTO_URL}" class="contact-link">${EMAIL}</a>
            </div>
            <div class="contact-actions">
              <a class="btn btn--primary" id="btnEmail" href="${MAILTO_URL}">Kirim Email</a>
              <button class="btn btn--ghost" id="btnCopyEmail" aria-label="Salin alamat email">Salin Email</button>
            </div>
          </div>

          <p class="muted">
            Jam layanan: <strong>${HOURS_LABEL}</strong><br>
            Estimasi respon: <strong>5–15 menit</strong> saat jam layanan.
          </p>

          <div class="tips">
            <details>
              <summary>Tips agar cepat ditangani</summary>
              <ul class="list-clean">
                <li>• Nama lengkap</li>
                <li>• Kebutuhan/tujuan (singkat & jelas)</li>
                <li>• Lampirkan contoh/referensi (jika ada)</li>
                <li>• Kode mitra/reseller (jika relevan)</li>
              </ul>
            </details>
          </div>
        </div>
      `;
      typing.classList.remove('typing');
      typing.classList.add('ai');
      typing.innerHTML = replyHTML;

      playSound('message');
      saveChatToLocal('ai', typing.textContent?.trim() || 'Kontak admin');
      smartScrollBottom();

      const safeCopy = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          showToast('Disalin ke clipboard');
        } catch {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select(); document.execCommand('copy');
          ta.remove();
          showToast('Disalin ke clipboard');
        }
      };

      document.getElementById('btnWa')?.addEventListener('click', () => {
        window.open(WA_URL, '_blank', 'noopener');
      });
      document.getElementById('btnCopyWa')?.addEventListener('click', () => safeCopy(WA_NUMBER_DISPLAY));
      document.getElementById('btnTelp')?.addEventListener('click', () => {/* link <a> sudah handle */});

      document.getElementById('btnEmail')?.addEventListener('click', () => {/* link <a> sudah handle */});
      document.getElementById('btnCopyEmail')?.addEventListener('click', () => safeCopy(EMAIL));

      return;
    } catch (err) {
      console.error('[kontak] error:', err);
      showToast?.('Gagal memuat info kontak.');
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        const fallback = document.createElement('div');
        fallback.className = 'chat-message ai';
        fallback.innerHTML = `
          <div class="icon-circle"></div>
          <div class="bubble">
            Maaf, ada kendala teknis barusan. Kamu bisa hubungi admin via email: <strong>${EMAIL}</strong>
          </div>`;
        chatMessages.appendChild(fallback);
        smartScrollBottom?.();
      }
      return;
    }
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
