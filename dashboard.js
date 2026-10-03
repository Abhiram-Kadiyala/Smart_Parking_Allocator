// ==========================================
// SMART PARKING DASHBOARD
// dashboard.js
// ==========================================

const TOTAL_SLOTS = 20;

// ==========================================
// GLOBAL VARIABLES
// ==========================================

let selectedEnvironment = "";
let selectedArea = "";
let selectedGate = "";
let selectedVehicle = "";
let selectedSlot = "";


// ==========================================
// HIDE ALL PARKING SECTIONS
// ==========================================

function hideAllParkingSections() {

    const sections = [
        "environmentSelection",
        "collegeParkingSection",
        "gateSelection",
        "vehicleSelection",
        "parkingSummarySection",
        "bikeNumberSection",
        "allSlotsSection",
        "confirmSlotSection",
        "slotSelection",
        "recommendationSection",
        "officeParkingSection"
    ];

    sections.forEach(function (id) {

        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }

    });
}


// ==========================================
// SHOW PROFILE
// ==========================================

function showProfile() {

    document
        .getElementById("welcomeSection")
        .classList.add("hidden");

    document
        .getElementById("parkingSection")
        .classList.add("hidden");


    const historySection =
        document.getElementById("historySection");

    if (historySection) {
        historySection.classList.add("hidden");
    }


    const parkingMapSection =
        document.getElementById("parkingMapSection");

    if (parkingMapSection) {
        parkingMapSection.classList.add("hidden");
    }


    document
        .getElementById("profileSection")
        .classList.remove("hidden");
}


// ==========================================
// SHOW PARKING
// ==========================================

function showParking() {

    document
        .getElementById("welcomeSection")
        .classList.add("hidden");

    document
        .getElementById("profileSection")
        .classList.add("hidden");


    const historySection =
        document.getElementById("historySection");

    if (historySection) {
        historySection.classList.add("hidden");
    }


    const parkingMapSection =
        document.getElementById("parkingMapSection");

    if (parkingMapSection) {
        parkingMapSection.classList.add("hidden");
    }


    document
        .getElementById("parkingSection")
        .classList.remove("hidden");


    hideAllParkingSections();


    document
        .getElementById("environmentSelection")
        .classList.remove("hidden");
}


// ==========================================
// PARKING HISTORY
// ==========================================

function showParkingHistory() {

    document
        .getElementById("welcomeSection")
        .classList.add("hidden");

    document
        .getElementById("profileSection")
        .classList.add("hidden");

    document
        .getElementById("parkingSection")
        .classList.add("hidden");


    const parkingMapSection =
        document.getElementById("parkingMapSection");

    if (parkingMapSection) {
        parkingMapSection.classList.add("hidden");
    }


    const historySection =
        document.getElementById("historySection");

    if (historySection) {
        historySection.classList.remove("hidden");
    }


    loadParkingHistory();
}


// ==========================================
// LOAD PARKING HISTORY
// ==========================================

function loadParkingHistory() {

    const container =
        document.getElementById("historyContainer");


    if (!container) {
        return;
    }


    const history =
        JSON.parse(
            localStorage.getItem("parkingHistory") || "[]"
        );


    // No history
    if (history.length === 0) {

        container.innerHTML = `

            <div class="no-history">

                <h3>
                    No Parking History
                </h3>

                <p>
                    You haven't completed any
                    parking bookings yet.
                </p>

            </div>

        `;

        return;
    }


    // Show newest booking first
    container.innerHTML =
        history
            .slice()
            .reverse()
            .map(function (item, index) {

                return `

                    <div class="history-card">

                        <div class="history-header">

                            <h3>
                                Parking #${history.length - index}
                            </h3>

                            <span class="history-status">
                                ${item.status}
                            </span>

                        </div>


                        <div class="history-details">

                            <p>
                                <strong>
                                    Bike Number:
                                </strong>

                                ${item.bikeNumber}
                            </p>


                            <p>
                                <strong>
                                    Slot:
                                </strong>

                                ${item.slot}
                            </p>


                            <p>
                                <strong>
                                    Parking Area:
                                </strong>

                                ${item.area}
                            </p>


                            <p>
                                <strong>
                                    Gate:
                                </strong>

                                ${item.gate}
                            </p>


                            <p>
                                <strong>
                                    Vehicle:
                                </strong>

                                ${item.vehicle}
                            </p>


                            <p>
                                <strong>
                                    Fee:
                                </strong>

                                ₹${item.fee}
                            </p>


                            <p>
                                <strong>
                                    Date:
                                </strong>

                                ${item.date}
                            </p>

                        </div>

                    </div>

                `;

            })
            .join("");
}


