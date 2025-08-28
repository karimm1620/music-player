const listLagu = [
  {
    nama: "Live Forever",
    artis: "Oasis",
    src: "assets/Live Forever (Remastered).mp3",
    cover: "assets/live forever.jpg",
  },
  {
    nama: "Slide Away",
    artis: "Oasis",
    src: "assets/Oasis - Slide Away (Official Visualiser '25).mp3",
    cover: "assets/slide away.jpg",
  },
  {
    nama: "Stand by Me",
    artis: "Oasis",
    src: "assets/Stand By Me (Remastered).mp3",
    cover: "assets/standByMe.jpg",
  },
  {
    nama: "The Winners Take it All",
    artis: "ABBA",
    src: "assets/winners take it all.mp3",
    cover: "assets/theWinnersTakeItAll.jpg",
  },
  {
    nama: "UUIIAA",
    artis: "Cat",
    src: "assets/Voicy_u i i a.mp3",
    cover: "assets/uuiiaa.jpg",
  },
];

const namaArtis = document.querySelector(".nama-artis");
const judulLagu = document.querySelector(".judul-lagu");
const fillBar = document.querySelector(".fill-bar");
const waktu = document.querySelector(".waktu");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const prog = document.querySelector(".progress-bar");

let lagu = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSong);
  lagu.addEventListener("timeupdate", updateProgress);
  lagu.addEventListener("ended", laguSelanjutnya);
  prevBtn.addEventListener("click", laguSebelumnya);
  nextBtn.addEventListener("click", laguSelanjutnya);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);
});

function loadSong(index) {
  const { nama, artis, src, cover: thumb } = listLagu[index];
  namaArtis.innerText = artis;
  judulLagu.innerText = nama;
  lagu.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
  if (lagu.duration) {
    const pos = (lagu.currentTime / lagu.duration) * 100;
    fillBar.style.width = `${pos}%`;

    const duration = formatTime(lagu.duration);
    const currentTime = formatTime(lagu.currentTime);
    waktu.innerText = `${currentTime} - ${duration}`;
  }
}

function formatTime(seconds) {
  const menit = Math.floor(seconds / 60);
  const detik = Math.floor(seconds % 60);
  return `${menit}:${detik < 10 ? "0" : ""}${detik}`;
}

function togglePlayPause() {
  if (playing) {
    lagu.pause();
  } else {
    lagu.play();
  }
  playing = !playing;
  playBtn.classList.toggle("fa-pause", playing);
  playBtn.classList.toggle("fa-play", !playing);
  cover.classList.toggle("active", playing);
}

function laguSelanjutnya() {
  currentSong = (currentSong + 1) % listLagu.length;
  playMusic();
}

function laguSebelumnya() {
  currentSong = (currentSong - 1 + listLagu.length) % listLagu.length;
  playMusic();
}

function playMusic() {
  loadSong(currentSong);
  lagu.play();
  playing = true;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
  cover.classList.add("active");
}

function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * lagu.duration;
  lagu.currentTime = pos;
}