// Import Firebase configuration and necessary modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase app and auth service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handling form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate password match
    if (!validatePassword()) {
        return; // Stop submission if passwords do not match
    }

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Additional form data
    // const name = document.getElementById('name').value;
    // const dob = document.getElementById('dob').value;
    // const gender = document.getElementById('gender').value;
    // const hostel = document.getElementById('hostel').value;
    // const apartment = document.getElementById('apartment').value;
    // const room = document.getElementById('room').value;
    // const enroll = document.getElementById('enroll').value;
    // const dept = document.getElementById('dept').value;
    // const year = document.getElementById('year').value;
    // const coordinator = document.getElementById('coordinator').value;
    // const hostelIncharge = document.getElementById('hostelIncharge').value;
    // const phone = document.getElementById('phone').value;
    // const parentPhone = document.getElementById('parentPhone').value;
    // const praddress = document.getElementById('praddress').value;

    try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully:", userCredential.user);

        // After successful sign-up, additional information could be stored in Firestore or another database

        // Redirect to the login page or show success message
        alert("Sign-up successful!");
        window.location.href = "homelogin.html";
    } catch (error) {
        console.error("Error during sign-up:", error.code, error.message);
        alert("Error: " + error.message);
    }
});

// Password validation function
function validatePassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}
