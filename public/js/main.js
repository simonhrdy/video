const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const volumeRange = document.getElementById('volume');
const currentTimeSpan = document.getElementById('current-time');
const fullscreenButton = document.getElementById('fullscreen');
const pictureInPictureButton = document.getElementById('picture-in-picture');
const rewindButton = document.getElementById('rewind');
const forwardButton = document.getElementById('forward');
const progressBar = document.getElementById('progress-bar');
const controls = document.querySelector('.controls');
const volumeUp = document.querySelector("#soundPlus");
const volumeDown = document.querySelector("#soundMinus")

playPauseButton.addEventListener('click', togglePlayPause);
volumeRange.addEventListener('input', adjustVolume);
fullscreenButton.addEventListener('click', toggleFullscreen);
pictureInPictureButton.addEventListener('click', togglePictureInPicture);
rewindButton.addEventListener('click', rewind);
forwardButton.addEventListener('click', forward);
progressBar.addEventListener('input', seek);

video.addEventListener('timeupdate', updateCurrentTime);
video.addEventListener('loadedmetadata', updateProgressBar);

volumeUp.addEventListener("click", volUp)
volumeDown.addEventListener("click", volDown)

playPauseButton.addEventListener('mouseenter', () => {
    video.style.filter = 'brightness(70%)';
    playPauseButton.style.display = "block"
});

playPauseButton.addEventListener('mouseleave', () => {
    video.style.filter = 'brightness(100%)';
});

video.addEventListener('mouseleave', () => {
    if (!video.paused) {
        controls.style.display = 'none';
    }
    playPauseButton.style.display = 'none';
});

controls.addEventListener('mouseenter', () => {
    controls.style.display = 'flex';
});

video.addEventListener('mouseenter', () => {
    controls.style.display = 'flex';
    playPauseButton.style.display = "block"
});


function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
        playPauseButton.innerHTML = '<img width="30px" src="public/icons/pause-button.png" alt="Pause"/>';
    } else {
        video.pause();
        playPauseButton.innerHTML = '<img width="30px" src="public/icons/play-button.png" alt="Play"/>';
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        togglePlayPause();
    }
});

function adjustVolume() {
    video.volume = volumeRange.value;
}


function volUp(){
    console.log(video.volume)
    video.volume += 0.1;
    volumeRange.value = video.volume
}

function volDown(){
    video.volume -= 0.1;
    volumeRange.value = video.volume
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        video.requestPictureInPicture();
    }
}

function updateCurrentTime() {
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime - minutes * 60);
    currentTimeSpan.innerHTML = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    progressBar.value = video.currentTime;
}

function rewind() {
    video.currentTime -= 5;
}

function forward() {
    video.currentTime += 5;
}

function updateProgressBar() {
    progressBar.max = video.duration;
}

function seek() {
    video.currentTime = progressBar.value;
}
