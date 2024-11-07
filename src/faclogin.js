import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from "./firebase-config.js";
import {
    getFirestore,collection,getDocs,
    addDoc,onSnapshot,
    query,where,
    getDoc,
} from 'firebase/firestore'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore()

// collection ref
const colRef_users = collection(db,'users')



// Login Function
document.getElementById("rand1").addEventListener("click", async function (e) {
    e.preventDefault();
    
    console.log("logged in")
    // Disable the submit button to prevent multiple submissions
    const loginButton = document.getElementById("rand1");
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    // Get email and password
    const email = document.getElementById("facultyMail").value;
    const password = document.getElementById("facultyPassword").value;
    




    try{
        const userCredential=await signInWithEmailAndPassword(auth,email,password);

        const user = userCredential.user;
        const q = query(colRef_users,where('email_id','==', `${email}`)) ;
        onSnapshot(q,(snapshot) => {

            let requests = []
            console.log(snapshot)
            snapshot.docs.forEach((doc) => {
                requests.push({...doc.data(), id: doc.id })
            })
            console.log(requests)
            if (requests[0].role === 'admin'){
                console.log("Yes")
                window.location.href = "facdashboard.html";
            }

            else{
                alert("Credentials Not Verified!!")
            }
        })
        // Redirect to homepage or another page

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