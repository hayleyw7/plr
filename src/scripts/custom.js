document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.banner-video');
  const startTime = 0.6;
  const reverseThreshold = 0.7; // Reduced threshold for better transition
  const playbackRate = 1.0;
  let isReversing = false;
  let rafId = null;
  let lastTimestamp = 0;
  let accumulatedTime = 0;
  const targetFPS = 60;
  const frameDuration = 1000 / targetFPS;

  // Fix for passive event listener warning
  const addPassiveListener = (element, event, handler) => {
    element.addEventListener(event, handler, { passive: true });
  };

  // Initialize video with proper error handling
  function initVideo() {
    return new Promise((resolve) => {
      const loadedHandler = () => {
        video.removeEventListener('loadedmetadata', loadedHandler);
        video.currentTime = startTime;
        resolve();
      };
      
      video.addEventListener('loadedmetadata', loadedHandler, { once: true });
    });
  }

  // Smooth playback controller
  function playbackController(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    accumulatedTime += delta;

    // Frame-rate independent updates
    while (accumulatedTime >= frameDuration) {
      updatePlayback();
      accumulatedTime -= frameDuration;
    }

    rafId = requestAnimationFrame(playbackController);
  }

  function updatePlayback() {
    if (!video.duration) return;

    if (!isReversing) {
      // Forward playback
      if (video.currentTime >= video.duration - reverseThreshold) {
        startReversePlayback();
        return;
      }
      // Let native video playback handle forward motion
    } else {
      // Smooth reverse playback
      const newTime = video.currentTime - (frameDuration / 1000) * playbackRate;
      if (newTime <= startTime) {
        video.currentTime = startTime;
        endReversePlayback();
        return;
      }
      video.currentTime = newTime;
    }
  }

  function startReversePlayback() {
    isReversing = true;
    video.pause();
    
    // Ensure precise starting point for reverse
    video.currentTime = Math.min(
      video.duration - reverseThreshold,
      video.duration - 0.1
    );
    
    // Reset animation tracking
    lastTimestamp = performance.now();
    accumulatedTime = 0;
  }

  function endReversePlayback() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    video.pause();
    isReversing = false;
  }

  // Start the playback sequence
  initVideo()
    .then(() => {
      return video.play().catch(e => {
        console.error("Playback failed, trying with user interaction:", e);
        // Fallback for autoplay restrictions
        document.body.addEventListener('click', () => video.play(), { once: true });
      });
    })
    .then(() => {
      lastTimestamp = performance.now();
      rafId = requestAnimationFrame(playbackController);
    });

  // Clean up
  window.addEventListener('beforeunload', () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
});