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
