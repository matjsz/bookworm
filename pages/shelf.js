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
import { favouriteBook } from '../utils/favouriteBook';
import { unfavouriteBook } from '../utils/unfavouriteBook';
import { unfollowAuthor } from '../utils/unfollowAuthor';
import { followAuthor } from '../utils/followAuthor';
import { removeGenre } from '../utils/removeGenre';
import { addGenre } from '../utils/addGenre';
import { promote } from '../utils/promoteUser';
import { demote } from '../utils/demoteUser';
import { clearNotification, clearNotifications, newNotification } from '../utils/notificationSystem';

// Conceito da página: uma página de "perfil", com estatísticas do usuário e etc

// Adicionar sistema de notificações em todas as páginas

// O que precisa ter:
// Banner de perfil parecido com codingame
// "Ranque" de leitor (Bronze, Prata, Ouro, etc)
// Amigos
// Autores favoritos
// Gêneros favoritos

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

const ranksPromotion = {
    0: 1,
    1: 2,
	2: 4,
    3: 8,
    4: 12,
    5: 0
}

const ranks = {
    0: 'Iniciante',
    1: 'Adepto',
    2: 'Explorador',
    3: 'Veterano',
    4: 'Mestre',
    5: 'Lenda'
}

export default function Landing() {
	const genresGlobal = ['Ficção', 'Fantasia', 'Terror', 'Suspense', 'Romance', 'Mistério', 'Aventura']
	
    const [userData, setUserData] = useState({})
	const [loading, setLoading] = useState(true)
	const [first, setFirst] = useState(true)
	const [verificationSent, setVerificationSent] = useState(false)
	const [startBookReminder, setStartBookReminder] = useState(false)
	const [finishedBookReminder, setFinishedBookReminder] = useState(false)
	const [readingBookReminder, setReadingBookReminder] = useState(false)

	const sendVerification = () => {
		sendEmailVerification(userData.userObj)
			.then(() => {
				setVerificationSent(true)
			})
	}

	function Book(props){
		const [open, setOpen] = useState(false)
		const [wantTo, setWantTo] = useState(false)
		const [reading, setReading] = useState(false)
		const [completed, setCompleted] = useState(false)
		const [favourited, setFavourited] = useState(false)
		const [followingAuthor, setFollowingAuthor] = useState(false)
		const [genreAdded, setGenreAdded] = useState(false)

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

			for(let i in props.userData.favourites){
				if(props.userData.favourites[i].id == props.bookData.id){
					setFavourited(true)
				}
			}

			for(let i in props.userData.genres){
				if(props.userData.genres[i] == categories[props.bookData.volumeInfo.categories[0]]){
					setGenreAdded(true)
				}
			}

			for(let i in props.userData.authors){
				if(props.userData.authors[i] == props.bookData.volumeInfo.authors[0]){
					setFollowingAuthor(true)
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
											<p className="text-sm mb-2 text-gray-200 px-6"><strong>Preço</strong>: <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-green-200 dark:text-green-900">R$ {props.bookData.saleInfo.listPrice != undefined ? parseFloat(props.bookData.saleInfo.listPrice.amount).toFixed(2) : <>Indisponível</>}</span></p>
											<p className="text-sm mb-2 text-gray-200 px-6">{props.bookData.volumeInfo.authors != undefined ? props.bookData.volumeInfo.authors.length > 1 ? <span><strong>Autores</strong>: {props.bookData.volumeInfo.authors.join(', ')}</span> : <span><strong>Autor(a)</strong>: {props.bookData.volumeInfo.authors[0]}</span> : <></>}</p>
											<p className="text-sm mb-2 text-gray-200 px-6"><strong>Editora</strong>: {props.bookData.volumeInfo.publisher}</p>
											<p className="text-sm mb-2 text-gray-200 px-6">{props.bookData.volumeInfo.categories != undefined ? Object.keys(categories).includes(props.bookData.volumeInfo.categories[0]) ? props.bookData.volumeInfo.categories.length > 1 ? <span><strong>Gêneros</strong>: {props.bookData.volumeInfo.categories.forEach((category) => {categories[category]})}</span> : <span><strong>Gênero</strong>: {categories[props.bookData.volumeInfo.categories[0]]}</span> : props.bookData.volumeInfo.categories : <>Indisponível</>}</p>
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
										.then(() => {
											if(props.userData.completed.length <= ranksPromotion[props.userData.rank-1]){
												newNotification(props.userData.id, 'rankDemotion', ranks[props.userData.rank-1], '/shelf', true, `/rank${props.userData.rank-1}.png`)
												.then((notification) => {
												})
												demote(props.userData.id)
											}
										})
									removeBookFromUser(props.userData.id, 'reading', props.bookData)
									removeBookFromUser(props.userData.id, 'completed', props.bookData)
									
								}}
								disabled={wantTo}>
								Quero ler!
								</button>

								<button
								type="button"
								className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
								onClick={() => {
									addBookToUser(props.userData.id, 'reading', props.bookData)
										.then(() => {
											if(props.userData.completed.length <= ranksPromotion[props.userData.rank-1]){
												newNotification(props.userData.id, 'rankDemotion', ranks[props.userData.rank-1], '/shelf', true, `/rank${props.userData.rank-1}.png`)
												.then((notification) => {
												})
												demote(props.userData.id)
											}
										})
									removeBookFromUser(props.userData.id, 'wantTo', props.bookData)
									removeBookFromUser(props.userData.id, 'completed', props.bookData)

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
										.then(() => {
											if(props.userData.completed.length == ranksPromotion[props.userData.rank]-1){
												newNotification(props.userData.id, 'rankPromotion', ranks[props.userData.rank+1], '/shelf', true, `/rank${props.userData.rank+1}.png`)
												.then((notification) => {
													
												})
												promote(props.userData.id)
											}
										})
									removeBookFromUser(props.userData.id, 'reading', props.bookData)
									removeBookFromUser(props.userData.id, 'wantTo', props.bookData)
								}}
								disabled={completed}
								>
								Já li!
								</button>
								<button
								type="button"
								className="font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
								onClick={() => {
									if(followingAuthor){
										unfollowAuthor(props.userData.id, props.bookData)
									} else{
										followAuthor(props.userData.id, props.bookData)
									}
								}}
								>
									{
										followingAuthor ?
											<div class="text-white flex flex-row gap-2">
												<div class="text-green-500"><svg fill="currentColor" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg></div>
												Seguindo autor
											</div>
										:
											<div class="text-white flex flex-row gap-2">
												<div class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg></div>
												Seguir autor
											</div>
									}
								</button>
								<button
								type="button"
								className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
								onClick={() => {
									if(genreAdded){
										removeGenre(props.userData.id, props.bookData)
									} else{
										addGenre(props.userData.id, props.bookData)
									}
								}}
								>
									{
										genreAdded ?
											<div class="flex flex-row gap-2">
											<div class="text-green-500">
												<svg fill="currentColor" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
											</div>
											Seguindo categoria
											</div>
										:
											<div class="flex flex-row gap-2">
												<div class="text-gray-400"><svg fill="currentColor" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg></div>
												Seguir categoria
											</div>
									}
								</button>
								<button
								type="button"
								className="text-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
								onClick={() => {
									if(favourited){
										unfavouriteBook(props.userData.id, props.bookData)
									} else{
										favouriteBook(props.userData.id, props.bookData)
									}
								}}
								>
									{
										favourited ?
											<div class="text-white flex flex-row gap-2">
												<div class="text-yellow-400">
													<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512" className='w-6 h-6'><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
												</div>
												Adicionado aos favoritos
											</div>
										:
											<div class="text-white flex flex-row gap-2">
												<div class="text-yellow-400">
													<svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' fill='currentColor' viewBox="0 0 576 512"><path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/></svg>
												</div>
												Adicionar aos favoritos
											</div>
									}
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

	function id(){
		let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-'
		let r = ''
		for(let i=0; i<15; i++){
			r += chars[Math.floor(Math.random()*chars.length)]
		}
		return r
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
						favourites: userInfo.favourites,
						rank: userInfo.rank,
						notifications: userInfo.notifications,
						genres: userInfo.genres,
						reading: userInfo.reading,
						wantTo: userInfo.wantTo,
						verified: user.emailVerified,
						started: userInfo.started,
						userObj: user,
						joinedIn: new Date(user.metadata.creationTime).toLocaleDateString('pt-BR')
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
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3359298419174075" crossorigin="anonymous"></script>
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
			
			<Navbar type='shelf' userData={userData} userName={userData.name} userNotifications={userData.notifications} userEmail={userData.email} userAvatar={userData.avatar} userEmailVerified={userData.verified} />


			<div style={{minHeight: '100vh', overflowX: 'hidden'}} className="p-4 w-full text-left rounded-lg sm:p-8">
				{
					userData.verified ?
						<>
							<div className="mx-auto text-center">
								<img className="w-24 mx-auto rounded-full" src={userData.avatar}></img>
								<div class="mx-auto mt-2 font-medium dark:text-white">
									<div>{userData.name}</div>
									<div class="text-sm text-gray-500 dark:text-gray-400">Entrou em {userData.joinedIn}</div>
								</div>
								<div class="flex flex-col md:flex-row text-white rounded mt-6 p-3 bg-gray-900">
									<div class="mx-auto mt-3">
										<div class="flex flex-row gap-2 font-medium"><svg fill="currentColor" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H256zM32 320c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zm416 96v64c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V416c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32z"/></svg> Ranque</div>
										<div class="flex flex-row">
											<img class="h-24 mx-auto" src={`/rank${userData.rank}.png`}></img>
											<p class="uppercase my-auto font-bold" data-tooltip-target="popover-rank">{ranks[userData.rank]}</p>
										</div>

										<div data-popover="" id="popover-rank" role="tooltip" class="inline-block absolute invisible z-10 w-64 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 transition-opacity duration-300 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800" style={{position: 'absolute', inset: '0px auto auto 0px', transform: 'translante(0px, 595px'}} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
											<div class="py-2 px-3 bg-gray-100 rounded-t-lg border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
												<h3 class="font-semibold text-gray-900 dark:text-white">Ranking</h3>
											</div>
											<div class="py-2 px-3">
												<p>{userData.rank == 5 ? <>Parabéns! Você atingiu o ranque máximo do <strong>Bookworm</strong>!</> : <>Leia mais {ranksPromotion[userData.rank]-userData.completed.length} {ranksPromotion[userData.rank]-userData.completed.length > 1 ? <>livros</> : <>livro</>} para subir de rank!</>}</p>
											</div>
											<div data-popper-arrow="" style={{position: 'absolute', left: 0, transform: 'translate(0px, 0px)'}}></div>
										</div>
									</div>
									<div class="mx-auto mt-3">
										<div class="flex flex-row gap-2 font-medium"><svg fill="currentColor" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg> Livros lidos</div>
										<p class="text-5xl mt-3 font-bold" data-tooltip-target="popover-completed-books">{userData.completed.length}</p>

										<div data-popover="" id="popover-completed-books" role="tooltip" class="inline-block absolute invisible z-10 w-64 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 transition-opacity duration-300 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800" style={{position: 'absolute', inset: '0px auto auto 0px', transform: 'translante(0px, 595px'}} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
											<div class="py-2 px-3 bg-gray-100 rounded-t-lg border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
												<h3 class="font-semibold text-gray-900 dark:text-white">Livros lidos</h3>
											</div>
											<div class="py-2 px-3">
												<p>{userData.completed.length > 0 ? <>{userData.completed.slice(0, 3).map((book) => {return book.volumeInfo.title}).join(', ')} {userData.completed.length > 3 ? <>{userData.completed.length-3 > 1 ? <>e outros</> : <>e mais</>} {userData.completed.length-3} {userData.completed.length-3 > 1 ? <>livros.</> : <>livro.</>}</> : <></>}</> : <>Nenhum livro :(</>}</p>
											</div>
											<div data-popper-arrow="" style={{position: 'absolute', left: 0, transform: 'translate(0px, 0px)'}}></div>
										</div>
									</div>
									<div class="mx-auto mt-3 mb-3">
										<div class="flex flex-row gap-2 font-medium"><svg fill="currentColor" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg> Seguindo</div>
										<p class="text-5xl mt-3 font-bold" data-tooltip-target="popover-following">{userData.authors.length}</p>

										<div data-popover="" id="popover-following" role="tooltip" class="inline-block absolute invisible z-10 w-64 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 transition-opacity duration-300 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800" style={{position: 'absolute', inset: '0px auto auto 0px', transform: 'translante(0px, 595px'}} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
											<div class="py-2 px-3 bg-gray-100 rounded-t-lg border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
												<h3 class="font-semibold text-gray-900 dark:text-white">Seguindo</h3>
											</div>
											<div class="py-2 px-3">
												<p>{userData.authors.length > 0 ? <>{userData.authors.slice(0, 3).join(', ')} {userData.authors.length > 3 ? <>{userData.authors.length-3 > 1 ? <>e outros</> : <>e mais</>} {userData.authors.length-3} {userData.authors.length-3 > 1 ? <>autores.</> : <>autor.</>}</> : <></>}</> : <>Nenhum autor :(</>}</p>
											</div>
											<div data-popper-arrow="" style={{position: 'absolute', left: 0, transform: 'translate(0px, 0px)'}}></div>
										</div>

									</div>
								</div>
							</div>
							{
								userData.favourites.length > 0 ?
								<>
									<h3 className="mb-2 mt-6 text-3xl font-bold text-gray-900 dark:text-white">Livros Favoritos</h3>
									<div className="flex overflow-x-auto space-x-8 w-1 ">
									{
										userData.favourites.map((book) => {
											return(
												<section class="flex-shrink-0 ml-1 mr-1">
													<Book bookData={book} userData={userData}></Book>
												</section>
											)
										})
									}
									</div>
								</>
								:
								<></>
							}

							{
								userData.reading.length > 0 ?
									<>
										<h3 className="mb-2 mt-6 text-3xl font-bold text-gray-900 dark:text-white">Lendo</h3>
										<div className="flex overflow-x-auto space-x-8 w-1 ">
										{
											userData.reading.map((book) => {
												return(
													<section class="flex-shrink-0 ml-1 mr-1">
														<Book bookData={book} userData={userData}></Book>
													</section>
												)
											})
										}
										</div>
									</>
								:
									<></>
							}

							{
								userData.wantTo.length > 0 ?
								<>
									<h3 className="mb-2 mt-6 text-3xl font-bold text-gray-900 dark:text-white">Comece sua jornada</h3>
									<div className="flex overflow-x-auto space-x-8 w-1 ">
									{
										userData.wantTo.map((book) => {
											return(
												<section class="flex-shrink-0 ml-1 mr-1">
													<Book bookData={book} userData={userData}></Book>
												</section>
											)
										})
									}
									</div>
								</>
								:
								<></>
							}

							{
								userData.completed.length > 0 ?
								<>
									<h3 className="mb-2 mt-6 text-3xl font-bold text-gray-900 dark:text-white">Livros Lidos</h3>
									<div className="flex overflow-x-auto space-x-8 w-1 ">
									{
										userData.completed.map((book) => {
											return(
												<section class="flex-shrink-0 ml-1 mr-1">
													<Book bookData={book} userData={userData}></Book>
												</section>
											)
										})
									}
									</div>
								</>
								:
								<></>
							}


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
