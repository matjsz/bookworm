import React, { useState } from "react";
import { activateAccount } from "../utils/activateAccount";
import BookCategory from "./BookCategory";

class HomePage extends React.Component{
    state = {
        step: 'authors',
        authors: [],
        actualAuthor: '',
        genres: [],
        actualGenre: ''
    }

    handleChange = (e) => {
        this.setState(prevState => ({
            step: prevState.step,
            authors: prevState.authors,
            actualAuthor: e.target.value,
            genres: prevState.genres,
            actualGenre: prevState.actualGenre
        }))
    }

    handleChangeGenres = (e) => {
        this.setState(prevState => ({
            step: prevState.step,
            authors: prevState.authors,
            actualAuthor: prevState.actualAuthor,
            genres: prevState.genres,
            actualGenre: e.target.value
        }))
    }

    handleAuthorsAdd = (author) => {
        if(this.state.authors.length < 3){
            this.setState(prevState => ({
                step: prevState.step,
                authors: [...prevState.authors, author],
                actualAuthor: '',
                genres: prevState.genres,
                actualGenre: prevState.actualGenre
            }))
        }
    }

    handleGenresAdd = (genre) => {
        if(this.state.genres.length < 3){
            this.setState(prevState => ({
                step: prevState.step,
                authors: prevState.authors,
                actualAuthor: prevState.actualAuthor,
                genres: [...prevState.genres, genre],
                actualGenre: ''
            }))
        }
    }

    handleAuthorsRemove = (author) => {
        var l = this.state.authors
        l.splice(this.state.authors.indexOf(author), 1)

        this.setState(prevState => ({
            step: prevState.step,
            authors: l,
            actualAuthor: prevState.actualAuthor,
            genres: prevState.genres,
            actualGenre: prevState.actualGenre
        }))
    }
    
    handleGenresRemove = (genre) => {
        var l = this.state.genres
        l.splice(this.state.genres.indexOf(genre), 1)

        this.setState(prevState => ({
            step: prevState.step,
            authors: prevState.authors,
            actualAuthor: prevState.actualAuthor,
            genres: l,
            actualGenre: prevState.actualGenre
        }))
    }

    changeStep = (step) => {
        this.setState(prevState => ({
            step: step,
            authors: prevState.authors,
            actualAuthor: prevState.actualAuthor,
            genres: prevState.genres,
            actualGenre: prevState.actualGenre
        }))
    } 

    finishSetup = () => {
        activateAccount(this.props.uid, this.state.genres, this.state.authors)
            .then(() => {
                window.location.reload()
            })
    }

    newAuthor = (name, key) => {
        const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
        const thisColor = colors[Math.floor(Math.random()*colors.length)]
    
        return (
            <span key={key} className={`bg-${thisColor}-800 text-gray-200 text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}>
                {name} 
                <button onClick={() => {this.handleAuthorsRemove(name)}} type="button" className="text-white text-xs bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-full p-1 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-2">
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </span>)
    }

    newGenre = (name, key) => {
        const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
        const thisColor = colors[Math.floor(Math.random()*colors.length)]
    
        return (
            <span key={key} className={`bg-${thisColor}-800 text-gray-200 text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}>
                {name} 
                <button onClick={() => {this.handleGenresRemove(name)}} type="button" className="text-white text-xs bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-full p-1 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-2">
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </span>)
    }

    setModal = (value) => {
        this.setState(prevState => ({
            modal: value
        }))
    }

