import {
    initializeApp
} from 'firebase/app'
import {
    getFirestore,collection,getDocs,onSnapshot
} from 'firebase/firestore'
import { firebaseConfig } from "./firebase-config.js";
//init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef_requests = collection(db,'requests')

// count pending


// get collection data
// getDocs(colRef_requests)
//     .then(snapshot => {
//         let requests = []
//         console.log(snapshot)
//         snapshot.docs.forEach((doc) => {
//             requests.push({...doc.data(), id: doc.id })
//         })
//         console.log(requests)
//         requests.forEach((e) => {
//             if (e["status"] === "pending"){
//                 cnt_pend+= 1
//                 document.getElementById('cnt-pending').innerText = cnt_pend
//             }
//             else if (e["status"] === "approved"){
//                 cnt_app+= 1
//                 document.getElementById('cnt-approved').innerText = cnt_app
                
//             }
//             else if(e["status"] === "rejected"){
//                 cnt_rej+= 1
//                 document.getElementById('cnt-rejected').innerText = cnt_rej
//             }
//         })
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

onSnapshot(colRef_requests,(snapshot) => {
    var cnt_pend = 0
    var cnt_app  = 0
    var cnt_rej = 0

    let requests = []
    console.log(snapshot)
    snapshot.docs.forEach((doc) => {
        requests.push({...doc.data(), id: doc.id })
    })
    console.log(requests)
    requests.forEach((e) => {
        if (e["status"] === "pending"){
            cnt_pend+= 1
            document.getElementById('cnt-pending').innerText = cnt_pend
        }
        else if (e["status"] === "approved"){
            cnt_app+= 1
            document.getElementById('cnt-approved').innerText = cnt_app
            
        }
        else if(e["status"] === "rejected"){
            cnt_rej+= 1
            document.getElementById('cnt-rejected').innerText = cnt_rej
        }
    })
})



