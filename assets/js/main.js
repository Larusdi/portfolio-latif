/*===============================================================
🧠 LATIF RUSDI | Portfolio Main JavaScript
📂 Fitur Interaktif Premium · Navigasi · Animasi · Dark Mode · UI
===============================================================*/

/*==================== 🔘 MENU NAVIGASI ====================*/
// Tampilkan/Sembunyikan menu saat ikon toggle diklik
const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("active");
  });
}

// Tutup menu saat salah satu link diklik (untuk mobile)
const navLink = document.querySelectorAll(".nav__link");
navLink.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
});


/*==================== 📂 ACCORDION SKILLS ====================*/
// Toggle buka/tutup bagian skill
const skillsContent = document.getElementsByClassName("skills__content"),
      skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  const current = this.parentNode;

  // Tutup semua selain yang diklik
  for (let i = 0; i < skillsContent.length; i++) {
    if (skillsContent[i] !== current) {
      skillsContent[i].classList.remove("skills__open");
      skillsContent[i].classList.add("skills__close");
    }
  }

  // Toggle bagian yang diklik
  current.classList.toggle("skills__open");
  current.classList.toggle("skills__close");
}
skillsHeader.forEach((el) => el.addEventListener("click", toggleSkills));


/*==================== 🧩 MODAL LAYANAN ====================*/
// Buka modal layanan saat tombol diklik
const modalViews = document.querySelectorAll(".services__modal"),
      modalBtns = document.querySelectorAll(".services__button"),
      modalCloses = document.querySelectorAll(".services__modal-close");

// Tampilkan modal sesuai urutan tombol
modalBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    modalViews[i].classList.add("active-modal");
  });
});

// Tutup modal saat tombol close diklik
modalCloses.forEach((close) => {
  close.addEventListener("click", () => {
    modalViews.forEach((view) => view.classList.remove("active-modal"));
  });
});


/*==================== 🖼️ SWIPER PORTFOLIO ====================*/
// Inisialisasi Swiper untuk container portfolio
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


/*==================== 💬 SWIPER TESTIMONIAL ====================*/
// Inisialisasi Swiper untuk testimoni
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});


// ✅ Testimonial Swiper
let testimonialSwiper = new Swiper('.testimonial__container', {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination-testimonial',
    clickable: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});


/*==================== 📍 SCROLL MENU AKTIF ====================*/
// Menyorot menu aktif saat scroll halaman
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active-link");
    } else {
      navLink?.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);


/*==================== 🎨 HEADER & TOMBOL SCROLL-UP ====================*/
// Tambah background pada header saat discroll ke bawah
function scrollHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  window.scrollY >= 80
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// Tampilkan tombol scroll ke atas setelah melewati 560px
function scrollUp() {
  const scrollUpBtn = document.getElementById("scroll-up");
  if (!scrollUpBtn) return;

  window.scrollY >= 560
    ? scrollUpBtn.classList.add("show-scroll")
    : scrollUpBtn.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);
const toggle = document.querySelector(".ai-assistant-toggle");
  if (window.innerWidth <= 768) {
    toggle.style.bottom = "20px"; // atau sesuai media query
  }


/*==================== 🌗 DARK / LIGHT MODE PRO ====================*/
const themeToggle = document.getElementById("theme-toggle");
const darkClass = "dark-theme";
const transitionClass = "theme-transition";
const savedTheme = localStorage.getItem("selected-theme");

// 🔔 Fungsi toast
function showThemeToast(message) {
  const toast = document.getElementById("theme-toast");
  if (!toast) return;

  // Reset animasi jika sedang aktif
  toast.classList.remove("show");
  void toast.offsetWidth; // force reflow

  // Set isi pesan
  toast.innerHTML = `<span class="toast-message">${message}</span>`;

  // Tampilkan toast dengan animasi
  toast.classList.add("show");

  // Hilangkan toast setelah 4 detik
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}


// 🌈 Transisi halus
function addThemeTransition() {
  document.documentElement.classList.add(transitionClass);
  setTimeout(() => {
    document.documentElement.classList.remove(transitionClass);
  }, 500);
}

// 🌓 Terapkan tema awal
function applyInitialTheme() {
  if (savedTheme === "dark") {
    document.documentElement.classList.add(darkClass);
    if (themeToggle) themeToggle.checked = true;
  } else if (!savedTheme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add(darkClass);
      if (themeToggle) themeToggle.checked = true;
    }
  }
}

// 🌘 Toggle tema oleh user
function handleThemeToggle() {
  addThemeTransition();
  document.documentElement.classList.toggle(darkClass);

  const isDark = document.documentElement.classList.contains(darkClass);
  localStorage.setItem("selected-theme", isDark ? "dark" : "light");

  showThemeToast(
    isDark
      ? '<span style="font-size:1.2em;">🌙</span> Mode Gelap Diaktifkan'
      : '<span style="font-size:1.2em;">☀️</span> Mode Terang Diaktifkan'
  );
}

// 🚀 Jalankan saat halaman dimuat
applyInitialTheme();

// 🔁 Tambahkan event listener toggle
if (themeToggle) {
  themeToggle.addEventListener("change", handleThemeToggle);
}


// 🚀 Jalankan saat halaman dimuat
applyInitialTheme();

// 📌 Pasang event
if (themeToggle) {
  themeToggle.addEventListener("change", handleThemeToggle);
}