    render(){
        if(this.props.started == true){
            var genres = ['Ficção', 'Fantasia', 'Terror', 'Suspense', 'Romance', 'Mistério', 'Aventura']

            var choosenGenre = this.props.userData.genres[Math.floor(Math.random())*this.props.userData.genres.length]
            var choosenAuthor = this.props.userData.authors[Math.floor(Math.random())*this.props.userData.authors.length]
            var choosenRecommendationGenre = genres[Math.floor(Math.random())*genres.length]
            var choosenRecommendation = ['author', 'genre'][Math.floor(Math.random())*2]
            var choosenFinished = this.props.userData.completed[Math.floor(Math.random())*this.props.userData.completed.length]

            return(
                <div style={{paddingBottom: '10vh'}} className="p-4 w-full text-left rounded-lg sm:p-8">
                    {
                        this.props.userData.reading.length > 0 ?
                            <>
                                <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Lendo</h3>
                                <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope='reading' arg={this.props.userData.reading}></BookCategory>
                            </>
                        :
                            <></>
                    }
                    
                    <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Descubra</h3>
                    <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope={'genre'} arg={choosenRecommendationGenre}></BookCategory>

                    {
                        this.props.userData.wantTo.length > 0 ?
                            <>
                                <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Comece sua jornada!</h3>
                                <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope={'wantTo'} arg={this.props.userData.wantTo}></BookCategory>
                            </>
                        :
                            <></>
                    }

                    <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Mais de {choosenGenre}</h3>
                    <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope="genre" arg={choosenGenre}></BookCategory>

                    {
                        this.props.userData.completed.length > 0 ?
                            <>
                                <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Leia novamente</h3>
                                <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope={'completed'} arg={this.props.userData.completed}></BookCategory>
                            </>
                        :
                            <></>
                    }

                    <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Obras de {choosenAuthor}</h3>
                    <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope="author" arg={choosenAuthor}></BookCategory>

                    {
                        this.props.userData.completed.length > 0 ?
                            <>
                                <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Porque você leu {this.props.userData.completed[Math.floor(Math.random()*this.props.userData.completed.length)].volumeInfo.title}</h3>
                                <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope={choosenRecommendation} arg={choosenRecommendation == 'genre' ? choosenFinished.volumeInfo.categories[0] : choosenFinished.volumeInfo.authors[0]}></BookCategory>
                            </>
                            
                        :
                            <></>
                    }

                    <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Talvez você goste</h3>
                    <BookCategory updtFn={this.props.updtFn} userData={this.props.userData} scope={'genre'} arg={genres[Math.floor(Math.random()*genres.length)]}></BookCategory>
                </div>
            )
        } else if(this.props.started == false){
            if(this.state.step == "authors"){
                return(
                    <div style={{paddingBottom: '55vh'}} className="p-4 w-full text-center rounded-lg sm:p-8">
                        <div className="w-full bg-gray-200 mb-6 rounded-full dark:bg-gray-700">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${this.state.authors.length == 0 ? 8 : this.state.authors.length*16.8}%`}}> {this.state.authors.length == 0 ? 0 : Math.floor(this.state.authors.length*16.8)}%</div>
                        </div>
        
                        <div className="code-preview rounded-xl bg-gradient-to-r bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6 dark:bg-gray-800 mb-6 overflow-scroll">
                            {
                                this.state.authors.length == 0 ?
                                    <p className="leading-none dark:text-gray-400">Adicione seus autores!</p>
                                :
                                    this.state.authors.map((author, i) => {
                                        return this.newAuthor(author, i)
                                    })
                            }
                        </div>
        
                        <div>
                            <div className="mb-6">
                                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Digite o nome de 3 autores que você gosta e/ou acompanha.</label>
                                <input type="text" value={this.state.actualAuthor} onChange={this.handleChange} className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={this.state.authors.length == 3} />
                            </div>
        
                            {
                                this.state.authors.length < 3 ? 
                                    <button onClick={() => {if(!this.state.actualAuthor.length == 0) this.handleAuthorsAdd(this.state.actualAuthor)}} type="button" className="py-3 px-5 w-100 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Adicionar</button>
                                :
                                    <div>
                                        <p className="text-lg dark:text-white">Tudo certo! Pronto para a próxima etapa?</p>
                                        <button onClick={() => {this.changeStep('genres')}} type="button" className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                )
            } else if(this.state.step == "genres"){
                return (
                    <div style={{paddingBottom: '55vh'}} className="p-4 w-full text-center rounded-lg sm:p-8">
                        <div className="w-full bg-gray-200 mb-6 rounded-full dark:bg-gray-700">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${this.state.genres.length == 0 ? 50 : 50+this.state.genres.length*16.8}%`}}> {this.state.genres.length == 0 ? 50 : Math.floor(50+this.state.genres.length*16.8)}%</div>
                        </div>
        
                        <div className="code-preview rounded-xl bg-gradient-to-r bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6 dark:bg-gray-800 mb-6 overflow-scroll">
                            {
                                this.state.genres.length == 0 ?
                                    <p className="leading-none dark:text-gray-400">Me diga seus gêneros favoritos!</p>
                                :
                                    this.state.genres.map((genre, i) => {
                                        return this.newGenre(genre, i)
                                    })
                            }
                        </div>
        
                        <div>
                            <div className="mb-6">
                                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Digite 3 gêneros que você gosta.</label>
                                <input type="text" value={this.state.actualGenre} onChange={this.handleChangeGenres} className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={this.state.genres.length == 3} />
                            </div>
        
                            {
                                this.state.genres.length < 3 ? 
                                    <button key={'genresButton'} onClick={() => {if(!this.state.actualGenre.length == 0) this.handleGenresAdd(this.state.actualGenre)}} type="button" className="py-3 px-5 w-100 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Adicionar</button>
                                :
                                    <div>
                                        <p className="text-lg dark:text-white">Sua conta está pronta!</p>
                                        <button onClick={() => {this.changeStep('authors')}} type="button" className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                        </button>
                                        <button onClick={() => {this.finishSetup()}} type="button" className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                )
            }
        } else{
            return(
                <div style={{paddingBottom: '65vh'}} className="p-4 w-full text-center rounded-lg sm:p-8">
                    <div className="mx-auto">
                        <svg role="status" className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </div>
            )
        }
    }
}

export { HomePage }