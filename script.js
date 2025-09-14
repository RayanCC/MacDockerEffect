let dock, dockItems;

const maxLift = 35;
const influenceRadius = 150;
const maxScale = 1.8;
const scaleRadius = 100;

document.addEventListener("DOMContentLoaded", function () {
  dock = document.getElementById("dock");
  initDock();

  dock.addEventListener("mousemove", function (e) {
    const dockRect = dock.getBoundingClientRect();
    const mouseX = e.clientX - dockRect.left;

    dockItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2 - dockRect.left;
      const distance = Math.abs(mouseX - itemCenterX);

      const liftHeight = Math.max(
        0,
        maxLift * (1 - distance / influenceRadius)
      );
      const scale =
        1 + (maxScale - 1) * Math.max(0, 1 - distance / scaleRadius);

      item.style.transform = `scale(${scale}) translateY(-${liftHeight}px)`;
      item.style.zIndex = Math.round(liftHeight);
    });
  });

  dock.addEventListener("mouseleave", function () {
    dockItems.forEach((item) => {
      item.style.transform = "scale(1) translateY(0)";
      item.style.zIndex = "";
    });
  });

  //initialDock
  function initDock() {
    dock.innerHTML = "";
    createDockItems(appConfigs);
    initDockEffects();
  }

  function createDockItems(app) {
    app.forEach((config, index) => {
      const item = document.createElement("div");
      item.className = "dock-item";
      item.dataset.index = index;

      const icon = document.createElement("div");
      icon.className = "icon";
      icon.textContent = config.content;
      icon.style.background = config.Style;

      item.appendChild(icon);
      dock.appendChild(item);
    });
  }

  function initDockEffects() {
    dockItems = document.querySelectorAll(".dock-item");
  }
});