// ==========================================
// PARKING MAP
// ==========================================

function showParkingMap() {

    document
        .getElementById("welcomeSection")
        .classList.add("hidden");

    document
        .getElementById("profileSection")
        .classList.add("hidden");

    document
        .getElementById("parkingSection")
        .classList.add("hidden");


    const historySection =
        document.getElementById("historySection");

    if (historySection) {
        historySection.classList.add("hidden");
    }


    const mapSection =
        document.getElementById("parkingMapSection");


    if (mapSection) {
        mapSection.classList.remove("hidden");
    }


    loadParkingMap();
}


// ==========================================
// LOAD PARKING MAP
// ==========================================

function loadParkingMap() {

    const container =
        document.getElementById("mapSlotsContainer");


    if (!container) {
        return;
    }


    const occupiedSlots =
        getOccupiedSlots();


    container.innerHTML = "";


    for (let i = 1; i <= TOTAL_SLOTS; i++) {

        const isOccupied =
            occupiedSlots.includes(i);


        const slot =
            document.createElement("div");


        slot.className =
            `map-slot ${
                isOccupied
                    ? "map-occupied"
                    : "map-available"
            }`;


        slot.innerHTML = `

            <div class="map-slot-icon">

                ${
                    isOccupied
                        ? "🚗"
                        : "🅿️"
                }

            </div>

            <strong>
                B${i}
            </strong>

            <span>

                ${
                    isOccupied
                        ? "Occupied"
                        : "Available"
                }

            </span>

        `;


        container.appendChild(slot);
    }
}


// ==========================================
// SELECT ENVIRONMENT
// ==========================================

function selectEnvironment(environment) {

    selectedEnvironment = environment;


    hideAllParkingSections();


    if (environment === "college") {

        const collegeSection =
            document.getElementById(
                "collegeParkingSection"
            );


        if (collegeSection) {

            collegeSection
                .classList
                .remove("hidden");
        }

    }


    else if (environment === "office") {

        const officeSection =
            document.getElementById(
                "officeParkingSection"
            );


        if (officeSection) {

            officeSection
                .classList
                .remove("hidden");
        }
    }
}


// ==========================================
// SELECT PARKING AREA
// ==========================================

function selectParkingArea(area) {

    selectedArea = area;


    hideAllParkingSections();


    const gateSection =
        document.getElementById(
            "gateSelection"
        );


    if (gateSection) {

        gateSection
            .classList
            .remove("hidden");
    }
}


// ==========================================
// SELECT GATE
// ==========================================

function selectGate(gate) {

    selectedGate = gate;


    hideAllParkingSections();


    const vehicleSection =
        document.getElementById(
            "vehicleSelection"
        );


    if (vehicleSection) {

        vehicleSection
            .classList
            .remove("hidden");
    }
}


// ==========================================
// SELECT VEHICLE
// ==========================================

function selectVehicle(vehicle) {

    selectedVehicle = vehicle;


    hideAllParkingSections();


    updateParkingSummary();


    const summarySection =
        document.getElementById(
            "parkingSummarySection"
        );


    if (summarySection) {

        summarySection
            .classList
            .remove("hidden");
    }
}


// ==========================================
// UPDATE PARKING SUMMARY
// ==========================================

function updateParkingSummary() {

    const environmentElement =
        document.getElementById(
            "summaryEnvironment"
        );


    const areaElement =
        document.getElementById(
            "summaryArea"
        );


    const gateElement =
        document.getElementById(
            "summaryGate"
        );


    const vehicleElement =
        document.getElementById(
            "summaryVehicle"
        );


    if (environmentElement) {

        environmentElement.textContent =
            selectedEnvironment || "-";
    }


    if (areaElement) {

        areaElement.textContent =
            selectedArea || "-";
    }


    if (gateElement) {

        gateElement.textContent =
            selectedGate || "-";
    }


    if (vehicleElement) {

        vehicleElement.textContent =
            selectedVehicle || "-";
    }
}


// ==========================================
// SHOW BIKE NUMBER SECTION
// ==========================================

function showBikeNumberSection() {

    hideAllParkingSections();


    const bikeSection =
        document.getElementById(
            "bikeNumberSection"
        );


    if (bikeSection) {

        bikeSection
            .classList
            .remove("hidden");
    }
}


// ==========================================
// SHOW ALL SLOTS
// ==========================================

