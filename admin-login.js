/* ==========================================
   ADMIN LOGIN
========================================== */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


document
    .getElementById("adminLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const username =
            document
                .getElementById("adminUsername")
                .value
                .trim();


        const password =
            document
                .getElementById("adminPassword")
                .value;


        const message =
            document.getElementById("loginMessage");


        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            message.textContent =
                "Login successful! Redirecting...";


            message.style.color =
                "#218838";


            setTimeout(function() {

                window.location.href =
                    "admin.html";

            }, 700);

        }

        else {

            message.textContent =
                "Invalid admin username or password.";

            message.style.color =
                "#c62828";

        }

    });


/* ==========================================
   BACK TO USER LOGIN
========================================== */

function goBack() {

    window.location.href =
        "index.html";

}