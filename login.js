import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Function
document.getElementById("rand").addEventListener("click", async function (e) {
    e.preventDefault();
    
    console.log("hello")
    // Disable the submit button to prevent multiple submissions
    const loginButton = document.getElementById("rand");
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    // Get email and password
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;

    try{
        const userCredential=await signInWithEmailAndPassword(auth,email,password);

        const user = userCredential.user;

                // Redirect to homepage or another page
        window.location.href = "studashboard.html";

    }catch(error){
        const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error code:", errorCode);  // Check if the error code is as expected
            console.log("Error message:", errorMessage);
            
            if (errorCode === 'auth/wrong-password') {
                alert("Incorrect password. Please try again.");
            } else if (errorCode === 'auth/user-not-found') {
                alert("User not found. Please check your email.");
            } else {
                alert("Login failed: " + errorMessage);
            }
            console.error("Error:", errorMessage);
    }finally{
            // Re-enable the submit button
            loginButton.disabled = false;
            loginButton.textContent = "Log In";
    }
});
