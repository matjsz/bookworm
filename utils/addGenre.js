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

const addGenre = async(uid, bookData) => {
    const docRef = doc(db, 'readers', uid)

    if(bookData.volumeInfo.categories > 1){
        for(let category in bookData.volumeInfo.categories){
            await updateDoc(docRef, {
                genres: arrayUnion(categories[bookData.volumeInfo.categories[category]])
            })
        }
    } else{
        await updateDoc(docRef, {
            genres: arrayUnion(categories[bookData.volumeInfo.categories[0]])
        })
    }
}

export { addGenre }