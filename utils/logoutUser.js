import { auth } from './auth'
import { signOut } from "firebase/auth";

const logoutUser = async() => {
    signOut(auth).then(() => {
        window.location = '/'
    })
}

export { logoutUser }    