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


/*==================== SCROLL-UP ====================*/
  (function(){
    const btn = document.getElementById('scroll-up');
    const sound = document.getElementById('scroll-sound');

    function onScroll(){
      if (window.scrollY > 200){
        btn.classList.add('show-scroll');
      } else {
        btn.classList.remove('show-scroll');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try{ sound && sound.play && sound.play().catch(()=>{}); }catch{}
    });
  })();


/*==================== 🌗 DARK / LIGHT MODE PRO ====================*/
const themeToggle     = document.getElementById("theme-toggle");
const darkClass       = "dark-theme";        // kamu sudah pakai ini di root
const transitionClass = "theme-transition";  // opsional bila mau transisi cepat
const savedTheme      = localStorage.getItem("selected-theme");

// 🔔 Toast (tetap punyamu)
function showThemeToast(message, opts = {}) {
  const { duration = 4000 } = opts;
  const toast = document.getElementById("theme-toast");
  if (!toast) return;

  toast.innerHTML = `<span class="toast-message">${message}</span>`;
  toast.classList.remove("show"); void toast.offsetWidth; toast.classList.add("show");

  const au = document.getElementById("theme-sound");
  try { au && au.play && au.play().catch(()=>{}); } catch {}

  clearTimeout(showThemeToast.__t);
  showThemeToast.__t = setTimeout(() => toast.classList.remove("show"), duration);
  if (navigator.vibrate) navigator.vibrate(8);
}

// Terapkan tema awal (sekali)
function applyInitialTheme() {
  if (savedTheme === "dark") {
    document.documentElement.classList.add(darkClass);
    themeToggle && (themeToggle.checked = true);
  } else if (!savedTheme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add(darkClass);
      themeToggle && (themeToggle.checked = true);
    }
  }
}

// Toggle instan tanpa delay
function handleThemeToggle() {
  // Matikan semua transition sesaat agar benar-benar kilat
  document.documentElement.classList.add("no-anim");
  document.body.classList.add("no-anim");

  document.documentElement.classList.toggle(darkClass);
  const isDark = document.documentElement.classList.contains(darkClass);
  localStorage.setItem("selected-theme", isDark ? "dark" : "light");

  // Lepas killer class di frame berikutnya
  requestAnimationFrame(() => {
    document.documentElement.classList.remove("no-anim");
    document.body.classList.remove("no-anim");
  });

  showThemeToast(isDark ? "🌙 Mode Gelap Diaktifkan" : "☀️ Mode Terang Diaktifkan");
}

// Init sekali, tanpa duplikat
applyInitialTheme();
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

/*==================== Profile Berputar ====================*/
const blobImg = document.querySelector(".home__img");

blobImg.addEventListener("click", () => {
  blobImg.classList.add("spin");
  blobImg.addEventListener(
    "animationend",
    () => blobImg.classList.remove("spin"),
    { once: true }
  );
});
