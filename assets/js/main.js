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



/*==================== 🌗 DARK / LIGHT MODE PRO ====================*/
// 🌙 Premium toggle tema gelap/terang dengan efek suara, getaran, transisi halus, dan toast

const themeToggle = document.getElementById("theme-toggle");
const darkClass = "dark-theme";
const transitionClass = "theme-transition";
const savedTheme = localStorage.getItem("selected-theme");

// 🎵 Efek suara iOS
const toggleSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_3f59c1f116.mp3");
toggleSound.volume = 0.6;

// 🔔 Fungsi toast premium
function showThemeToast(message) {
  const toast = document.getElementById("theme-toast");
  if (!toast) return;
  toast.innerHTML = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// 🌈 Transisi mewah saat tema berubah
function addThemeTransition() {
  document.documentElement.classList.add(transitionClass);
  setTimeout(() => {
    document.documentElement.classList.remove(transitionClass);
  }, 500);
}

// 🌓 Terapkan tema awal dari localStorage atau sistem
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

// 🌘 Saat user toggle tema
function handleThemeToggle() {
  addThemeTransition();
  document.documentElement.classList.toggle(darkClass);

  // 🔊 Suara
  try {
    toggleSound.currentTime = 0;
    toggleSound.play();
  } catch (e) {}

  // 📱 Getaran
  if (navigator.vibrate) navigator.vibrate(20);

  // 💾 Simpan preferensi
  const isDark = document.documentElement.classList.contains(darkClass);
  localStorage.setItem("selected-theme", isDark ? "dark" : "light");

  // 🔔 Tampilkan toast
 showThemeToast(
  isDark 
    ? '<span style="font-size:1.2em;">🌙</span> Mode Gelap Diaktifkan'
    : '<span style="font-size:1.2em;">☀️</span> Mode Terang Diaktifkan'
);
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
