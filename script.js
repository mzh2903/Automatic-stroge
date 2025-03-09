let autoMode = false;
let manualMode = false;
let emergencyMode = false;
let emergencyBlinking = null;

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
        updateStatus("Auto Mode");
        document.getElementById("autoIndicator").style.backgroundColor = "green";
        document.getElementById("manualIndicator").style.backgroundColor = "gray";
    }
}

function toggleManual() {
    if (emergencyMode) return;
    if (!manualMode && !autoMode) {
        manualMode = true;
        updateStatus("Manual Mode");
        document.getElementById("manualIndicator").style.backgroundColor = "yellow";
        document.getElementById("autoIndicator").style.backgroundColor = "gray";
    }
}

function stopMode() {
    if (emergencyMode) return;
    autoMode = false;
    manualMode = false;
    updateStatus("Stopped");
    resetIndicators();
}

function toggleEmergency() {
    if (!emergencyMode) {
        emergencyMode = true;
        stopMode();
        disableButtons();
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
        indicator.style.backgroundColor = (indicator.style.backgroundColor === "red") ? "gray" : "red";
    }, 500);
}

function stopEmergencyBlink() {
    clearInterval(emergencyBlinking);
    document.getElementById("emergencyIndicator").style.backgroundColor = "gray";
}

function resetIndicators() {
    document.getElementById("autoIndicator").style.backgroundColor = "gray";
    document.getElementById("manualIndicator").style.backgroundColor = "gray";
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
