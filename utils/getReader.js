import { db } from './db';
import { doc, getDoc } from "firebase/firestore";

const getReader = async(uid) => {
    const docRef = doc(db, 'readers', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return undefined
    }
}

export { getReader }