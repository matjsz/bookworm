import { db } from './db';
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";

const promote = async(uid) => {
    const docRef = doc(db, 'readers', uid)
    const userRef = getDoc(docRef)
    const userData = (await userRef).data()
    
    if(userData.rank < 5){
        await updateDoc(docRef, {
            rank: increment(1)
        })
    }
}

export { promote }