import { db } from './db';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const followAuthor = async(uid, bookData) => {
    const docRef = doc(db, 'readers', uid)
    
    if(bookData.volumeInfo.authors.length > 1){
        for(let author in bookData.volumeInfo.authors){
            await updateDoc(docRef, {
                authors: arrayUnion(bookData.volumeInfo.authors[author]),
            })
        }
    } else{
        await updateDoc(docRef, {
            authors: arrayUnion(bookData.volumeInfo.authors[0])
        })
    }
}

export { followAuthor }