function showAllSlots() {

    const bikeInput =
        document.getElementById(
            "bikeNumber"
        );


    if (!bikeInput) {
        return;
    }


    const bikeNumber =
        bikeInput.value
            .trim()
            .toUpperCase();


    if (bikeNumber === "") {

        alert(
            "Please enter your bike number."
        );

        return;
    }


    // Save bike number
    localStorage.setItem(
        "bikeNumber",
        bikeNumber
    );


    hideAllParkingSections();


    const slotsSection =
        document.getElementById(
            "allSlotsSection"
        );


    if (slotsSection) {

        slotsSection
            .classList
            .remove("hidden");
    }


    loadParkingSlots();
}


// ==========================================
// GET OCCUPIED SLOTS
// ==========================================

function getOccupiedSlots() {

    return JSON.parse(
        localStorage.getItem(
            "occupiedSlots"
        ) || "[]"
    );
}


// ==========================================
// LOAD PARKING SLOTS
// ==========================================

function loadParkingSlots() {

    const container =
        document.getElementById(
            "slotsContainer"
        );


    if (!container) {
        return;
    }


    const occupiedSlots =
        getOccupiedSlots();


    container.innerHTML = "";


    for (
        let i = 1;
        i <= TOTAL_SLOTS;
        i++
    ) {

        const isOccupied =
            occupiedSlots.includes(i);


        const slot =
            document.createElement("div");


        slot.className =
            `parking-slot ${
                isOccupied
                    ? "occupied"
                    : "available"
            }`;


        slot.innerHTML = `

            <div class="slot-icon">

                ${
                    isOccupied
                        ? "🚗"
                        : "🅿️"
                }

            </div>


            <h3>
                B${i}
            </h3>


            <p>

                ${
                    isOccupied
                        ? "Occupied"
                        : "Available"
                }

            </p>


            <button
                class="slot-button"
                ${
                    isOccupied
                        ? "disabled"
                        : ""
                }
                onclick="bookSlot(${i})"
            >

                ${
                    isOccupied
                        ? "Occupied"
                        : "Book Slot"
                }

            </button>

        `;


        container.appendChild(slot);
    }
}


// ==========================================
// BOOK SLOT
// ==========================================

function bookSlot(slotNumber) {

    const occupiedSlots =
        getOccupiedSlots();


    if (
        occupiedSlots.includes(
            slotNumber
        )
    ) {

        alert(
            "This slot is already occupied."
        );

        return;
    }


    selectedSlot = slotNumber;


    localStorage.setItem(
        "selectedSlot",
        slotNumber
    );


    hideAllParkingSections();


    const confirmationSection =
        document.getElementById(
            "confirmSlotSection"
        );


    if (confirmationSection) {

        confirmationSection
            .classList
            .remove("hidden");
    }


    const selectedSlotElement =
        document.getElementById(
            "selectedSlotNumber"
        );


    if (selectedSlotElement) {

        selectedSlotElement.textContent =
            `B${slotNumber}`;
    }


    showConfirmation();
}


// ==========================================
// SHOW CONFIRMATION
// ==========================================

function showConfirmation() {

    const slotNumber =
        Number(
            localStorage.getItem(
                "selectedSlot"
            )
        );


    if (!slotNumber) {
        return;
    }


    const confirmationSlot =
        document.getElementById(
            "confirmationSlot"
        );


    if (confirmationSlot) {

        confirmationSlot.textContent =
            `B${slotNumber}`;
    }


    const confirmationBike =
        document.getElementById(
            "confirmationBike"
        );


    if (confirmationBike) {

        confirmationBike.textContent =
            localStorage.getItem(
                "bikeNumber"
            ) || "-";
    }
}


// ==========================================
// CONFIRM SLOTTING
// ==========================================

