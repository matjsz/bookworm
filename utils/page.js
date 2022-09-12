import Head from 'next/head'
import { useState, useEffect, useRef, Fragment } from 'react'

// Components
import Navbar from '../components/Navbar'

// Utils
import { auth } from '../utils/auth';
import { db } from '../utils/db';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { activateAccount } from '../utils/activateAccount';
import { Dialog, Transition } from '@headlessui/react';
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

export default function Landing() {
	const genresGlobal = ['Ficção', 'Fantasia', 'Terror', 'Suspense', 'Romance', 'Mistério', 'Aventura']
	
    const [userData, setUserData] = useState({})
	const [loading, setLoading] = useState(true)
	const [first, setFirst] = useState(true)
	const [verificationSent, setVerificationSent] = useState(false)

	const sendVerification = () => {
		sendEmailVerification(userData.userObj)
			.then(() => {
				setVerificationSent(true)
			})
	}

	onAuthStateChanged(auth, (user) => {
		if(user){
			if(first){
				onSnapshot(doc(db, 'readers', user.uid), (userDoc) => {
					var userInfo = userDoc.data()
	
					setUserData({
						id: user.uid,
						name: user.displayName,
						email: user.email,
						avatar: user.photoURL,
						authors: userInfo.authors,
						completed: userInfo.completed,
						genres: userInfo.genres,
						reading: userInfo.reading,
						wantTo: userInfo.wantTo,
						verified: user.emailVerified,
						started: userInfo.started,
						userObj: user
					})
		
					setLoading(false)	
				})
				setFirst(false)
			}
		}
	})

	return (
		loading ? 
		<div style={{backgroundColor: '#111c2e'}}>
			<Head>
				<title>Bookworm | Carregando</title>
				<meta property="og:title" content="Bookworm" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://bookworm-site.herokuapp.com" />
				<meta property="og:image" content="/logo.png" />
				<meta property="og:description" content="Bookworm." />
				<meta name="theme-color" content="#FF0000"></meta>

				<link rel="stylesheet" href="https://unpkg.com/flowbite@1.3.3/dist/flowbite.min.css" />
			</Head>
			
			<Navbar type='landing'/>

            <div style={{paddingBottom: '50vh'}} class="p-4 w-full text-center rounded-lg sm:p-8">
				<h3 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Carregando</h3>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Escrevendo a sua história.</p>
				<div class="mx-auto">
					<svg role="status" class="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
					</svg>
				</div>
			</div>

			<footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800" style={{paddingBottom: '10vh'}}>
				<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://github.com/matsilva/bookworm" class="hover:underline" target="_blank">Bookworm™</a>.
				</span>
				<ul class="flex flex-wrap items-center mt-3 sm:mt-0">
					<li>
						<a href="https://github.com/matjsilva/bookworm" class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">About</a>
					</li>
					<li>
						<a href="/privacy-policy" class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy Policy</a>
					</li>
					<li>
						<a href="https://github.com/matjsilva" class="text-sm text-gray-500 hover:underline dark:text-gray-400">Contact</a>
					</li>
				</ul>
			</footer>

			<script src="/darkTheme.js"></script>
			<script src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"></script>
		</div>
		:
		<div style={{backgroundColor: '#111c2e'}}>
			<Head>
				<title>Bookworm | Home</title>
				<meta property="og:title" content="Bookworm" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://bookworm-site.herokuapp.com" />
				<meta property="og:image" content="/logo.png" />
				<meta property="og:description" content="Bookworm." />
				<meta name="theme-color" content="#FF0000"></meta>

				<link rel="stylesheet" href="https://unpkg.com/flowbite@1.3.3/dist/flowbite.min.css" />

				<script src="https://www.google.com/books/jsapi.js"></script>
				<script src="/darkTheme.js"></script>
				<script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
			</Head>
			
			<Navbar type='home' userName={userData.name} userEmail={userData.email} userAvatar={userData.avatar} userEmailVerified={userData.verified} />

			<div style={{minHeight: '100vh'}} className="p-4 w-full text-left rounded-lg sm:p-8">
				{
					userData.verified ?
						<>
                            Olá, {userData.name}!
						</>
						:
						
						<div class="p-4 mt-3 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
							<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Verique seu email</h5>
							<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Um link de verificação foi enviado para o seu email. Verifique sua conta para usar todos os recursos do <strong>Bookworm</strong>.</p>
							<div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
								{
									verificationSent ?
										<button class="w-full sm:w-auto bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-gray-700" disabled={true}>
											<svg class="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
											<div class="text-left">
												<div class="mb-1 text-xs">Email enviado com sucesso!</div>
											</div>
										</button>
										:
										<button class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" onClick={sendVerification}>
											<svg class="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
											<div class="text-left">
												<div class="mb-1 text-xs">Enviar email novamente</div>
											</div>
										</button>
								}
							</div>
						</div>

				}
			</div>

			<footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800" style={{paddingBottom: '15vh'}}>
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://github.com/matsilva/bookworm" className="hover:underline" target="_blank">Bookworm™</a>.
				</span>
				<ul className="flex flex-wrap items-center mt-3 sm:mt-0">
					<li>
						<a href="https://github.com/matjsilva/bookworm" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Sobre</a>
					</li>
					<li>
						<a href="/privacidade" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Política de Privacidade</a>
					</li>
					<li>
						<a href="https://github.com/matjsilva" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Contato</a>
					</li>
				</ul>
			</footer>
		</div>
	)
}
