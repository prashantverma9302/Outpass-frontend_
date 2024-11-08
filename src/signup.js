// Import Firebase configuration and necessary modules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, } from 'firebase/auth';
import { firebaseConfig } from "./firebase-config.js";
import {
    getFirestore,collection,getDocs,
    addDoc,onSnapshot,
    query,where,
} from 'firebase/firestore'

// Initialize Firebase app and auth service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// init services
const db = getFirestore()

// collection ref
const colRef_users = collection(db,'users')

// Handling form submission
const addForm = document.querySelector('.addDoc')
addForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate password match
    if (!validatePassword()) {
        return; // Stop submission if passwords do not match
    }

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Additional form data
    const name = document.getElementById('name').value;
    // const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const hostel = document.getElementById('hostel').value;
    const appartment = document.getElementById('appartment').value;
    const room = document.getElementById('room').value;
    const enroll = document.getElementById('enroll').value;
    const dept = document.getElementById('dept').value;
    const year = document.getElementById('year').value;
    // const coordinator = document.getElementById('coordinator').value;
    // const hostelIncharge = document.getElementById('hostelIncharge').value;
    const phone = document.getElementById('phone').value;
    const parentPhone = document.getElementById('parentPhone').value;
    // const praddress = document.getElementById('praddress').value;

    try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully:", userCredential.user);

        // After successful sign-up, firestore will be updated

        addDoc(colRef_users, {
            name: name,
            gender: gender,
            hostel_no: hostel,
            appartment_no: appartment,
            roomno: room,
            enrollment_no: enroll,
            dept: dept,
            year: year,
            email_id: email,
            stud_mobile: phone,
            parent_mobile: parentPhone,
            role: 'stud',
    
        })        
        .then(() => {
            // Redirect to the login page or show success message
            alert("Sign-up successful!");
            window.location.href = "homelogin.html";
        })
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
