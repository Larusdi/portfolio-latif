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

// 🔊 Suara klik pada tombol "Hubungi saya" & "Contact Me"
document.addEventListener("DOMContentLoaded", () => {
  const projectBtn = document.getElementById("project-button");
  const projectSound = document.getElementById("project-sound");

  const heroContactBtn = document.getElementById("hero-contact");
  const heroContactSound = document.getElementById("hero-contact-sound");

  // ▶️ Project Button
  if (projectBtn && projectSound) {
    projectBtn.addEventListener("click", () => {
      projectSound.currentTime = 0;
      projectSound.play().catch(() => {
        // autoplay mungkin ditolak sebelum interaksi
      });
    });
  }

  // ▶️ Hero Contact Button
  if (heroContactBtn && heroContactSound) {
    heroContactBtn.addEventListener("click", () => {
      heroContactSound.currentTime = 0;
      heroContactSound.play().catch(() => {
        // autoplay mungkin ditolak sebelum interaksi
      });
    });
  }
});

// 🔊 Suara klik saat ikon Badut AI ditekan
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-badut");
  const toggleSound = document.getElementById("badut-toggle-sound");

  toggleButton.addEventListener("click", () => {
    if (toggleSound) {
      toggleSound.currentTime = 0; // Reset suara ke awal
      toggleSound.play();          // Mainkan suara
    }
  });
});
