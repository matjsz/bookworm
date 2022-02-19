import { auth } from './auth'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { db } from './db';
import { doc, getDoc, setDoc } from "firebase/firestore";

const createEmailUser = async(email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    updateProfile(auth.currentUser, {
        displayName: "Leitor",
        photoURL: 'https://avatars.dicebear.com/api/adventurer-neutral/'+user.uid+'.svg'
    })

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

    return user
}

export { createEmailUser }