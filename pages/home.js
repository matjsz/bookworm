import Head from 'next/head'
import { useState, useEffect } from 'react'

// Components
import Navbar from '../components/Navbar'
import { HomePage } from '../components/HomePage';

// Utils
import { auth } from '../utils/auth';
import { getReader } from '../utils/getReader';

export default function Landing() {
    const [userData, setUserData] = useState({})

    useEffect(() => {	
        setTimeout(() => {
			getReader(auth.currentUser.uid).then((userData) => {
				setUserData({
					id: auth.currentUser.uid,
					name: auth.currentUser.displayName,
					email: auth.currentUser.email,
					avatar: auth.currentUser.photoURL,
					authors: userData.authors,
					completed: userData.completed,
					genres: userData.genres,
					reading: userData.reading,
					wantTo: userData.wantTo,
					verified: auth.currentUser.emailVerified,
					started: userData.started	
				})
			})
        }, 2000)
    }, [])

	return (
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
			</Head>
			
			<Navbar type='home' userName={userData.name} userEmail={userData.email} userAvatar={userData.avatar} userEmailVerified={userData.verified} />

			<HomePage started={userData.started} uid={userData.id} userData={userData}></HomePage>

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

			<script src="/darkTheme.js"></script>
			<script src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"></script>
		</div>
	)
}
