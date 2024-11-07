import {
    initializeApp
} from 'firebase/app'
import {
    getFirestore,collection,getDocs,
    addDoc,onSnapshot,
    query,where,
} from 'firebase/firestore'
import { firebaseConfig } from "./firebase-config.js";
//init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef_users = collection(db,'users')

// Redirect page
function handleSubmit(event) {
    if (!validatePassword()) {
        event.preventDefault(); // Prevent form submission
    } else {
        window.location.href = "homelogin.html"; // Redirect to the home login page
    }
}

// Add document

const addForm = document.querySelector('.addDoc')
addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef_users, {
        name: addForm.name.value,
        gender: addForm.gender.value,
        hostel_no: addForm.hostel.value,
        appartment_no: addForm.apartment.value,
        roomno: addForm.room.value,
        enrollment_no: addForm.enroll.value,
        dept: addForm.dept.value,
        year: addForm.year.value,
        email_id: addForm.email.value,
        stud_mobile: addForm.phone.value,
        parent_mobile: addForm.parentPhone.value,
        role: 'stud',

    })
    .then(() => {
        addForm.reset()
        handleSubmit(e)

    })


})

// Delete Document

