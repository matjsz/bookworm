import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

// Components
import Navbar from '../../components/Navbar'
import { signInEmail } from '../../utils/signInEmailUser';

function setCookie(cname, cvalue, exmins) {
	const d = new Date();
	d.setTime(d.getTime() + (exmins * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}
  
function checkCookie() {
	let user = getCookie("username");
	if (user != "") {
	  alert("Welcome again " + user);
	} else {
	  user = prompt("Please enter your name:", "");
	  if (user != "" && user != null) {
		setCookie("username", user, 365);
	  }
	}
}

export default function Landing() {
	const router = useRouter()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const email = urlParams.get('email')
        const password = urlParams.get('password')

        signInEmail(email, password)
            .then((user) => {
				setCookie('eL', '', 5)
				router.push('/home')
            })
            .catch((e) => {
                const eCodes = {
                    'auth/invalid-email': 'O email inserido é inválido, tente novamente.',
					'auth/user-not-found': 'Este usuário não existe, tente novamente.',
                    'auth/invalid-password': 'A senha inserida está incorreta, tente novamente.'
                }

				try{
					if(eCodes[e] != undefined){
						setCookie('eL', eCodes[e.code], 5)
					} else{
						setCookie('eL', 'Algo deu errado, tente novamente.', 5)
					}
				} catch(err){
					setCookie('eL', 'Algo deu errado, tente novamente.', 5)
				}

				router.push('/')
            })	
    }, [])

	return (
		<div style={{backgroundColor: '#111c2e'}}>
			<Head>
				<title>Bookworm | Login</title>
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
				<h3 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Autenticando</h3>
				<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Aguarde enquanto verificamos suas credenciais. :)</p>
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
	)
}
