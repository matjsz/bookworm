import { db } from './db';
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

const removeBookFromUser = async(uid, where, bookData) => {
    const docRef = doc(db, 'readers', uid)
    
    if(where == 'reading'){
        await updateDoc(docRef, {
            reading: arrayRemove(bookData)
        })
    } else if(where == 'completed'){
        await updateDoc(docRef, {
            completed: arrayRemove(bookData)
        })
    } else if(where == 'wantTo'){
        await updateDoc(docRef, {
            wantTo: arrayRemove(bookData)
        })
    }
}

export { removeBookFromUser }