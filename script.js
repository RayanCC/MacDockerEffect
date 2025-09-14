let dock, dockItems;

document.addEventListener("DOMContentLoaded", function () {
  dock = document.getElementById("dock");
  initDock();
});

//initialDock
function initDock() {
  dock.innerHTML = "";
  createDockItems(appConfigs);
  initDockEffects();
}
