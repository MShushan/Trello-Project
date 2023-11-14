import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyD7G0DswYw2HYcUJhs7bpCKH1fr-NxmSpo",
    authDomain: "trello-clone-2412e.firebaseapp.com",
    projectId: "trello-clone-2412e",
    storageBucket: "trello-clone-2412e.appspot.com",
    messagingSenderId: "324984750158",
    appId: "1:324984750158:web:d66aa4ee6b5daf0dd5831f",
    measurementId: "G-YQWV6E2M0G"
};


export default initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, app }