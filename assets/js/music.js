// 🎵 Daftar lagu lengkap (judul, artis, lirik)
const songs = [
  {
  file: "assets/music/music1.mp3",
  title: "Bila Rasaku Ini Rasamu",
  artist: "Kerispatih",
  lyrics: `
  [00:31.00] 🎵 Bila Rasaku Ini Rasamu - Kerispatih
  [00:32.00] Aku memang terlanjur mencintaimu
  [00:39.00] Dan tak pernah kusesali itu
  [00:46.00] Seluruh jiwa telah kuserahkan
  [00:53.00] Menggenggam janji setiaku

  [01:01.00] Kumohon jangan jadikan semua ini
  [01:08.00] Alasan kau menyakitiku
  [01:15.00] Meskipun cintamu tak hanya untukku
  [01:22.00] Tapi cobalah sejenak mengerti

  [01:32.00] Bila rasaku ini rasamu
  [01:42.00] ....
  [01:45.00] Sanggupkah engkau menahan sakitnya
  [01:53.00] Terkhianati cinta yang kau jaga?
  [02:00.00] Coba bayangkan kembali

  [02:11.00] Betapa hancurnya hati ini, kasih
  [02:22.00] Semua telah terjadi
  [02:29.00] .....
  [03:09.00] Hu-oh-uh-oh-wo
  [03:11.00] Wo-uh-wo
  [03:14.00] Uh-oh, uh-uh-uh-oh

  [03:19.00] Bila rasaku ini rasamu (rasamu, oh)
  [03:32.00] Sanggupkah engkau menahan sakitnya
  [03:40.00] Terkhianati cinta yang kau jaga?
  [03:47.00] Coba bayangkan kembali

  [03:58.00] Betapa hancurnya hati ini, kasih
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
  [01:40.00] Tak mungkin ku melupakanmu
  [01:46.00] Tiada lagi yang kuharap, hanya kau seorang

  [01:55.00] Ha-ha-ha-aa hai-ya-ye he
  [01:58.00] Kau takkan percaya, kau kan selalu di hati
  [02:12.00] Haruskah kumenangis tuk mengatakan yang sesungguhnya

  [02:27.00] Kaulah segalanya untukku
  [02:34.00] Kaulah curahan hati ini
  [02:41.00] Tak mungkin ku melupakanmu
  [02:47.00] Tiada lagi yang kuharap, hanya kau seorang
  [02:55.00] .....

  [03:21.00] ho-wo-wo-ho-oo
  [03:30.00] ho-wo-wo-ho-oo....
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
  [04:43.00] .....
  [04:49.00]`
  },
  {
    file: "assets/music/music3.mp3",
    title: "Mengenangmu",
    artist: "Kerispatih",
    lyrics: `
    [00:00.00] 🎵 Mengenangmu - Kerispatih
    [00:06.00] Kutuliskan kenangan
    [00:10.00] Tentang cara ku menemukan dirimu
    [00:15.00] Tentang apa yang membuatku mudah
    `
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