function confirmSlotting() {

    const slotNumber =
        Number(
            localStorage.getItem(
                "selectedSlot"
            )
        );


    if (!slotNumber) {

        alert(
            "Please select a parking slot."
        );

        return;
    }


    let occupiedSlots =
        getOccupiedSlots();


    if (
        occupiedSlots.includes(
            slotNumber
        )
    ) {

        alert(
            "This slot is already occupied."
        );

        return;
    }


    // ======================================
    // ADD SLOT TO OCCUPIED LIST
    // ======================================

    occupiedSlots.push(
        slotNumber
    );


    localStorage.setItem(
        "occupiedSlots",
        JSON.stringify(
            occupiedSlots
        )
    );


    // ======================================
    // SAVE PARKING HISTORY
    // ======================================

    let history =
        JSON.parse(
            localStorage.getItem(
                "parkingHistory"
            ) || "[]"
        );


    history.push({

        bikeNumber:
            localStorage.getItem(
                "bikeNumber"
            ) || "-",

        slot:
            `B${slotNumber}`,

        area:
            selectedArea || "-",

        gate:
            selectedGate || "-",

        vehicle:
            selectedVehicle || "-",

        fee:
            20,

        status:
            "Confirmed",

        date:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        "parkingHistory",
        JSON.stringify(
            history
        )
    );


    // ======================================
    // SERVED VEHICLES
    // ======================================

    let served =
        Number(
            localStorage.getItem(
                "servedVehicles"
            ) || "0"
        );


    served++;


    localStorage.setItem(
        "servedVehicles",
        served
    );


    // ======================================
    // REVENUE
    // ======================================

    let revenue =
        Number(
            localStorage.getItem(
                "totalRevenue"
            ) || "0"
        );


    revenue += 20;


    localStorage.setItem(
        "totalRevenue",
        revenue
    );


    // ======================================
    // SUCCESS MESSAGE
    // ======================================

    alert(
        `B${slotNumber} confirmed successfully!`
    );


    // ======================================
    // RETURN TO SLOT PAGE
    // ======================================

    hideAllParkingSections();


    const slotsSection =
        document.getElementById(
            "allSlotsSection"
        );


    if (slotsSection) {

        slotsSection
            .classList
            .remove("hidden");
    }


    localStorage.removeItem(
        "selectedSlot"
    );


    selectedSlot = "";


    // Refresh slots
    loadParkingSlots();


    // Refresh map
    loadParkingMap();
}


// ==========================================
// BACK TO BIKE NUMBER
// ==========================================

function backToBikeNumber() {

    hideAllParkingSections();


    const section =
        document.getElementById(
            "bikeNumberSection"
        );


    if (section) {

        section
            .classList
            .remove("hidden");
    }
}


// ==========================================
// BACK TO VEHICLE
// ==========================================

function backToVehicle() {

    hideAllParkingSections();


    const section =
        document.getElementById(
            "vehicleSelection"
        );


    if (section) {

        section
            .classList
            .remove("hidden");
    }
}


// ==========================================
// BACK TO GATE
// ==========================================

function backToGate() {

    hideAllParkingSections();


    const section =
        document.getElementById(
            "gateSelection"
        );


    if (section) {

        section
            .classList
            .remove("hidden");
    }
}


// ==========================================
// BACK TO PARKING AREA
// ==========================================

function backToParkingArea() {

    hideAllParkingSections();


    const section =
        document.getElementById(
            "collegeParkingSection"
        );


    if (section) {

        section
            .classList
            .remove("hidden");
    }
}


// ==========================================
// BACK TO ENVIRONMENT
// ==========================================

function backToEnvironment() {

    hideAllParkingSections();


    const section =
        document.getElementById(
            "environmentSelection"
        );


    if (section) {

        section
            .classList
            .remove("hidden");
    }
}


// ==========================================
// SHOW AVAILABLE SLOTS
// ==========================================

function showAvailableSlots() {

    hideAllParkingSections();


    const section =
        document.getElementById(
            "allSlotsSection"
        );


    if (section) {

        section
            .classList
            .remove("hidden");
    }


    loadParkingSlots();
}


// ==========================================
// CONFIRM PARKING
// ==========================================

function confirmParking() {

    confirmSlotting();
}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        "bikeNumber"
    );

    localStorage.removeItem(
        "selectedSlot"
    );


    window.location.href =
        "index.html";
}


// ==========================================
// RESET ALL PARKING SLOTS
// ==========================================

function resetAllSlots() {

    const confirmReset =
        confirm(
            "Are you sure you want to reset all parking slots?"
        );


    if (!confirmReset) {
        return;
    }


    localStorage.removeItem(
        "occupiedSlots"
    );


    loadParkingSlots();


    loadParkingMap();


    alert(
        "All parking slots are now available."
    );
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Hide history
        const historySection =
            document.getElementById(
                "historySection"
            );


        if (historySection) {

            historySection
                .classList
                .add("hidden");
        }


        // Hide parking map
        const parkingMapSection =
            document.getElementById(
                "parkingMapSection"
            );


        if (parkingMapSection) {

            parkingMapSection
                .classList
                .add("hidden");
        }


        // Load parking slots
        const slotsContainer =
            document.getElementById(
                "slotsContainer"
            );


        if (slotsContainer) {

            loadParkingSlots();
        }


        // Load parking map
        const mapContainer =
            document.getElementById(
                "mapSlotsContainer"
            );


        if (mapContainer) {

            loadParkingMap();
        }

    }
);

