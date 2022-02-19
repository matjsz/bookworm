import { auth } from './auth'
import { signInWithEmailAndPassword } from "firebase/auth";

const signInEmail = async(email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const user = result.user
}

export { signInEmail }