/*==================== ✨ ANIMASI REVEAL SAAT SCROLL ====================*/
// Munculkan elemen dengan efek saat masuk viewport
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // hanya sekali muncul
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el) => observer.observe(el));


/*==================== BLOGGER ====================*/
let swiperBlog = new Swiper(".blog__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
  centeredSlides: true,
  speed: 600,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


// 🎵 Daftar lagu lengkap (judul dan artis)
const songs = [
  {
    file: "assets/music/music1.mp3",
    title: "Bila Rasaku Ini Rasamu",
    artist: "Kerispatih"
  },
  {
    file: "assets/music/music2.mp3",
    title: "Kaulah Segalanya",
    artist: "Sammy Simorangkir"
  },
  {
    file: "assets/music/music3.mp3",
    title: "Mengenangmu",
    artist: "Kerispatih"
  },
  {
    file: "assets/music/music4.mp3",
    title: "Kesedihanku",
    artist: "Sammy Simorangkir"
  },
  {
    file: "assets/music/music4.mp3",
    title: "Tak Mampu Pergi",
    artist: "Sammy Simorangkir"
  }
];

let currentSong = 0;
let isFirstPlay = true;

const audioPlayer = document.getElementById("audioPlayer");
const musicToggle = document.getElementById("music-toggle");
const musicPlayerUI = document.getElementById("musicPlayer");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prevSong");
const nextBtn = document.getElementById("nextSong");
const musicIcon = document.getElementById("music-icon");
const musicTitle = document.getElementById("musicTitle");

// 🔄 Load lagu dan tampilkan info
function loadSong(index) {
  if (!songs[index]) return;
  const { file, title, artist } = songs[index];
  audioPlayer.src = file;
  musicTitle.innerHTML = `<marquee scrollamount="4" behavior="scroll">${title} - ${artist}</marquee>`;
  audioPlayer.load();
  audioPlayer.play()
    .then(() => {
      playPauseBtn.textContent = "⏸️";
      updateIcon(true);
    })
    .catch(err => {
      console.error("Gagal play:", err);
      playPauseBtn.textContent = "▶️";
      updateIcon(false);
    });
}

// 🎧 Update ikon musik (putar/pause)
function updateIcon(isPlaying) {
  if (isPlaying) {
    musicIcon.classList.remove("fa-play");
    musicIcon.classList.add("fa-pause", "rotate-music");
  } else {
    musicIcon.classList.remove("fa-pause", "rotate-music");
    musicIcon.classList.add("fa-play");
  }
}

// 🎵 Toggle UI pemutar (tanpa pause)
musicToggle.addEventListener("click", () => {
  const visible = musicPlayerUI.style.display === "block";
  musicPlayerUI.style.display = visible ? "none" : "block";

  if (!visible && isFirstPlay) {
    loadSong(currentSong);
    isFirstPlay = false;
  }
});

// ⏯️ Play/Pause tombol
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play()
      .then(() => {
        playPauseBtn.textContent = "⏸️";
        updateIcon(true);
      }).catch(err => {
        console.error("Play error:", err);
      });
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
    updateIcon(false);
  }
});

// ⏮️ Sebelumnya
prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

// ⏭️ Selanjutnya
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
});

// 🔁 Lanjut otomatis
audioPlayer.addEventListener("ended", () => {
  nextBtn.click();
});


// 🔊 Sound klik menu (termasuk header, footer, dan popup)
document.addEventListener("DOMContentLoaded", () => {
  const menuSound = document.getElementById("menu-click-sound");

  // ✅ Tambahkan ke semua link navigasi utama & footer yang menuju section
  const navLinks = document.querySelectorAll(
    ".nav__link, footer a[href^='#'], .footer__nav a"
  );

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (menuSound) {
        menuSound.currentTime = 0;
        menuSound.play().catch(() => {/* autoplay bisa ditolak di awal */});
      }
    });
  });

  // ✅ Tambahkan sound saat klik tombol popup (class .popup__button)
  const popupButtons = document.querySelectorAll(".popup-ad");
  popupButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (menuSound) {
        menuSound.currentTime = 0;
        menuSound.play().catch(() => {});
      }
    });
  });
});


// 🔊 Sound klik Tema Gelap
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeSound = document.getElementById("theme-sound");

  if (themeToggle && themeSound) {
    themeToggle.addEventListener("change", () => {
      themeSound.currentTime = 0;
      themeSound.play().catch(() => {/* autoplay mungkin diblokir sebelum interaksi */});
    });
  }
});


// 🔊 Sound klik scroll_up
const scrollSound = document.getElementById("scroll-sound");
const scrollButton = document.getElementById("scroll-up");

if (scrollButton && scrollSound) {
  scrollButton.addEventListener("click", () => {
    scrollSound.currentTime = 0;
    scrollSound.play().catch((e) => console.warn("Scroll sound error:", e));
  });
}

// 🔊 Sound klik scroll_Down
const scrollDownSound = document.getElementById("scrollDown-sound");
const scrollDownButton = document.querySelector(".home__scroll-button");

if (scrollDownButton && scrollDownSound) {
  scrollDownButton.addEventListener("click", () => {
    scrollDownSound.currentTime = 0;
    scrollDownSound.play().catch((e) => console.warn("Scroll down sound error:", e));
  });
}
