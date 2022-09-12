import { db } from './db';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const categories = {
    'Fiction': 'Ficção e Fantasia',
    'Adventure': 'Aventura',
    'Fantasy': 'Ficção e Fantasia',
    'Horror': 'Terror',
    'Suspense': 'Suspense',
    'Novel': 'Romance',
    'Mystery': 'Mistério',
    'Romance': 'Romance',
    'Thriller': 'Suspense',
    'Biography & Autobiography': 'Biografia e Autobiografia',
    'Juvenile Fiction': 'Ficção e Fantasia',
    'Young Adult Fiction': 'Ficção e Fantasia',
    'Self-Help': 'Auto-Ajuda',
    'Religion': 'Religião',
    'Travel': 'Viagem',
    'Literary Collections': 'Coleções Literárias',
	'Philosophy': 'Filosofia'
}

const unfavouriteBook = async(uid, bookData) => {
    const docRef = doc(db, 'readers', uid)
    
    await updateDoc(docRef, {
        favourites: arrayRemove(bookData)
    })
}

export { unfavouriteBook }