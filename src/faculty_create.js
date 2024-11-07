import {
    initializeApp
} from 'firebase/app'
import {
    getFirestore,collection,getDocs,
    addDoc,
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBNv1ehBbnU0qc8_gz_Yog2iTQxJ8k3I9g",
    authDomain: "exitease-8fc92.firebaseapp.com",
    databaseURL: "https://exitease-8fc92-default-rtdb.firebaseio.com",
    projectId: "exitease-8fc92",
    storageBucket: "exitease-8fc92.firebasestorage.app",
    messagingSenderId: "639228933337",
    appId: "1:639228933337:web:cfe5d6a353bf38f0363ac8",
    measurementId: "G-QK8ZW2P3H1"
};

//init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef_requests = collection(db,'users')

// Add document

const addFacForm = document.querySelector('.addFacDoc')
addFacForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef_requests, {
        name: addFacForm.facultyName.value,
        fac_id: addFacForm.facultyID.value,
        dept: addFacForm.facultyDept.value,
        email_id: addFacForm.facultyEmail.value,
        fac_mobile: addFacForm.facultyPhone.value,
        role: 'admin', // role of user

    })
    .then(() => {
        addFacForm.reset()
        handleSubmit(e)

    })


})