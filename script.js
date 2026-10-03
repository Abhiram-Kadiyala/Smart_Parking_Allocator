// ==========================================
// SMART PARKING - LOGIN SCRIPT
// ==========================================

// Current selected role
let currentRole = "user";

// Demo OTP values
let loginOTP = "";
let signupOTP = "";


// ==========================================
// SELECT USER / ADMINISTRATION
// ==========================================

function selectRole(role) {

    currentRole = role;

    const userBtn = document.getElementById("userBtn");
    const adminBtn = document.getElementById("adminBtn");

    const loginPhoneBox = document.getElementById("loginPhoneBox");
    const signupPhoneBox = document.getElementById("signupPhoneBox");

    const loginOtpBox = document.getElementById("loginOtpBox");
    const signupOtpBox = document.getElementById("signupOtpBox");

    const loginIdLabel = document.getElementById("loginIdLabel");
    const signupIdLabel = document.getElementById("signupIdLabel");

    // Clear login fields
    document.getElementById("loginId").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginPhone").value = "";
    document.getElementById("loginOtp").value = "";

    loginOTP = "";

    loginOtpBox.classList.add("hidden");
    document.getElementById("loginOtpMessage").textContent = "";

    // Clear signup fields
    document.getElementById("signupId").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("signupConfirmPassword").value = "";
    document.getElementById("signupPhone").value = "";
    document.getElementById("signupOtp").value = "";

    signupOTP = "";

    signupOtpBox.classList.add("hidden");
    document.getElementById("signupOtpMessage").textContent = "";


    // ==========================================
    // USER
    // ==========================================

    if (role === "user") {

        userBtn.classList.add("active");
        adminBtn.classList.remove("active");

        // Hide admin fields
        loginPhoneBox.classList.add("hidden");
        signupPhoneBox.classList.add("hidden");

        loginOtpBox.classList.add("hidden");
        signupOtpBox.classList.add("hidden");

        // Change labels
        loginIdLabel.textContent = "Register ID Number";
        signupIdLabel.textContent = "Register ID Number";
    }


    // ==========================================
    // ADMINISTRATION
    // ==========================================

    else {

        adminBtn.classList.add("active");
        userBtn.classList.remove("active");

        // Show admin fields
        loginPhoneBox.classList.remove("hidden");
        signupPhoneBox.classList.remove("hidden");

        // Change labels
        loginIdLabel.textContent = "Administrator ID";
        signupIdLabel.textContent = "Administrator ID";
    }
}


// ==========================================
// SHOW SIGNUP
// ==========================================

function showSignup() {

    document.getElementById("loginForm")
        .classList.add("hidden");

    document.getElementById("signupForm")
        .classList.remove("hidden");
}


// ==========================================
// SHOW LOGIN
// ==========================================

function showLogin() {

    document.getElementById("signupForm")
        .classList.add("hidden");

    document.getElementById("loginForm")
        .classList.remove("hidden");
}


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";
        button.textContent = "🙈";

    } else {

        input.type = "password";
        button.textContent = "👁";
    }
}


// ==========================================
// GENERATE DEMO OTP
// ==========================================

function generateOTP() {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();
}


// ==========================================
// SEND OTP
// ==========================================

function sendOTP(type) {

    let phone;


    // ==========================================
    // ADMIN LOGIN OTP
    // ==========================================

    if (type === "login") {

        phone = document.getElementById("loginPhone")
            .value
            .trim();

        if (phone === "") {

            alert("Please enter your phone number.");
            return;
        }

        if (phone.length < 10) {

            alert("Please enter a valid phone number.");
            return;
        }

        // Generate OTP
        loginOTP = generateOTP();

        // Show OTP field
        document.getElementById("loginOtpBox")
            .classList.remove("hidden");

        // Show demo OTP
        document.getElementById("loginOtpMessage")
            .textContent = "Demo OTP: " + loginOTP;

        alert("Demo OTP generated: " + loginOTP);
    }


    // ==========================================
    // ADMIN SIGNUP OTP
    // ==========================================

    else {

        phone = document.getElementById("signupPhone")
            .value
            .trim();

        if (phone === "") {

            alert("Please enter your phone number.");
            return;
        }

        if (phone.length < 10) {

            alert("Please enter a valid phone number.");
            return;
        }

        // Generate OTP
        signupOTP = generateOTP();

        // Show OTP field
        document.getElementById("signupOtpBox")
            .classList.remove("hidden");

        // Show demo OTP
        document.getElementById("signupOtpMessage")
            .textContent = "Demo OTP: " + signupOTP;

        alert("Demo OTP generated: " + signupOTP);
    }
}


// ==========================================
// LOGIN
// ==========================================

