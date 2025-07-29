// 🎵 Daftar lagu lengkap (judul, artis, lirik)
const songs = [
  {
  file: "assets/music/music1.mp3",
  title: "Bila Rasaku Ini Rasamu",
  artist: "Kerispatih",
  lyrics: `
  [00:31.00] 🎵 Bila Rasaku Ini Rasamu - Kerispatih
  [00:32.55] Aku memang terlanjur mencintaimu
  [00:39.55] Dan tak pernah kusesali itu
  [00:46.58] Seluruh jiwa telah kuserahkan
  [00:53.58] Menggenggam janji setiaku

  [01:01.00] Kumohon jangan jadikan semua ini
  [01:07.58] Alasan kau menyakitiku
  [01:15.00] Meskipun cintamu tak hanya untukku
  [01:22.00] Tapi cobalah sejenak mengerti...

  [01:32.00] Bila rasaku ini rasamu
  [01:42.00] ....
  [01:44.59] Sanggupkah engkau menahan sakitnya
  [01:53.59] Terkhianati cinta yang kau jaga?
  [02:00.59] Coba bayangkan kembali

  [02:11.59] Betapa hancurnya hati ini, kasih
  [02:22.00] Semua telah terjadi
  [02:29.00] .....
  [03:08.59] Hu-oh-uh-oh-wo
  [03:12.50] Wo-uh-wo
  [03:13.59] Uh-oh, uh-uh-uh-oh

  [03:18.58] Bila rasaku ini rasamu (rasamu, oh)
  [03:32.00] Sanggupkah engkau menahan sakitnya
  [03:40.40] Terkhianati cinta yang kau jaga?
  [03:47.00] Coba bayangkan kembali

  [03:58.59] Betapa hancurnya hati ini, kasih
  [04:09.00] Semua telah terjadi
  [04:16.00] .....
  [04:20.00] Aku memang terlanjur mencintaimu
  [04:27.00]`
  },
  {
  file: "assets/music/music2.mp3",
  title: "Kaulah Segalanya",
  artist: "Sammy Simorangkir",
  lyrics: `
  [00:00.00] 🎵 Kaulah Segalanya - Sammy Simorangkir
  [00:27.00] Mungkin hanya Tuhan yang tahu segalanya
  [00:41.00] Apa yang ku inginkan di saat-saat ini
  [00:56.00] Kau takkan percaya, kau selalu di hati
  [01:10.00] Haruskah kumenangis 'tuk mengatakan yang sesungguhnya

  [01:25.00] Kaulah segalanya untukku
  [01:32.00] Kaulah curahan hati ini
  [01:39.50] Tak mungkin ku melupakanmu
  [01:45.58] Tiada lagi yang kuharap, hanya kau seorang

  [01:55.00] .....
  [01:57.59] Kau takkan percaya, kau slalu di hati
  [02:09.58] (kau selalu di hati)
  [02:12.59] Haruskah kumenangis, tuk mengatakan yang sesungguhnya

  [02:27.00] Kaulah segalanya untukku
  [02:34.00] Kaulah curahan hati ini
  [02:41.00] Tak mungkin ku melupakanmu
  [02:47.00] Tiada lagi yang kuharap, hanya kau seorang
  [02:55.00] .....

  [03:20.50] ho-wo-wo-ho-oo
  [03:31.00] ho-wo-wo-ho-oo....
  [03:39.00] Kaulah segalanya untukku (segalanya untukku)
  [03:47.00] Kaulah curahan hati ini
  [03:54.00] Tak mungkin ku melupakanmu
  [04:00.00] Tiada lagi yang kuharap
  [04:04.00] ho-wo-wo-ho-oo (Kaulah segalanya untukku)
  [04:12.00] (Kaulah curahan) hati ini...

  [04:19.00] Tak mungkin ku melupakanmu
  [04:25.00] Tiada lagi yang kuharap
  [04:29.00] Tiada lagi yang kuharap
  [04:33.00] Tiada lagi yang kuharap...
  [04:38.00] Hanya kau seorang
  [04:43.59] .....
  [04:49.00]`
  },
  {
  file: "assets/music/music3.mp3",
  title: "Mengenangmu",
  artist: "Kerispatih",
  lyrics: `
  [00:00.00] 🎵 Mengenangmu - Kerispatih
  [00:25.50] Tak kan pernah habis air mataku
  [00:31.00] Bila ku ingat tentang dirimu...
  [00:40.00] Mungkin hanya kau yang tahu
  [00:44.00] Mengapa sampai saat ini ku masih sendiri
  [00:52.00] .....

  [00:55.00] Adakah di sana kau rindu padaku
  [01:00.00] Meski kita kini ada di dunia berbeda
  [01:10.00] Bila masih mungkin waktu kuputar
  [01:15.50] Kan kutunggu dirimu

  [01:21.00] Biarlah ku simpan sampai nanti aku kan ada di sana
  [01:32.50] Tenanglah dirimu dalam kedamaian
  [01:35.50] Ingatlah cintaku
  [01:39.50] Kau tak terlihat lagi, namun cintamu abadi

  [01:51.00] Adakah di sana kau rindu padaku
  [01:56.00] Meski kita kini ada di dunia berbeda
  [02:05.55] Bila masih mungkin waktu kuputar
  [02:11.00] Kan kutunggu dirimu

  [02:16.57] Biarlah ku simpan sampai nanti aku kan ada di sana
  [02:27.58] Tenanglah dirimu dalam kedamaian
  [02:31.00] Ingatlah cintaku
  [02:35.00] Kau tak terlihat lagi, namun cintamu abadi
  [02:43.57] .....

  [03:19.40] Biarlah ku simpan sampai nanti aku kan ada di sana
  [03:30.55] Tenanglah dirimu dalam kedamaian
  [03:34.55] Ingatlah cintaku
  [03:38.00] Kau tak terlihat lagi, namun cintamu abadi
  [03:47.00] .....

  [04:04.00] Lihatlah cintaku
  [04:07.55] Kau tak terlihat lagi, namun cintamu abadi
  [04:20.00] .....
  [04:21.00]`
  },
  {
  file: "assets/music/music4.mp3",
  title: "Kesedihanku",
  artist: "Sammy Simorangkir",
  lyrics: `
  [00:00.00] 🎵 Kesedihanku - Sammy Simorangkir
  [00:25.50] Sepinya hari yang ku lewati
  [00:32.50] Tanpa ada dirimu menemani
  [00:39.59] Sunyi ku rasa dalam hidupku
  [00:46.58] Tak mampu aku tuk melangkah

  [00:54.00] Masih ku ingat indah senyummu
  [01:01.40] Yang selalu membuatku mengenangmu
  [01:08.00] Terbawa aku dalam sedihku
  [01:14.59] Tak sadar kini kau tak di sini

  [01:22.40] Engkau masih yang terindah
  [01:29.50] Indah di dalam hatiku
  [01:36.58] Mengapa kisah kita berakhir
  [01:43.58] Yang seperti ini...

  [01:58.00] Masih ku ingat indah senyummu
  [02:05.00] Yang selalu membuatku mengenangmu
  [02:12.00] Terbawa aku dalam sedihku
  [02:19.40] Tak sadar kini kau tak di sini

  [02:26.30] Engkau masih yang terindah
  [02:33.58] Indah di dalam hatiku
  [02:40.59] Mengapa kisah kita berakhir
  [02:47.59] Yang seperti ini...
  [02:55.58] .....
  [03:11.58] (Yang seperti ini)
  [03:18.58] .....

  [03:23.30] Engkau masih yang terindah
  [03:30.58] Indah di dalam hatiku
  [03:37.59] Mengapa kisah kita berakhir
  [03:44.58] Yang seperti ini...

  [03:51.59] Hampa kini yang ku rasa...
  [03:59.00] Menangis pun ku tak mampu
  [04:05.59] Hanya sisa kenangan terindah...
  [04:18.55] Dan kesedihanku...
  [04:19.00]`
  },
  {
  file: "assets/music/music5.mp3",
  title: "Tak Mampu Pergi",
  artist: "Sammy Simorangkir",
  lyrics: `
[00:00.00] 🎵 Tak Mampu Pergi - Sammy Simorangkir
[00:17.50] Ku tutup pintu cintaku
[00:23.59] Yang sekian lama terbuka untukmu
[00:35.51] Lelah hati ini
[00:46.50] Apakah selama ini cinta yang ada hanyalah semu

[01:00.59] Betapa sakitnya hatiku
[01:09.98] Dan dirimu memilih dirinya
[01:17.59] Hingga tak hiraukan cinta kita
[01:29.94] Ketika dia yang kau cinta mencintai yang lain

[01:37.21] Betapa dalamnya terluka hatiku
[01:43.55] Dan bagaimanakah ku harus meyakinkan diriku (diriku)
[01:51.00] Saat ku dengar suaramu
[01:55.46] Ku tak mampu pergi...
[02:07.00] ..... 
[02:09.59] Ku tak mampu pergi... (ku tak mampu ku tak mampu ku tak mampu pergi
[02:20.59] .....

[02:28.56] Lelah rasanya hati untuk ku bertahan (bertahan)
[02:35.54] Namun aku sungguh-sungguh tak mampu oh wo

[02:48.59] Dia yang kau cinta mencintai yang lain
[02:54.58] Betapa dalamnya terluka hatiku
[03:02.62] Dan bagaimanakah ku harus meyakinkan diriku

[03:08.59] Saat ku dengar suaramu hatiku bergetar (bergetar)
[03:16.50] Saat ku tatap matamu ku tak mampu pergi
[03:32.00] .....
[03:33.00]`
}
];

