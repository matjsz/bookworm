import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

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
                        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left   ">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-200">
                                            {props.bookData.volumeInfo.title}
                                        </Dialog.Title>
                                        <div className="md:flex mt-2">
                                            <img className="" src={props.bookData.volumeInfo.imageLinks.thumbnail}></img>
                                            <p className="text-sm text-gray-200 px-6">{props.bookData.volumeInfo.description}</p>
                                        </div>
                                        <div className="md:flex mt-6">
                                            <p className="text-sm text-gray-200 px-6">Preço: R$ {props.bookData.saleInfo.listPrice.amount}</p>
                                            <p className="text-sm text-gray-200 px-6">{props.bookData.volumeInfo.authors.length > 1 ? `Autores: ${props.bookData.volumeInfo.authors.join(', ')}`: `Autor(a): ${props.bookData.volumeInfo.authors[0]}`}</p>
                                            <p className="text-sm text-gray-200 px-6">Editora: {props.bookData.volumeInfo.publisher}</p>
                                            <p className="text-sm text-gray-200 px-6">Classificação: {props.bookData.volumeInfo.averageRating}</p>
                                            <p className="text-sm text-gray-200 px-6">{props.bookData.volumeInfo.categories.length > 1 ? `Gêneros: ${props.bookData.volumeInfo.categories.forEach((category) => {categories[category]})}` : `Gênero: ${categories[props.bookData.volumeInfo.categories[0]]}`}</p>
                                            <p className="text-sm text-gray-200 px-6">Páginas: {props.bookData.volumeInfo.pageCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                                >
                                
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
                </Transition.Root>
            </button>
    )
}