function login() {

    const id = document.getElementById("loginId")
        .value
        .trim();

    const password = document.getElementById("loginPassword")
        .value;


    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (id === "" || password === "") {

        alert("Please enter all required fields.");
        return;
    }


    // ==========================================
    // USER LOGIN
    // ==========================================

    if (currentRole === "user") {

        const users = JSON.parse(
            localStorage.getItem("smartParkingUsers")
        ) || [];


        // Search for user
        const user = users.find(
            account => account.id === id
        );


        // Account doesn't exist
        if (!user) {

            alert("Account not found. Please sign up first.");
            return;
        }


        // Password doesn't match
        if (user.password !== password) {

            alert("Incorrect password.");
            return;
        }


        // Successful user login
        alert("Login successful!");


        // Save login information
        localStorage.setItem(
            "smartParkingLoginRole",
            "user"
        );

        localStorage.setItem(
            "smartParkingLoginId",
            id
        );


        // Go to dashboard
        window.location.href = "dashboard.html";

        return;
    }


    // ==========================================
    // ADMINISTRATION LOGIN
    // ==========================================

    if (currentRole === "admin") {

        const phone = document.getElementById("loginPhone")
            .value
            .trim();

        const otp = document.getElementById("loginOtp")
            .value
            .trim();


        // Check phone
        if (phone === "") {

            alert("Please enter your phone number.");
            return;
        }


        // Check OTP generated
        if (loginOTP === "") {

            alert("Please click Send OTP.");
            return;
        }


        // Check OTP
        if (otp !== loginOTP) {

            alert("Invalid OTP.");
            return;
        }


        // Get admin accounts
        const admins = JSON.parse(
            localStorage.getItem("smartParkingAdmins")
        ) || [];


        // Search for admin
        const admin = admins.find(
            account => account.id === id
        );


        // Admin doesn't exist
        if (!admin) {

            alert(
                "Administrator account not found. Please sign up first."
            );

            return;
        }


        // Check phone
        if (admin.phone !== phone) {

            alert("Phone number does not match.");
            return;
        }


        // Check password
        if (admin.password !== password) {

            alert("Incorrect password.");
            return;
        }


        // Successful admin login
        alert("Administration login successful!");


        // Save login information
        localStorage.setItem(
            "smartParkingLoginRole",
            "admin"
        );

        localStorage.setItem(
            "smartParkingLoginId",
            id
        );


        // Go to dashboard
        window.location.href = "dashboard.html";

        return;
    }
}


// ==========================================
// SIGN UP
// ==========================================

function signup() {

    const id = document.getElementById("signupId")
        .value
        .trim();

    const password = document.getElementById("signupPassword")
        .value;

    const confirmPassword =
        document.getElementById("signupConfirmPassword")
            .value;


    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (
        id === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all required fields.");
        return;
    }


    // ==========================================
    // PASSWORD MATCH
    // ==========================================

    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;
    }


    // ==========================================
    // USER SIGNUP
    // ==========================================

    if (currentRole === "user") {

        let users = JSON.parse(
            localStorage.getItem("smartParkingUsers")
        ) || [];


        // Check existing user
        const existingUser = users.find(
            account => account.id === id
        );


        if (existingUser) {

            alert(
                "This Register ID already has an account."
            );

            return;
        }


        // Create user account
        const newUser = {
            id: id,
            password: password
        };


        users.push(newUser);


        // Save users
        localStorage.setItem(
            "smartParkingUsers",
            JSON.stringify(users)
        );


        alert(
            "User account created successfully! Please login."
        );


        // Clear signup fields
        clearSignupFields();


        // Go back to login
        showLogin();

        return;
    }


    // ==========================================
    // ADMINISTRATION SIGNUP
    // ==========================================

    if (currentRole === "admin") {

        const phone = document.getElementById("signupPhone")
            .value
            .trim();

        const otp = document.getElementById("signupOtp")
            .value
            .trim();


        // Check phone
        if (phone === "") {

            alert("Please enter your phone number.");
            return;
        }


        // Check OTP generated
        if (signupOTP === "") {

            alert("Please click Send OTP.");
            return;
        }


        // Check OTP
        if (otp !== signupOTP) {

            alert("Invalid OTP.");
            return;
        }


        // Get admin accounts
        let admins = JSON.parse(
            localStorage.getItem("smartParkingAdmins")
        ) || [];


        // Check existing admin
        const existingAdmin = admins.find(
            account => account.id === id
        );


        if (existingAdmin) {

            alert(
                "This Administrator ID already has an account."
            );

            return;
        }


        // Create admin account
        const newAdmin = {
            id: id,
            phone: phone,
            password: password
        };


        admins.push(newAdmin);


        // Save admins
        localStorage.setItem(
            "smartParkingAdmins",
            JSON.stringify(admins)
        );


        alert(
            "Administrator account created successfully! Please login."
        );


        // Clear signup fields
        clearSignupFields();


        // Go back to login
        showLogin();

        return;
    }
}


// ==========================================
// CLEAR SIGNUP FIELDS
// ==========================================

function clearSignupFields() {

    document.getElementById("signupId")
        .value = "";

    document.getElementById("signupPassword")
        .value = "";

    document.getElementById("signupConfirmPassword")
        .value = "";

    document.getElementById("signupPhone")
        .value = "";

    document.getElementById("signupOtp")
        .value = "";


    // Hide OTP
    document.getElementById("signupOtpBox")
        .classList.add("hidden");


    // Clear OTP message
    document.getElementById("signupOtpMessage")
        .textContent = "";


    // Reset OTP
    signupOTP = "";
}