let currentSong = 0;
let isFirstPlay = true;

// 🔗 Element
const audioPlayer = document.getElementById("audioPlayer");
const musicToggle = document.getElementById("music-toggle");
const musicPlayerUI = document.getElementById("musicPlayer");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prevSong");
const nextBtn = document.getElementById("nextSong");
const musicIcon = document.getElementById("music-icon");
const musicTitle = document.getElementById("musicTitle");
const lyricsDisplay = document.getElementById("lyricsDisplay");

let parsedLyrics = [];

// Ambil elemen audio & visualizer
const visualizerBars = document.querySelectorAll('.music-visualizer span');

// Fungsi untuk aktifkan atau hentikan animasi visualizer
function toggleVisualizer(isPlaying) {
  visualizerBars.forEach(bar => {
    bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
  });
}

// Dengarkan event play dan pause
audioPlayer.addEventListener('play', () => toggleVisualizer(true));
audioPlayer.addEventListener('pause', () => toggleVisualizer(false));

// Opsional: saat audio selesai, juga hentikan visualizer
audioPlayer.addEventListener('ended', () => toggleVisualizer(false));


// ⛔ Sembunyikan player saat awal
if (musicPlayerUI) musicPlayerUI.style.display = "none";

// 🔍 Parse .lrc lyrics
function parseLyrics(text) {
  const lines = text.trim().split('\n');
  return lines.map(line => {
    const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?]/);
    if (!match) return null;
    const min = parseInt(match[1]);
    const sec = parseInt(match[2]);
    const ms = match[3] ? parseInt(match[3].padEnd(3, '0')) : 0;
    const time = min * 60 + sec + ms / 1000;
    const content = line.replace(/\[.*?]/, '').trim();
    return { time, content };
  }).filter(Boolean);
}

