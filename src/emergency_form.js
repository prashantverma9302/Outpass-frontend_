
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


const emergencyRequestForm = document.querySelector('.emergency-form')
console.log(emergencyRequestForm)
emergencyRequestForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef_requests, {
        name: document.getElementById('name').value,
        reason: document.getElementById('reason').value,
        leaveDateTime: document.getElementById('leaveDate').value,
        // returnDateTime: document.getElementById('returnDate').value,
        remarks: document.getElementById('remarks').value, 
        hostel: document.getElementById('hostel').value,
        appartment: document.getElementById('appartment').value,
        emergency: true,
        status: "approved",
        stud_id: "studdoc.id",
        app_date: ""
    })
    emergencyRequestForm.reset()
})