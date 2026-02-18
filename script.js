// Discography Tabs（SINGLE / ALBUM）
const tabs = document.querySelectorAll(".tab-btn");
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