function updateLyrics(currentTime) {
  for (let i = 0; i < parsedLyrics.length; i++) {
    if (currentTime < parsedLyrics[i].time) {
      const index = i > 0 ? i - 1 : 0;

      // 🔁 Buat semua lirik dengan tag <div>
      lyricsDisplay.innerHTML = parsedLyrics.map((line, idx) => {
        const isActive = idx === index ? 'active' : '';
        return `<div class="${isActive}">${line.content}</div>`;
      }).join("");

      // 🎯 Scroll ke baris aktif
      const activeLine = lyricsDisplay.querySelector(".active");
      if (activeLine) {
        activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      break;
    }
  }
}

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Format waktu ke mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Update progress bar dan waktu saat berjalan
audioPlayer.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audioPlayer;
  progressBar.max = duration;
  progressBar.value = currentTime;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

// Klik pada progress bar untuk seek
progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
});

// volume user
const volumeUpBtn = document.getElementById("volumeUp");
const volumeDownBtn = document.getElementById("volumeDown");
const volumeLevel = document.getElementById("volumeLevel");

// 🎚️ Update UI Volume (icon + persentase)
function updateVolumeUI(volume) {
  const percent = Math.round(volume * 100);
  volumeLevel.textContent = `${percent}%`;

  // Opsional: Ubah warna glow berdasarkan level
  if (percent === 0) {
    volumeLevel.style.color = "#999";
  } else if (percent <= 50) {
    volumeLevel.style.color = "#00c0ff";
  } else {
    volumeLevel.style.color = "#00f0ff";
  }
}

