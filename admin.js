/* ==========================================
   ADMIN DASHBOARD
========================================== */

const TOTAL_ADMIN_SLOTS = 20;


/* ==========================================
   GET OCCUPIED SLOTS
========================================== */

function getAdminOccupiedSlots() {

    return JSON.parse(
        localStorage.getItem("occupiedSlots") || "[]"
    );

}


/* ==========================================
   SHOW ADMIN SECTION
========================================== */

function showAdminSection(section) {

    const sections = {
        dashboard: "adminDashboard",
        slots: "adminSlots",
        history: "adminHistory",
        users: "adminUsers",
        revenue: "adminRevenueSection"
    };

    Object.values(sections).forEach(function(id) {

        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }

    });


    const selectedSection = document.getElementById(sections[section]);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }


    const titles = {
        dashboard: "Admin Dashboard",
        slots: "Parking Slots",
        history: "Parking History",
        users: "Registered Users",
        revenue: "Revenue"
    };


    document.getElementById("pageTitle").textContent =
        titles[section];


    document.querySelectorAll(".sidebar-btn").forEach(function(button) {

        button.classList.remove("active");

    });


    if (section === "dashboard") {

        loadAdminDashboard();

    }

    else if (section === "slots") {

        loadAdminSlots();

    }

    else if (section === "history") {

        loadAdminHistory();

    }

    else if (section === "users") {

        loadAdminUsers();

    }

    else if (section === "revenue") {

        loadAdminRevenue();

    }

}


/* ==========================================
   DASHBOARD
========================================== */

function loadAdminDashboard() {

    const occupiedSlots = getAdminOccupiedSlots();

    const occupied = occupiedSlots.length;

    const available =
        TOTAL_ADMIN_SLOTS - occupied;


    const served =
        Number(
            localStorage.getItem("servedVehicles") || "0"
        );


    const revenue =
        Number(
            localStorage.getItem("totalRevenue") || "0"
        );


    document.getElementById("adminTotalSlots").textContent =
        TOTAL_ADMIN_SLOTS;

    document.getElementById("adminAvailableSlots").textContent =
        available;

    document.getElementById("adminOccupiedSlots").textContent =
        occupied;

    document.getElementById("adminVehiclesServed").textContent =
        served;

    document.getElementById("adminRevenue").textContent =
        "₹" + revenue;


    loadDashboardSlotPreview();

}


/* ==========================================
   DASHBOARD SLOT PREVIEW
========================================== */

function loadDashboardSlotPreview() {

    const container =
        document.getElementById("dashboardSlotPreview");

    if (!container) return;


    const occupiedSlots =
        getAdminOccupiedSlots();


    container.innerHTML = "";


    for (let i = 1; i <= TOTAL_ADMIN_SLOTS; i++) {

        const slot =
            document.createElement("div");


        const occupied =
            occupiedSlots.includes(i);


        slot.className =
            "preview-slot " +
            (occupied
                ? "preview-occupied"
                : "preview-available");


        slot.textContent =
            "B" + i;


        container.appendChild(slot);

    }

}


/* ==========================================
   PARKING SLOTS
========================================== */

function loadAdminSlots() {

    const container =
        document.getElementById("adminSlotsContainer");

    if (!container) return;


    const occupiedSlots =
        getAdminOccupiedSlots();


    container.innerHTML = "";


    for (let i = 1; i <= TOTAL_ADMIN_SLOTS; i++) {

        const occupied =
            occupiedSlots.includes(i);


        const slot =
            document.createElement("div");


        slot.className =
            "admin-slot " +
            (occupied ? "occupied" : "available");


        slot.innerHTML = `

            <div class="admin-slot-icon">
                ${occupied ? "🚗" : "🅿️"}
            </div>

            <h3>B${i}</h3>

            <p>
                ${occupied ? "Occupied" : "Available"}
            </p>

            ${
                occupied
                ?
                `<button
                    class="slot-action clear"
                    onclick="clearAdminSlot(${i})">
                    Clear Slot
                </button>`
                :
                `<span>Ready for parking</span>`
            }

        `;


        container.appendChild(slot);

    }

}


/* ==========================================
   CLEAR INDIVIDUAL SLOT
========================================== */

