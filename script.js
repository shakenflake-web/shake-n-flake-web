// Discography Tabs（SINGLE / ALBUM）
const tabs = document.querySelectorAll(".disc-tabs .tab-btn");
const panels = document.querySelectorAll(".disc-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.target;

    // tabs
    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });

    // panels
    panels.forEach((p) => p.classList.remove("active"));

    // activate
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    document.getElementById(targetId).classList.add("active");
  });
});

// Past live archive
const liveList = document.getElementById("past-live-list");
const liveToggle = document.querySelector(".live-toggle");

if (liveList && liveToggle) {
  const cards = Array.from(liveList.children);
  liveList.addEventListener("click", (event) => {
    const flyer = event.target.closest(".flyer-toggle");
    if (!flyer) return;

    const selected = liveList.querySelector('.flyer-toggle[aria-pressed="true"]');
    if (selected) selected.setAttribute("aria-pressed", "false");
    if (selected !== flyer) flyer.setAttribute("aria-pressed", "true");
  });

  function updateLiveList() {
    const columns = getComputedStyle(liveList).gridTemplateColumns.split(/\s+/).length;
    const expanded = liveToggle.getAttribute("aria-expanded") === "true";
    cards.forEach((card, index) => {
      card.hidden = !expanded && index >= columns;
    });
    liveToggle.hidden = cards.length <= columns;
    liveToggle.textContent = expanded ? "View less" : "View more...";
  }

  liveToggle.addEventListener("click", () => {
    const expanded = liveToggle.getAttribute("aria-expanded") === "true";
    liveToggle.setAttribute("aria-expanded", String(!expanded));
    updateLiveList();
  });
  updateLiveList();
  new ResizeObserver(updateLiveList).observe(liveList);
}

// Paint the same video frame behind the mobile hero.
const heroVideo = document.querySelector("video.video-bg");
const blurCanvas = document.querySelector(".video-blur");

if (heroVideo && blurCanvas) {
  const context = blurCanvas.getContext("2d");
  const mobileHero = window.matchMedia("(max-width: 768px)");
  let frameRequest = 0;
  let lastPaint = 0;
  let heroVisible = true;

  function paintBackground(now) {
    frameRequest = 0;
    if (!context || !mobileHero.matches || !heroVisible || document.hidden) return;
    if (heroVideo.readyState >= 2 && now - lastPaint >= 66) {
      const width = 320;
      const height = Math.max(1, Math.round(width * heroVideo.videoHeight / heroVideo.videoWidth));
      if (blurCanvas.width !== width || blurCanvas.height !== height) {
        blurCanvas.width = width;
        blurCanvas.height = height;
      }
      context.drawImage(heroVideo, 0, 0, width, height);
      lastPaint = now;
    }
    if (!heroVideo.paused && !heroVideo.ended) {
      frameRequest = requestAnimationFrame(paintBackground);
    }
  }

  function refreshBackground() {
    cancelAnimationFrame(frameRequest);
    lastPaint = 0;
    frameRequest = requestAnimationFrame(paintBackground);
  }

  heroVideo.addEventListener("play", refreshBackground);
  heroVideo.addEventListener("loadeddata", refreshBackground);
  heroVideo.addEventListener("seeked", refreshBackground);
  mobileHero.addEventListener("change", refreshBackground);
  document.addEventListener("visibilitychange", refreshBackground);
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    refreshBackground();
  }).observe(heroVideo);
  refreshBackground();
}
