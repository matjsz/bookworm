import { auth } from './auth'
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new TwitterAuthProvider();

const signInWithTwitter = async() => {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    return user
}

export { signInWithTwitter }