function clearAdminSlot(slotNumber) {

    const confirmClear =
        confirm(
            "Do you want to make B" +
            slotNumber +
            " available?"
        );


    if (!confirmClear) return;


    let occupiedSlots =
        getAdminOccupiedSlots();


    occupiedSlots =
        occupiedSlots.filter(function(slot) {

            return slot !== slotNumber;

        });


    localStorage.setItem(
        "occupiedSlots",
        JSON.stringify(occupiedSlots)
    );


    loadAdminSlots();

    loadAdminDashboard();


    alert(
        "B" +
        slotNumber +
        " is now available."
    );

}


/* ==========================================
   PARKING HISTORY
========================================== */

function loadAdminHistory() {

    const container =
        document.getElementById(
            "adminHistoryContainer"
        );


    if (!container) return;


    const history =
        JSON.parse(
            localStorage.getItem(
                "parkingHistory"
            ) || "[]"
        );


    if (history.length === 0) {

        container.innerHTML = `

            <div class="history-card">

                <h3>No Parking History</h3>

                <p>
                    No parking bookings have been
                    completed yet.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        history
        .slice()
        .reverse()
        .map(function(item, index) {

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
                            <strong>Bike:</strong>
                            ${item.bikeNumber}
                        </p>

                        <p>
                            <strong>Slot:</strong>
                            ${item.slot}
                        </p>

                        <p>
                            <strong>Area:</strong>
                            ${item.area}
                        </p>

                        <p>
                            <strong>Gate:</strong>
                            ${item.gate}
                        </p>

                        <p>
                            <strong>Vehicle:</strong>
                            ${item.vehicle}
                        </p>

                        <p>
                            <strong>Fee:</strong>
                            ₹${item.fee}
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${item.date}
                        </p>

                    </div>

                </div>

            `;

        })
        .join("");

}


/* ==========================================
   USERS
========================================== */

function loadAdminUsers() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "parkingHistory"
            ) || "[]"
        );


    const container =
        document.getElementById(
            "adminUsersContainer"
        );


    const userCount =
        document.getElementById(
            "adminUserCount"
        );


    if (!container) return;


    const users = {};


    history.forEach(function(item) {

        if (item.bikeNumber) {

            users[item.bikeNumber] = item;

        }

    });


    const userList =
        Object.keys(users);


    userCount.textContent =
        userList.length +
        " parking user(s) found";


    if (userList.length === 0) {

        container.innerHTML = `

            <div class="history-card">

                <p>
                    No users have completed parking yet.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        userList.map(function(bikeNumber) {

            const user =
                users[bikeNumber];


            return `

                <div class="history-card">

                    <div class="history-header">

                        <h3>👤 ${bikeNumber}</h3>

                        <span class="history-status">
                            Parking User
                        </span>

                    </div>

                    <div class="history-details">

                        <p>
                            <strong>Vehicle:</strong>
                            ${user.vehicle}
                        </p>

                        <p>
                            <strong>Last Slot:</strong>
                            ${user.slot}
                        </p>

                        <p>
                            <strong>Area:</strong>
                            ${user.area}
                        </p>

                    </div>

                </div>

            `;

        })
        .join("");

}


/* ==========================================
   REVENUE
========================================== */

function loadAdminRevenue() {

    const revenue =
        Number(
            localStorage.getItem(
                "totalRevenue"
            ) || "0"
        );


    document.getElementById(
        "revenueTotal"
    ).textContent =
        "₹" + revenue;

}


/* ==========================================
   RESET PARKING
========================================== */

function resetParking() {

    const confirmReset =
        confirm(
            "Are you sure you want to make all parking slots available?"
        );


    if (!confirmReset) return;


    localStorage.removeItem(
        "occupiedSlots"
    );


    loadAdminDashboard();

    loadAdminSlots();


    alert(
        "All parking slots are now available."
    );

}


/* ==========================================
   ADMIN LOGOUT
========================================== */

function adminLogout() {

    const confirmLogout =
        confirm(
            "Do you want to logout from Admin Panel?"
        );


    if (!confirmLogout) return;


    window.location.href =
        "index.html";

}


/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadAdminDashboard();

    }
);