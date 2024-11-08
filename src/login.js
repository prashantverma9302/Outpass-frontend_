import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from "./firebase-config.js";
import {
    getFirestore,collection, onSnapshot, getDocs,
    query,where,
} from 'firebase/firestore'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore()

// collection ref
const colRef_users = collection(db,'users')

// Login Function
document.getElementById("rand").addEventListener("click", async function (e) {
    e.preventDefault();
    
    console.log("logged in")
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
        const q = query(colRef_users,where('email_id','==', `${email}`)) ;
        onSnapshot(q,(snapshot) => {

            let details = []
            console.log(snapshot)
            snapshot.docs.forEach((doc) => {
                details.push({...doc.data(), id: doc.id, uid: user.uid })
            })
            console.log(details)
            if (details[0].role === 'stud'){
                // console.log(details[0].uid)
                sessionStorage.clear()
                sessionStorage.setItem('user_details',JSON.stringify(details[0]))

                // Redirect to homepage or another page
                // console.log(user.uid)
                window.location.href = "studashboard.html";

            }

            else{
                alert("Credentials Not Verified!!")
            }
        })

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
