import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
    apiKey: "AIzaSyBtU0dWn-vIfnoPstCQUvWZgqA-Letqkfw",
    authDomain: "bookworm-d0305.firebaseapp.com",
    projectId: "bookworm-d0305",
    storageBucket: "bookworm-d0305.appspot.com",
    messagingSenderId: "167365831290",
    appId: "1:167365831290:web:b81e589231d5a5ed06a9c3",
    measurementId: "G-W4C8Q75VF6"
}

const app = initializeApp(config);
const auth = getAuth();

export { auth } 