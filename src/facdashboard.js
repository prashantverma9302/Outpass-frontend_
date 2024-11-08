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
const colRef_requests = collection(db,'requests')
const q = query(colRef_requests,where('status','==','pending'))

onSnapshot(q,(snapshot) => {  //function to store requests in session storage
    let requests = []
    console.log(snapshot)
    snapshot.docs.forEach((doc) => {
        requests.push({...doc.data(), id: doc.id })
    })
    console.log(requests)
    sessionStorage.clear()
    sessionStorage.setItem('requests',JSON.stringify(requests))

})