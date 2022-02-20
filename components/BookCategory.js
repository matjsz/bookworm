import React, { useEffect, useState } from "react";
import Book from "./Book";

const emojis = {
    'success': '✔️',
    'error': '❌',
    'warning': '⚠️'
}

function getBook(bookData){
    return(
        <section class="flex-shrink-0 ml-1 mr-1">
            <Book bookData={bookData}></Book>
        </section>
    )
}

async function getData(scope, arg){
    if(scope == 'author'){
        const r = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${arg}&orderBy=relevance&filter=ebooks`)
        const data = await r.json()
        
        return data.items
    }
    else if(scope == 'genre'){
        const r = await fetch(`https://www.googleapis.com/books/v1/volumes?q=Livros de ${arg}&orderBy=relevance&filter=ebooks`)
        const data = await r.json()
        
        return data.items
    }
}

export default function BookCategory(props){
    const [books, setBooks] = useState([])

    useEffect(() => {
        getData(props.scope, props.arg)
            .then((data) => {
                console.log(data)
                setBooks(data)
            })
    }, 2000)

    return(
        <div className="flex overflow-x-auto space-x-8 w-1 ">
            {books.map((book) => {
                return(
                    <section class="flex-shrink-0 ml-1 mr-1">
                        <Book bookData={book}></Book>
                    </section>
                )
            })}              
        </div>
    )
}