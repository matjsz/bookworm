import Head from 'next/head'
import { useState, useEffect } from 'react'

// Components
import Navbar from '../components/Navbar'
import LandingForm from '../components/LandingForm'
import { auth } from '../utils/auth'

export default function Landing() {
	const [formAction, setFormAction] = useState('login')

	useEffect(() => {
		setTimeout(() => {
			if(auth.currentUser != undefined){
				window.location = '/home'
			}
		}, 2000)
	}, [])
	
	return (
		<div style={{backgroundColor: '#111c2e'}}>
			<Head>
				<title>Bookworm</title>
				<meta property="og:title" content="Bookworm" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://bookworm-site.herokuapp.com" />
				<meta property="og:image" content="/logo.png" />
				<meta property="og:description" content="Bookworm." />
				<meta name="theme-color" content="#FF0000"></meta>

				<link rel="stylesheet" href="https://unpkg.com/flowbite@1.3.3/dist/flowbite.min.css" />
			</Head>

			<div className="lg:flex">
				<div id="AuthTabContent" className='flex-none w-16 dark:bg-gray-800'>
					<div>
						<ul className="flex flex-wrap -mb-px" id="AuthTab" data-tabs-toggle="#AuthTabContent" role="tablist">
							<li className="mr-2" role="presentation">
								<button onClick={() => {setFormAction('login')}} className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 active" id="login-tab" data-tabs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Entrar</button>
							</li>
							<li className="mr-2" role="presentation">
								<button onClick={() => {setFormAction('register')}} className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300" id="register-tab" data-tabs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">Registrar</button>
							</li>
						</ul>
					</div>
					<div className="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="login" role="tabpanel" aria-labelledby="login-tab">
						<LandingForm action={formAction}/>
					</div>
					<div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="register" role="tabpanel" aria-labelledby="register-tab">
						<LandingForm action={formAction}/>
					</div>
				</div>
				<div className='flex-1'>
					<img className='' src='/landing-cover.jpg' />
				</div>
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

			<script src="/darkTheme.js"></script>
			<script src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"></script>
		</div>
	)
}
