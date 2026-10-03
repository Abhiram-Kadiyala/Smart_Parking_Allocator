const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, "parking.json");

// Create initial parking data
function createInitialData() {
    const slots = [];

    for (let i = 1; i <= 20; i++) {
        slots.push({
            id: `B${i}`,
            status: "Available",
            vehicleNumber: null,
            vehicleType: null,
            parkedAt: null
        });
    }

    return {
        slots: slots,
        history: [],
        users: [],
        revenue: 0
    };
}

// Make parking.json if it doesn't exist
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(
        dataFile,
        JSON.stringify(createInitialData(), null, 2)
    );
}

// Read database
function readData() {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

// Save database
function saveData(data) {
    fs.writeFileSync(
        dataFile,
        JSON.stringify(data, null, 2)
    );
}


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Smart Parking Backend is running"
    });
});


// ==========================================
// GET ALL PARKING SLOTS
// ==========================================

app.get("/api/slots", (req, res) => {

    const data = readData();

    res.json({
        success: true,
        slots: data.slots
    });
});


// ==========================================
// PARK VEHICLE
// ==========================================

app.post("/api/park", (req, res) => {

    const { slotId, vehicleNumber, vehicleType } = req.body;

    if (!slotId || !vehicleNumber) {
        return res.status(400).json({
            success: false,
            message: "Slot ID and vehicle number are required"
        });
    }

    const data = readData();

    const slot = data.slots.find(
        s => s.id === slotId
    );

    if (!slot) {
        return res.status(404).json({
            success: false,
            message: "Parking slot not found"
        });
    }

    if (slot.status === "Occupied") {
        return res.status(400).json({
            success: false,
            message: "This slot is already occupied"
        });
    }

    slot.status = "Occupied";
    slot.vehicleNumber = vehicleNumber.toUpperCase();
    slot.vehicleType = vehicleType || "Bike";
    slot.parkedAt = new Date().toISOString();

    data.history.push({
        action: "PARKED",
        slotId: slot.id,
        vehicleNumber: slot.vehicleNumber,
        vehicleType: slot.vehicleType,
        time: slot.parkedAt
    });

    saveData(data);

    res.json({
        success: true,
        message: `${slot.id} occupied successfully`,
        slot: slot
    });
});


// ==========================================
// RELEASE PARKING SLOT
// ==========================================

app.post("/api/release", (req, res) => {

    const { slotId } = req.body;

    const data = readData();

    const slot = data.slots.find(
        s => s.id === slotId
    );

    if (!slot) {
        return res.status(404).json({
            success: false,
            message: "Parking slot not found"
        });
    }

    if (slot.status === "Available") {
        return res.status(400).json({
            success: false,
            message: "Slot is already available"
        });
    }

    const oldVehicleNumber = slot.vehicleNumber;

    data.history.push({
        action: "RELEASED",
        slotId: slot.id,
        vehicleNumber: oldVehicleNumber,
        time: new Date().toISOString()
    });

    slot.status = "Available";
    slot.vehicleNumber = null;
    slot.vehicleType = null;
    slot.parkedAt = null;

    saveData(data);

    res.json({
        success: true,
        message: `${slotId} released successfully`
    });
});


// ==========================================
// PARKING HISTORY
// ==========================================

app.get("/api/history", (req, res) => {

    const data = readData();

    res.json({
        success: true,
        history: data.history
    });
});


// ==========================================
// ADMIN STATISTICS
// ==========================================

app.get("/api/admin/stats", (req, res) => {

    const data = readData();

    const totalSlots = data.slots.length;

    const occupiedSlots = data.slots.filter(
        slot => slot.status === "Occupied"
    ).length;

    const availableSlots = totalSlots - occupiedSlots;

    const totalVehicles = data.history.filter(
        item => item.action === "PARKED"
    ).length;

    res.json({
        success: true,
        totalSlots: totalSlots,
        occupiedSlots: occupiedSlots,
        availableSlots: availableSlots,
        totalVehicles: totalVehicles,
        revenue: data.revenue
    });
});


// ==========================================
// RESET ALL PARKING SLOTS
// ==========================================

app.post("/api/reset", (req, res) => {

    const data = createInitialData();

    saveData(data);

    res.json({
        success: true,
        message: "All parking slots have been reset"
    });
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Smart Parking Backend running at http://localhost:${PORT}`
    );

});