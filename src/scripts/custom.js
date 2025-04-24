// navbar links

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function(e) {
//     e.preventDefault();
//     document.querySelector(this.getAttribute('href')).scrollIntoView({
//       behavior: 'smooth'
//     });
//   });
// });

// banner video

// document.addEventListener('DOMContentLoaded', () => {
//   const video = document.querySelector('.banner-image');
//   const startTime = 0.6;
//   const playbackRate = 1.0;
//   let rafId = null;
//   let lastTimestamp = 0;
//   let accumulatedTime = 0;
//   const targetFPS = 60;
//   const frameDuration = 1000 / targetFPS;

//   const addPassiveListener = (element, event, handler) => {
//     element.addEventListener(event, handler, { passive: true });
//   };

//   function initVideo() {
//     return new Promise((resolve) => {
//       const loadedHandler = () => {
//         video.removeEventListener('loadedmetadata', loadedHandler);
//         video.currentTime = video.duration;
//         resolve();
//       };

//       video.addEventListener('loadedmetadata', loadedHandler, { once: true });
//     });
//   }

//   function playbackController(timestamp) {
//     if (!lastTimestamp) lastTimestamp = timestamp;
//     const delta = timestamp - lastTimestamp;
//     lastTimestamp = timestamp;
//     accumulatedTime += delta;

//     while (accumulatedTime >= frameDuration) {
//       updatePlayback();
//       accumulatedTime -= frameDuration;
//     }

//     rafId = requestAnimationFrame(playbackController);
//   }

//   function updatePlayback() {
//     if (!video.duration) return;

//     const newTime = video.currentTime - (frameDuration / 1000) * playbackRate;
//     if (newTime <= startTime) {
//       video.currentTime = startTime;
//       endPlayback();
//       return;
//     }
//     video.currentTime = newTime;
//   }

//   function endPlayback() {
//     if (rafId) {
//       cancelAnimationFrame(rafId);
//       rafId = null;
//     }
//     video.pause();
//   }

//   initVideo()
//     .then(() => {
//       return video.play().catch(e => {
//         console.error("Playback failed, trying with user interaction:", e);
//         document.body.addEventListener('click', () => video.play(), { once: true });
//       });
//     })
//     .then(() => {
//       lastTimestamp = performance.now();
//       rafId = requestAnimationFrame(playbackController);
//     });

//   window.addEventListener('beforeunload', () => {
//     if (rafId) cancelAnimationFrame(rafId);
//   });
// });

// html snippets

// other snippets to maybe add

// Top-tier progression and world ranking.
// Highly active community and fun atmosphere.
// Commitment to unified guild objectives and goals.

// If you're serious intro PvP, PvE, and crafting, apply now.

// Are you ready to leave your mark on the battlefield? POLAR is calling on elite gamers to join our ranks. Whether you crave the thrill of intense PVP or the challenge of conquering endgame PVE content, we’re the guild that thrives in both chaos and order.
