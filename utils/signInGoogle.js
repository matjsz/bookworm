import { auth } from './auth'
import { GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { db } from './db';
import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const signInWithGoogle = async() => {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const docRef = doc(db, 'readers', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return user
    } else {
        await setDoc(doc(db, 'readers', user.uid), {
            authors: [],
            genres: [],
            completed: [],
            reading: [],
            wantTo: [],
            started: false
        })   

        await sendEmailVerification(auth.currentUser)

        return user
    }
}

export { signInWithGoogle }