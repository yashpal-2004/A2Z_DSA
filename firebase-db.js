import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBQF_MD3goWyEdF-CLKbIS6yStN9yD_ypg",
    authDomain: "dsa-450-4fa5e.firebaseapp.com",
    projectId: "dsa-450-4fa5e",
    storageBucket: "dsa-450-4fa5e.firebasestorage.app",
    messagingSenderId: "363783581030",
    appId: "1:363783581030:web:4b354091054db1c151eca7",
    measurementId: "G-5E57MSK5ZL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// User identity stored in localStorage (not data — just an ID)
export function getOrCreateUserId() {
    return 'shared_global_user';
}

// Fetch progress document for a user
export async function fetchUserProgress(userId) {
    const snap = await getDoc(doc(db, 'users', userId));
    return snap.exists() ? snap.data() : null;
}

// Persist full progress to Firestore (overwrites)
export async function saveUserProgress(userId, completed, lcSolved) {
    await setDoc(doc(db, 'users', userId), {
        completed,
        lcSolved,
        lastUpdated: new Date(),
    });
}
