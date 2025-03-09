let autoMode = false;
let manualMode = false;
let emergencyMode = false;
let emergencyBlinking = null;

// Fungsi Loading
function hideLoading() {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000);
}

function toggleAuto() {
  if (emergencyMode) return;
  if (!autoMode && !manualMode) {
    autoMode = true;
    updateStatus("Auto");
    document.getElementById("autoIndicator").classList.add("glow");
    document.getElementById("manualIndicator").classList.remove("glow");
  }
}

function toggleManual() {
  if (emergencyMode) return;
  if (!manualMode && !autoMode) {
    manualMode = true;
    updateStatus("Manual");
    document.getElementById("manualIndicator").classList.add("glow");
    document.getElementById("autoIndicator").classList.remove("glow");
  }
}

function stopMode() {
  if (emergencyMode) return;
  autoMode = false;
  manualMode = false;
  updateStatus("Stopped");
  document.getElementById("autoIndicator").classList.remove("glow");
  document.getElementById("manualIndicator").classList.remove("glow");
}

function toggleEmergency() {
  if (!emergencyMode) {
    emergencyMode = true;
    autoMode = false;
    manualMode = false;
    updateStatus("Emergency");
    disableButtons();
    stopAllIndicators();
    startEmergencyBlink();
  } else {
    emergencyMode = false;
    enableButtons();
    stopEmergencyBlink();
    stopMode();
  }
}

function startEmergencyBlink() {
  let indicator = document.getElementById("emergencyIndicator");
  emergencyBlinking = setInterval(() => {
    indicator.classList.toggle("glow");
  }, 500);
}

function stopEmergencyBlink() {
  clearInterval(emergencyBlinking);
  document.getElementById("emergencyIndicator").classList.remove("glow");
}

function stopAllIndicators() {
  document.getElementById("autoIndicator").classList.remove("glow");
  document.getElementById("manualIndicator").classList.remove("glow");
}

function updateStatus(status) {
  document.getElementById("statusText").textContent = status;
}

function disableButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function enableButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}