// ➕ Volume Naik
volumeUpBtn.addEventListener("click", () => {
  let newVolume = Math.min(audioPlayer.volume + 0.1, 1);
  audioPlayer.volume = newVolume;
  updateVolumeUI(newVolume);
});

// ➖ Volume Turun
volumeDownBtn.addEventListener("click", () => {
  let newVolume = Math.max(audioPlayer.volume - 0.1, 0);
  audioPlayer.volume = newVolume;
  updateVolumeUI(newVolume);
});

// Set volume awal
audioPlayer.addEventListener("loadedmetadata", () => {
  updateVolumeUI(audioPlayer.volume);
});

// 📦 Load lagu + lirik
function loadSong(index) {
  if (!songs[index]) return;
  const { file, title, artist, lyrics } = songs[index];

  audioPlayer.src = file;
  musicTitle.innerHTML = `<marquee scrollamount="4">${title} - ${artist}</marquee>`;
  parsedLyrics = parseLyrics(lyrics || "");
  lyricsDisplay.innerHTML = "Lirik akan muncul di sini...";

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

// 🎧 Update ikon putar/pause
function updateIcon(isPlaying) {
  if (!musicIcon) return;
  if (isPlaying) {
    musicIcon.classList.remove("fa-play");
    musicIcon.classList.add("fa-pause", "rotate-music");
  } else {
    musicIcon.classList.remove("fa-pause", "rotate-music");
    musicIcon.classList.add("fa-play");
  }
}

// ▶️ Play/Pause
if (playPauseBtn) {
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
}

// 🖱️ Toggle tampilan player (hanya muncul saat diklik)
if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    const visible = musicPlayerUI.style.display === "block";
    musicPlayerUI.style.display = visible ? "none" : "block";

    if (!visible && isFirstPlay) {
      loadSong(currentSong);
      isFirstPlay = false;
    }
  });
}


// ⏮️ Lagu sebelumnya
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
  });
}

// ⏭️ Lagu berikutnya
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
  });
}

// 🔁 Lanjut otomatis
audioPlayer.addEventListener("ended", () => {
  nextBtn.click();
});

// 🔁 Update lirik saat lagu berjalan
audioPlayer.addEventListener("timeupdate", () => {
  updateLyrics(audioPlayer.currentTime);
});

const likeBtn = document.getElementById('likeBtn');
const heartIcon = likeBtn.querySelector('i');

// Cek status dari localStorage
let isLiked = localStorage.getItem('likedSong') === 'true';
if (isLiked) {
  heartIcon.classList.remove('far');
  heartIcon.classList.add('fas');
  likeBtn.classList.add('liked');
}

// Fungsi efek kobaran api
function showExplosion() {
  const explosion = document.createElement('div');
  explosion.className = 'like-explode';
  explosion.innerText = 'Disukai 💖';
  likeBtn.parentElement.appendChild(explosion);

  setTimeout(() => {
    explosion.remove();
  }, 1000);
}

// Klik tombol ❤️
likeBtn.addEventListener('click', () => {
  isLiked = !isLiked;

  if (isLiked) {
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas');
    likeBtn.classList.add('liked');
    showExplosion();
    localStorage.setItem('likedSong', 'true');
  } else {
    heartIcon.classList.remove('fas');
    heartIcon.classList.add('far');
    likeBtn.classList.remove('liked');
    localStorage.setItem('likedSong', 'false');
  }
});


