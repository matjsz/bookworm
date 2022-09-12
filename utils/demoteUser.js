import { db } from './db';
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";

const demote = async(uid) => {
    const docRef = doc(db, 'readers', uid)
    const userRef = getDoc(docRef)
    const userData = (await userRef).data()
    
    if(userData.rank > 0){
        await updateDoc(docRef, {
            rank: increment(-1)
        })
    }
}

export { demote }