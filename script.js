const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");

const songs = [
    { name: "Rick_Astley_-_Never_Gonna_Give_You_Up_47958276.mp3", title: "Never Gonna You Up" },
    { name: "Imagine_Dragons_-_Bones_73949726.mp3", title: "Bones" },
];
let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = songs[index];
    audio.src = "music/" + song.name;
    title.textContent = song.title;
}
loadSong(songIndex);

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = "⏸️";
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    if (isPlaying) playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    if (isPlaying) playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    progress.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration) || "0:00";
});

progress.addEventListener("input", () => {
    const duration = audio.duration;
    audio.currentTime = (progress.value / 100) * duration;
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);
