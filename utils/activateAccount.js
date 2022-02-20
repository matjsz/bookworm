import { db } from './db';
import { doc, updateDoc } from "firebase/firestore";

const activateAccount = async(uid, genres, authors) => {
    const docRef = doc(db, 'readers', uid)
    
    await updateDoc(docRef, {
        started: true,
        genres: genres,
        authors: authors
    })
}

export { activateAccount }