window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.banner-video');

  video.addEventListener('loadedmetadata', () => {
    video.currentTime = 0.6;
  });
  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= video.duration - 1) {
      video.pause();
      video.removeEventListener('timeupdate', arguments.callee);
    }
  });
});
