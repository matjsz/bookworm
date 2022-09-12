import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { addBookToUser } from "../utils/addBook";
import { removeBookFromUser } from "../utils/removeBook";

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
    'Juvenile Fiction': 'Ficção Juvenil',
    'Young Adult Fiction': 'Ficção Jovem-Adulta',
    'Self-Help': 'Auto-Ajuda',
    'Religion': 'Religião',
    'Travel': 'Viagem',
    'Literary Collections': 'Coleções Literárias'
}

export default function Book(props){
    const [open, setOpen] = useState(false)
    const [wantTo, setWantTo] = useState(false)
    const [reading, setReading] = useState(false)
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        for(let i in props.userData.wantTo){
            console.log(props.userData.wantTo[i])
            if(props.userData.wantTo[i].id == props.bookData.id){
                setWantTo(true)
            }
        }

        for(let i in props.userData.reading){
            if(props.userData.reading[i].id == props.bookData.id){
                setReading(true)
            }
        }

        for(let i in props.userData.completed){
            if(props.userData.completed[i].id == props.bookData.id){
                setCompleted(true)
            }
        }
    }, [])

    const cancelButtonRef = useRef(null)

    return (
            <button onClick={() => {setOpen(true)}} type="button" className="bg-white rounded-lg border shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full h-16 rounded-t-lg rounded-b-lg" src={props.bookData.volumeInfo.imageLinks.thumbnail} alt=""/>

                <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-25"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-25"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-25 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-25 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" style={{maxWidth: '1000px'}}>
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left   ">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-200">
                                            {props.bookData.volumeInfo.title} <br/>
                                            <div class="text-sm text-gray-400 font-normal">{wantTo ? 'Este livro está na sua lista de desejos!' : reading ? 'Você está lendo este livro.' : completed ? 'Você já leu este livro!' : ''}</div>
                                        </Dialog.Title>
                                        <div className="md:flex mt-2">
                                            <img className="mx-auto h-full" src={props.bookData.volumeInfo.imageLinks.thumbnail}></img>
                                            <p className="text-sm text-gray-200 px-6 mt-4">{props.bookData.volumeInfo.description}</p>
                                        </div>
                                        <div className="md:flex mt-6">
                                            <hr className="mb-6"/>
                                            <p className="text-sm mb-2 text-gray-200 px-6"><strong>Preço</strong>: <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">R$ {props.bookData.saleInfo.listPrice.amount}</span></p>
                                            <p className="text-sm mb-2 text-gray-200 px-6">{props.bookData.volumeInfo.authors.length > 1 ? <span><strong>Autores</strong>: {props.bookData.volumeInfo.authors.join(', ')}</span> : <span><strong>Autor(a)</strong>: {props.bookData.volumeInfo.authors[0]}</span>}</p>
                                            <p className="text-sm mb-2 text-gray-200 px-6"><strong>Editora</strong>: {props.bookData.volumeInfo.publisher}</p>
                                            <p className="text-sm mb-2 text-gray-200 px-6">{Object.keys(categories).includes(props.bookData.volumeInfo.categories[0]) ? props.bookData.volumeInfo.categories.length > 1 ? <span><strong>Gêneros</strong>: {props.bookData.volumeInfo.categories.forEach((category) => {categories[category]})}</span> : <span><strong>Gênero</strong>: {categories[props.bookData.volumeInfo.categories[0]]}</span> : props.bookData.volumeInfo.categories}</p>
                                            <p className="text-sm mb-2 text-gray-200 px-6"><strong>Páginas</strong>: {props.bookData.volumeInfo.pageCount}</p>

                                            <center><p class="text-sm font-bold text-gray-200"><svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> {props.bookData.volumeInfo.averageRating}</p></center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <a href={props.bookData.saleInfo.buyLink} class="w-full mr-2 mb-2 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <svg class="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path></svg>
                                    <div class="text-left">
                                        <div class="mb-1 text-xs">Ver no</div>
                                        <div class="-mt-1 font-sans text-sm font-semibold">Google Play</div>
                                    </div>
                                </a>

                                <center>
                                <button
                                type="button"
                                className="text-white mr-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={() => {
                                    addBookToUser(props.userData.id, 'wantTo', props.bookData)
                                    removeBookFromUser(props.userData.id, 'reading', props.bookData)
                                    removeBookFromUser(props.userData.id, 'completed', props.bookData)
                                    props.updtFn(props.userData.id)
                                }}
                                disabled={wantTo}>
                                Quero ler!
                                </button>

                                <button
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={() => {
                                    addBookToUser(props.userData.id, 'reading', props.bookData)
                                    removeBookFromUser(props.userData.id, 'wantTo', props.bookData)
                                    removeBookFromUser(props.userData.id, 'completed', props.bookData)
                                    props.updtFn(props.userData.id)
                                }}
                                disabled={reading}
                                >
                                Estou lendo
                                </button>

                                <button
                                type="button"
                                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={() => {
                                    addBookToUser(props.userData.id, 'completed', props.bookData)
                                    removeBookFromUser(props.userData.id, 'reading', props.bookData)
                                    removeBookFromUser(props.userData.id, 'wantTo', props.bookData)
                                    props.updtFn(props.userData.id)
                                }}
                                disabled={completed}
                                >
                                Já li!
                                </button>
                                </center>
                            </div>
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
                </Transition.Root>
            </button>
    )
}