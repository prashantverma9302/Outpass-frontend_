import {
    initializeApp
} from 'firebase/app'
import {
    getFirestore,collection,getDocs,
    addDoc,
} from 'firebase/firestore'
import { firebaseConfig } from "./firebase-config.js";

//init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef_requests = collection(db,'requests')
var dets = sessionStorage.getItem('user_details')
const user_details = JSON.parse(dets)
console.log(user_details.uid)

// function submitForm(event) {
//     event.preventDefault();  // Prevent default form submission behavior
    

// }

// Add document

const addRequestForm = document.querySelector('.leave-form')
addRequestForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef_requests, {
        name: document.getElementById('name').value,
        location: document.getElementById('address').value,
        reason: document.getElementById('reason').value,
        leaveDateTime: document.getElementById('leaveDate').value,
        returnDateTime: document.getElementById('returnDate').value,
        remarks: document.getElementById('remarks').value,
        dept: document.getElementById('dept').value,
        year: document.getElementById('year').value, 
        hostel: document.getElementById('hostel').value,
        appartment: document.getElementById('appartment').value,
        emergency: false,
        status: "pending",
        stud_id: `${user_details.uid}`,
        app_date: ""
    })

    // Collect the form data
    const formData = {
        name: document.getElementById('name').value,
        gender: document.getElementById('gender').value,
        hostel: document.getElementById('hostel').value,
        apartment: document.getElementById('appartment').value,
        room: document.getElementById('room').value,
        enroll: document.getElementById('enroll').value,
        dept: document.getElementById('dept').value,
        year: document.getElementById('year').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        parentPhone: document.getElementById('parentPhone').value,
        outside: document.querySelector('input[name="outside"]:checked').value,
        address: document.getElementById('address').value,
        reason: document.getElementById('reason').value,
        leaveDate: document.getElementById('leaveDate').value,
        returnDate: document.getElementById('returnDate').value,
        remarks: document.getElementById('remarks').value,
    };

    // Store the form data in localStorage to access it on the submitted.html page
    localStorage.setItem('leaveData', JSON.stringify(formData));

    //clear the form
    addRequestForm.reset()

    // Redirect to the submitted page
    window.location.href = "submitted.html";
    // submitForm(e)
    // window.location.href = "studashboard.html";



})

