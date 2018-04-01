const videoElement = document.getElementById('videoElement');

function handleVisibilityChange() {
  if (!document.hidden) {
    videoElement.pause();
  } else {
    videoElement.play();
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange, false);
videoElement.addEventListener('pause', function () {
  document.title = 'Paused';
}, false);
videoElement.addEventListener('play', function () {
  document.title = 'Playing';
}, false);
