import { db } from './db';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const activateAccount = async(uid, genres, authors) => {
    const docRef = doc(db, 'readers', uid)
    
    await updateDoc(docRef, {
        started: true,
        genres: genres,
        authors: authors,
        notifications: arrayUnion({
            type: 'rankPromotion',
            content: {
                text: 'Olá, Bem-vindo ao Bookworm! Verifique seu email para usar todos os recursos da plataforma',
                arg: ''
            },
            action: 'goTo',
            actionArg: '/home',
            timestamp: new Date(),
            image: true,
            src: '/logo white.png'
        })
    })
}

export { activateAccount }