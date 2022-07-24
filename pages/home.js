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

	var genres = ['Ficção', 'Fantasia', 'Terror', 'Suspense', 'Romance', 'Mistério', 'Aventura']

	var choosenGenre = 'Fantasia'
	var choosenAuthor = 'J.K. Rowling'
	var choosenRecommendationGenre = genres[Math.floor(Math.random()*genres.length)]
	var choosenRecommendation = ['author', 'genre'][Math.floor(Math.random()*2)]
	var choosenFinished = {
		"kind": "books#volume",
		"id": "eVevDwAAQBAJ",
		"etag": "WKoS48VyBBo",
		"selfLink": "https://www.googleapis.com/books/v1/volumes/eVevDwAAQBAJ",
		"volumeInfo": {
		  "title": "Box Trilogia O Senhor dos Anéis",
		  "authors": [
			"J.R.R. Tolkien"
		  ],
		  "publisher": "HARLEQUIN",
		  "publishedDate": "2019-11-25",
		  "description": "Apesar de ter sido publicado em três volumes – A Sociedade do Anel, As Duas Torres e O Retorno do Rei – desde os anos 1950, O Senhor dos Anéis não é exatamente uma trilogia, mas um único grande romance que só pode ser compreendido em seu conjunto, segundo a concepção de seu autor, J.R.R. Tolkien. Com design cuidadosamente pensado para refletir a unidade da obra e os desenhos originais feitos por Tolkien para as capas de cada volume, este box reúne os três livros da Saga do Anel e oferece aos leitores uma nova oportunidade de mergulhar no notável mundo da Terra-média.",
		  "industryIdentifiers": [
			{
			  "type": "ISBN_13",
			  "identifier": "9788595086364"
			},
			{
			  "type": "ISBN_10",
			  "identifier": "8595086362"
			}
		  ],
		  "readingModes": {
			"text": true,
			"image": false
		  },
		  "pageCount": 1568,
		  "printType": "BOOK",
		  "categories": [
			"Fiction"
		  ],
		  "maturityRating": "NOT_MATURE",
		  "allowAnonLogging": true,
		  "contentVersion": "1.10.9.0.preview.2",
		  "panelizationSummary": {
			"containsEpubBubbles": false,
			"containsImageBubbles": false
		  },
		  "imageLinks": {
			"smallThumbnail": "http://books.google.com/books/content?id=eVevDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
			"thumbnail": "http://books.google.com/books/content?id=eVevDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
		  },
		  "language": "pt",
		  "previewLink": "http://books.google.com.br/books?id=eVevDwAAQBAJ&pg=PA1&dq=Senhor+dos+An%C3%A9is&hl=&as_brr=5&cd=1&source=gbs_api",
		  "infoLink": "https://play.google.com/store/books/details?id=eVevDwAAQBAJ&source=gbs_api",
		  "canonicalVolumeLink": "https://play.google.com/store/books/details?id=eVevDwAAQBAJ"
		},
		"saleInfo": {
		  "country": "BR",
		  "saleability": "FOR_SALE",
		  "isEbook": true,
		  "listPrice": {
			"amount": 129.9,
			"currencyCode": "BRL"
		  },
		  "retailPrice": {
			"amount": 123.4,
			"currencyCode": "BRL"
		  },
		  "buyLink": "https://play.google.com/store/books/details?id=eVevDwAAQBAJ&rdid=book-eVevDwAAQBAJ&rdot=1&source=gbs_api",
		  "offers": [
			{
			  "finskyOfferType": 1,
			  "listPrice": {
				"amountInMicros": 129900000,
				"currencyCode": "BRL"
			  },
			  "retailPrice": {
				"amountInMicros": 123400000,
				"currencyCode": "BRL"
			  },
			  "giftable": true
			}
		  ]
		},
		"accessInfo": {
		  "country": "BR",
		  "viewability": "PARTIAL",
		  "embeddable": true,
		  "publicDomain": false,
		  "textToSpeechPermission": "ALLOWED",
		  "epub": {
			"isAvailable": true,
			"acsTokenLink": "http://books.google.com.br/books/download/Box_Trilogia_O_Senhor_dos_An%C3%A9is-sample-epub.acsm?id=eVevDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
		  },
		  "pdf": {
			"isAvailable": false
		  },
		  "webReaderLink": "http://play.google.com/books/reader?id=eVevDwAAQBAJ&hl=&as_brr=5&printsec=frontcover&source=gbs_api",
		  "accessViewStatus": "SAMPLE",
		  "quoteSharingAllowed": false
		},
		"searchInfo": {
		  "textSnippet": "Apesar de ter sido publicado em três volumes – A Sociedade do Anel, As Duas Torres e O Retorno do Rei – desde os anos 1950, O Senhor dos Anéis não é exatamente uma trilogia, mas um único grande romance que só pode ser compreendido ..."
		}
	  }

    useEffect(() => {	
        setInterval(() => {
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

		setTimeout(() => {
			getReader(auth.currentUser.uid).then((userData) => {
				choosenGenre = userData.genres[Math.floor(Math.random()*userData.genres.length)]
				choosenAuthor = userData.authors[Math.floor(Math.random()*userData.authors.length)]
				choosenFinished = userData.completed[Math.floor(Math.random()*userData.completed.length)]
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

				<script src="https://www.google.com/books/jsapi.js"></script>
			</Head>
			
			<Navbar type='home' userName={userData.name} userEmail={userData.email} userAvatar={userData.avatar} userEmailVerified={userData.verified} />

			<HomePage choosens={[choosenAuthor, choosenFinished, choosenGenre, choosenRecommendation, choosenRecommendationGenre]} started={userData.started} uid={userData.id} userData={userData}></HomePage>

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