// 🎵 Repeat & Shuffle Variables
let repeatMode = "off"; // off, all, one
let isShuffle = false;

// 🔁 Repeat Button Logic
const repeatBtn = document.getElementById("repeatBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatIcon = repeatBtn?.querySelector("i");

// ⏯ Repeat Mode Cycle
if (repeatBtn) {
  repeatBtn.addEventListener("click", () => {
    if (repeatMode === "off") {
      repeatMode = "all";
      repeatIcon.className = "fas fa-redo";
      repeatBtn.classList.add("active");
      repeatBtn.title = "Ulangi Semua";
    } else if (repeatMode === "all") {
      repeatMode = "one";
      repeatIcon.className = "fas fa-redo-alt";
      repeatBtn.title = "Ulangi Satu Lagu";
    } else {
      repeatMode = "off";
      repeatIcon.className = "fas fa-redo";
      repeatBtn.classList.remove("active");
      repeatBtn.title = "Repeat Mati";
    }
  });
}


// 🌀 Simpan playlist asli untuk restore saat shuffle dimatikan
let originalSongs = [...songs];

// 🔀 Shuffle Button Toggle (aktifkan logika shuffle)
if (shuffleBtn) {
  shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);
    shuffleBtn.title = isShuffle ? "Acak Lagu Aktif" : "Acak Lagu Mati";

    if (isShuffle) {
      songs = shufflePlaylist([...songs]); // Acak playlist baru
      currentSong = 0;
    } else {
      songs = [...originalSongs]; // Kembalikan ke urutan awal
      currentSong = 0;
    }

    loadSong(currentSong); // Muat ulang lagu pertama dari playlist aktif
  });
}

// 📦 Saat lagu selesai diputar
audioPlayer.addEventListener("ended", () => {
  if (repeatMode === "one") {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
  } else if (repeatMode === "all") {
    playNextTrack();
  } else {
    console.log("Lagu selesai tanpa repeat");
  }
});

// ▶️ Fungsi ke lagu berikutnya
function playNextTrack() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

// 🌀 Fungsi acak playlist jika diperlukan
function shufflePlaylist(array) {
  // Algoritma Fisher-Yates Shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// ⬇️ Elemen untuk pencarian lagu
const searchPopup = document.getElementById("searchPopup");     // Popup pencarian lagu
const searchInput = document.getElementById("searchInput");     // Input untuk ketik kata kunci
const searchResults = document.getElementById("searchResults"); // Daftar hasil pencarian

// 🔍 Klik tombol pencarian akan munculkan popup
document.getElementById("searchBtn").addEventListener("click", () => {
  searchPopup.classList.remove("hidden");   // Tampilkan popup
  searchInput.value = "";                   // Reset input
  searchResults.innerHTML = "";             // Kosongkan hasil
  searchInput.focus();                      // Fokus ke input
});

// ❌ Tutup popup jika klik di luar area konten
searchPopup.addEventListener("click", (e) => {
  if (e.target === searchPopup) {
    searchPopup.classList.add("hidden");    // Sembunyikan kembali popup
  }
});

// 📦 Fungsi pencarian berdasarkan judul atau artis
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase(); // Ambil kata kunci & ubah ke huruf kecil
  searchResults.innerHTML = "";                   // Kosongkan hasil sebelumnya

  // 🔁 Periksa setiap lagu dalam daftar
  songs.forEach((song, index) => {
    const match = song.title.toLowerCase().includes(keyword) || 
                  song.artist.toLowerCase().includes(keyword);

    if (match) {
      // 🔘 Buat elemen hasil jika cocok
      const li = document.createElement("li");
      li.textContent = `${song.title} - ${song.artist}`;

      // 🎧 Klik pada hasil pencarian akan memutar lagu
      li.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        searchPopup.classList.add("hidden"); // Sembunyikan popup setelah dipilih
      });

      searchResults.appendChild(li); // Tampilkan hasil
    }
  });

  // ❌ Jika tidak ada yang cocok
  if (!searchResults.hasChildNodes()) {
    searchResults.innerHTML = "<li>Tidak ditemukan 🎵</li>";
  }
});
