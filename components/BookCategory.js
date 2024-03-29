import React, { useEffect, useState } from "react";
import Book from "./Book";

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
    else if(scope == 'reading'){
        return arg
    }
    else if(scope == 'wantTo'){
        return arg
    }
    else if(scope == 'completed'){
        return arg
    }
}

export default function BookCategory(props){
    const [books, setBooks] = useState([])

    getData(props.scope, props.arg)
        .then((data) => {
            setBooks(data)  
        })

    return(
        <div className="flex overflow-x-auto space-x-8 w-1 ">
            {books.length > 0 ? books.map((book) => {
                return(
                    <section class="flex-shrink-0 ml-1 mr-1">
                        <Book updtFn={props.updtFn} bookData={book} userData={props.userData}></Book>
                    </section>
                )
            }) : <></>}            
        </div>
    )
}