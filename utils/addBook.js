import { db } from './db';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const addBookToUser = async(uid, where, bookData) => {
    const docRef = doc(db, 'readers', uid)
    
    if(where == 'reading'){
        await updateDoc(docRef, {
            reading: arrayUnion(bookData)
        })
    } else if(where == 'completed'){
        await updateDoc(docRef, {
            completed: arrayUnion(bookData)
        })
    } else if(where == 'wantTo'){
        await updateDoc(docRef, {
            wantTo: arrayUnion(bookData)
        })
    }
}

export { addBookToUser }