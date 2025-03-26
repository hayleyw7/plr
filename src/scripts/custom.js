document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.banner-video');
  const startTime = 0.6;
  const playbackRate = 1.0;
  let rafId = null;
  let lastTimestamp = 0;
  let accumulatedTime = 0;
  const targetFPS = 60;
  const frameDuration = 1000 / targetFPS;

  const addPassiveListener = (element, event, handler) => {
    element.addEventListener(event, handler, { passive: true });
  };

  function initVideo() {
    return new Promise((resolve) => {
      const loadedHandler = () => {
        video.removeEventListener('loadedmetadata', loadedHandler);
        video.currentTime = video.duration;
        resolve();
      };

      video.addEventListener('loadedmetadata', loadedHandler, { once: true });
    });
  }

  function playbackController(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    accumulatedTime += delta;

    while (accumulatedTime >= frameDuration) {
      updatePlayback();
      accumulatedTime -= frameDuration;
    }

    rafId = requestAnimationFrame(playbackController);
  }

  function updatePlayback() {
    if (!video.duration) return;

    const newTime = video.currentTime - (frameDuration / 1000) * playbackRate;
    if (newTime <= startTime) {
      video.currentTime = startTime;
      endPlayback();
      return;
    }
    video.currentTime = newTime;
  }

  function endPlayback() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    video.pause();
  }

  initVideo()
    .then(() => {
      return video.play().catch(e => {
        console.error("Playback failed, trying with user interaction:", e);
        document.body.addEventListener('click', () => video.play(), { once: true });
      });
    })
    .then(() => {
      lastTimestamp = performance.now();
      rafId = requestAnimationFrame(playbackController);
    });

  window.addEventListener('beforeunload', () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
});
