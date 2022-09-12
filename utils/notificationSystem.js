import { db } from './db';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const texts = {
    'rankPromotion': 'Parabéns! você foi promovido(a) para ',
    'rankDemotion': 'Ah não! você foi rebaixado(a) para ',
    'startBookReminder': 'Ei, que tal começar a ler ',
    'finishedBookReminder': 'Seu livro está com saudade! Releia ',
    'readingBookReminder': 'Já terminou de ler '
}

const actions = {
    'rankPromotion': 'goTo',
    'rankDemotion': 'goTo',
    'startBookReminder': 'startBook',
    'finishedBookReminder': 'startBook',
    'readingBookReminder': 'finishBook'
}

const newNotification = async(uid, type, arg, actionArg, image, src) => {
    const docRef = doc(db, 'readers', uid)
    const notification = {
        type: type,
        content: {
            text: texts[type],
            arg: arg
        },
        action: actions[type],
        actionArg: actionArg,
        timestamp: new Date(),
        image: image,
        src: src
    }

    await updateDoc(docRef, {
        notifications: arrayUnion(notification)
    })

    var snd = new Audio("/notification.wav")
    snd.play()

    return notification
}

const clearNotification = async(uid, notification) => {
    const docRef = doc(db, 'readers', uid)
    
    await updateDoc(docRef, {
        notifications: arrayRemove(notification)
    })
}

const clearNotifications = async(uid) => {
    const docRef = doc(db, 'readers', uid)

    await updateDoc(docRef, {
        notifications: []
    })
}

const getTimeDifference = (d1, d2) => {
    try{
        const days = parseInt((d2 - d1) / (1000 * 60 * 60 * 24));
        const hours = parseInt(Math.abs(d2 - d1) / (1000 * 60 * 60) % 24);
        const minutes = parseInt(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60) % 60);
        const seconds = parseInt(Math.abs(d2.getTime() - d1.getTime()) / (1000) % 60); 

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    } catch(e){
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }
}

export { newNotification, clearNotification, clearNotifications, getTimeDifference }