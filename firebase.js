import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBrQdb3PIMQIDJbIx_JzpZbafizudhKMk8",
  authDomain: "graduation-ticket-system-85442.firebaseapp.com",
  projectId: "graduation-ticket-system-85442",
  storageBucket: "graduation-ticket-system-85442.firebasestorage.app",
  messagingSenderId: "1041398746179",
  appId: "1:1041398746179:web:f075de81cab92f496d98f6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };