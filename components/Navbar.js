import React, { useState } from "react";
import { addBookToUser } from "../utils/addBook";
import { demote } from "../utils/demoteUser";
import { clearNotification, clearNotifications, getTimeDifference, newNotification } from "../utils/notificationSystem";
import { promote } from "../utils/promoteUser";
import { removeBookFromUser } from "../utils/removeBook";

const ranks = {
    0: 'Iniciante',
    1: 'Adepto',
    2: 'Explorador',
    3: 'Veterano',
    4: 'Mestre',
    5: 'Lenda'
}

const ranksPromotion = {
    0: 1,
    1: 2,
	2: 4,
    3: 8,
    4: 12,
    5: 0
}

export default function Navbar(props){
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchButton = (e) => {
        window.location = `/s/${search}`
    }

    if(props.type == 'landing'){
        return(
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="#" className="flex">
                        <img src='/logo white.png' style={{height: '50px'}}></img>
                    </a>
                    <div className="flex md:order-2">
                        <img src='/logo wide white.png' style={{height: '50px'}}/>
                    </div>
                </div>
            </nav>
        )
    }
    else if(props.type == 'home'){
        return(          
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="#" className="flex">
                        <img className='className="mr-3' src='/logo white.png' style={{height: '50px'}}></img>
                    </a>
                    <div className="flex items-center md:order-2">
                        <div class="flex mr-3" id="searchBar">
                            <div class="hidden relative md:block">
                                <div class="flex items-center">
                                    <div class="relative w-full">
                                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <input onChange={handleSearch} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." required/>
                                    </div>
                                    <button onClick={handleSearchButton} type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        <span class="sr-only">Buscar</span>
                                    </button>
                                </div> 
                            </div>
                        </div>

                        <div id="notifications" className="mr-3">
                            <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button"> 
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                                </svg>
                                <div class="flex relative">
                                    {
                                        props.userNotifications.length > 0 ?
                                            <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                            :
                                            <></>
                                    }
                                </div>
                            </button>

                            <div id="dropdownNotification" class="hidden z-20 w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton" style={{position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 10px)'}} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                                <div class="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white">
                                    Notificações
                                </div>
                                <div style={{maxHeight: '60vh', overflowY: 'scroll'}} class="divide-y divide-gray-100 dark:divide-gray-700" id="notifications-area">
                                    {
                                        props.userNotifications.length > 0 ?
                                            <>
                                            {
                                                props.userNotifications.map((notification) => {
                                                    return notification.action == "goTo" ?
                                                        <button onClick={() => {
                                                            clearNotification(props.userData.id, notification)
                                                            window.location.pathname != notification.actionArg ? window.location = notification.actionArg : null 
                                                        }} class="w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>?</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location.pathname == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        notification.action == "startBook" ?
                                                        <button onClick={() => {
                                                            addBookToUser(props.userData.id, 'reading', notification.actionArg)
                                                                .then(() => {
                                                                    if(props.userData.completed.length <= ranksPromotion[props.userData.rank-1]){
                                                                        demote(props.userData.id)
                                                                        newNotification(props.userData.id, 'rankDemotion', ranks[props.userData.rank-1], '/shelf', true, `/rank${props.userData.rank-1}.png`)
                                                                    }
                                                                })
                                                            removeBookFromUser(props.userData.id, 'wantTo', notification.actionArg)
                                                            removeBookFromUser(props.userData.id, 'completed', notification.actionArg)

                                                            clearNotification(props.userData.id, notification)
                                                        }} class="w-full w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>? Clique aqui para salvar como completo</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        notification.action == "finishBook" ?
                                                        <button onClick={() => {
                                                            addBookToUser(props.userData.id, 'completed', notification.actionArg)
                                                                .then(() => {
                                                                    if(props.userData.completed.length == ranksPromotion[props.userData.rank]-1){
                                                                        newNotification(props.userData.id, 'rankPromotion', ranks[props.userData.rank+1], '/shelf', true, `/rank${props.userData.rank+1}.png`)
                                                                        promote(props.userData.id)
                                                                    }
                                                                })
                                                            removeBookFromUser(props.userData.id, 'reading', notification.actionArg)
                                                            removeBookFromUser(props.userData.id, 'wantTo', notification.actionArg)

                                                            clearNotification(props.userData.id, notification)
                                                        }} class="w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>?</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        <></>
                                                })
                                            }
                                            </>
                                        :
                                            <>
                                                <div class="py-3 px-4 pl-3 w-full text-center">
                                                    <div class="text-gray-400 mb-1.5">Não há notificações novas.</div>
                                                </div>
                                            </>
                                    }
                                </div>
                                <button onClick={() => {clearNotifications(props.userData.id)}} class="w-full block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                    <div class="inline-flex items-center ">
                                    <svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                                        Limpar notificações
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="home-dropdown">
                            <span className="sr-only">Abrir menu do usuário</span>
                            <img className="w-8 h-8 rounded-full" src={props.userAvatar} alt=""/>
                        </button>

                        <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="home-dropdown">
                            <div className="py-3 px-5">
                                <span className="block text-sm text-gray-900 dark:text-white">{props.userName}</span>
                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{props.userEmail}</span>
                            </div>
                            <ul className="py-1" aria-labelledby="dropdown">
                                <li>
                                    {
                                        props.userEmailVerified == true ?
                                            <a href="/shelf" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Minha Prateleira</a>
                                        :
                                            <div>
                                                <p data-tooltip-target="tooltip-not-verified" data-tooltip-placement="left" className="block py-2 px-4 text-sm text-gray-400 dark:text-gray-800">Minha Prateleira</p>
                                                <div id="tooltip-not-verified" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                    Verifique seu email para usar este recurso.
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </div>
                                    }
                                </li>
                                <li>
                                    <a href="/settings" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Configurações</a>
                                </li>
                                <li>
                                    <a href="/auth/logout" className="block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 dark:hover:text-white">Sair</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Abrir menu principal</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <a href="/home" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Início</a>
                            </li>
                            <li>
                                {
                                    props.userEmailVerified == true ?
                                        <a href="/shelf" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Minha Prateleira</a>
                                    :
                                        <div>
                                            <p data-tooltip-target="tooltip-not-verified-nav" data-tooltip-placement="bottom" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 md:border-0 md:p-0 dark:text-gray-400 dark:border-gray-700">Minha Prateleira</p>
                                            <div id="tooltip-not-verified-nav" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                Verifique seu email para usar este recurso.
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                }
                            </li>

                            <div class="flex mr-3 mt-3" id="searchBar">
                                <div class="relative md:hidden w-full">
                                    <div class="flex items-center">
                                        <div class="relative w-full">
                                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <input onChange={handleSearch} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." required/>
                                        </div>
                                        <button onClick={handleSearchButton} type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            <span class="sr-only">Buscar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    } else if(props.type == 'shelf'){
        return(          
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="#" className="flex">
                        <img className='className="mr-3' src='/logo white.png' style={{height: '50px'}}></img>
                    </a>

                    <div className="flex items-center md:order-2">

                        <div class="flex mr-3" id="searchBar">
                            <div class="hidden relative md:block">
                                <div class="flex items-center">
                                    <div class="relative w-full">
                                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <input onChange={handleSearch} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." required/>
                                    </div>
                                    <button onClick={handleSearchButton} type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        <span class="sr-only">Buscar</span>
                                    </button>
                                </div> 
                            </div>
                        </div>
                        
                        <div id="notifications" className="mr-3">
                            <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button"> 
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                                </svg>
                                <div class="flex relative">
                                    {
                                        props.userNotifications.length > 0 ?
                                            <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                            :
                                            <></>
                                    }
                                </div>
                            </button>
                            <div id="dropdownNotification" class="hidden z-20 w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton" style={{position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 10px)'}} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                                <div class="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white">
                                    Notificações
                                </div>
                                <div style={{maxHeight: '60vh', overflowY: 'scroll'}} class="divide-y divide-gray-100 dark:divide-gray-700" id="notifications-area">
                                    {
                                        props.userNotifications.length > 0 ?
                                            <>
                                            {
                                                props.userNotifications.map((notification) => {
                                                    return notification.action == "goTo" ?
                                                        <button onClick={() => {
                                                            clearNotification(props.userData.id, notification)
                                                            window.location.pathname != notification.actionArg ? window.location = notification.actionArg : null 
                                                        }} class="w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>?</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location.pathname == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        notification.action == "startBook" ?
                                                        <button onClick={() => {
                                                            addBookToUser(props.userData.id, 'reading', notification.actionArg)
                                                                .then(() => {
                                                                    if(props.userData.completed.length <= ranksPromotion[props.userData.rank-1]){
                                                                        demote(props.userData.id)
                                                                        newNotification(props.userData.id, 'rankDemotion', ranks[props.userData.rank-1], '/shelf', true, `/rank${props.userData.rank-1}.png`)
                                                                    }
                                                                })
                                                            removeBookFromUser(props.userData.id, 'wantTo', notification.actionArg)
                                                            removeBookFromUser(props.userData.id, 'completed', notification.actionArg)

                                                            clearNotification(props.userData.id, notification)
                                                        }} class="w-full w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>? Clique aqui para salvar como completo</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        notification.action == "finishBook" ?
                                                        <button onClick={() => {
                                                            addBookToUser(props.userData.id, 'completed', notification.actionArg)
                                                                .then(() => {
                                                                    if(props.userData.completed.length == ranksPromotion[props.userData.rank]-1){
                                                                        newNotification(props.userData.id, 'rankPromotion', ranks[props.userData.rank+1], '/shelf', true, `/rank${props.userData.rank+1}.png`)
                                                                        promote(props.userData.id)
                                                                    }
                                                                })
                                                            removeBookFromUser(props.userData.id, 'reading', notification.actionArg)
                                                            removeBookFromUser(props.userData.id, 'wantTo', notification.actionArg)

                                                            clearNotification(props.userData.id, notification)
                                                        }} class="w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>?</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        <></>
                                                })
                                            }
                                            </>
                                        :
                                            <>
                                                <div class="py-3 px-4 pl-3 w-full text-center">
                                                    <div class="text-gray-400 mb-1.5">Não há notificações novas.</div>
                                                </div>
                                            </>
                                    }
                                </div>
                                <button onClick={() => {clearNotifications(props.userData.id)}} class="w-full block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                    <div class="inline-flex items-center ">
                                    <svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                                        Limpar notificações
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="home-dropdown">
                            <span className="sr-only">Abrir menu do usuário</span>
                            <img className="w-8 h-8 rounded-full" src={props.userAvatar} alt=""/>
                        </button>

                        <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="home-dropdown">
                            <div className="py-3 px-5">
                                <span className="block text-sm text-gray-900 dark:text-white">{props.userName}</span>
                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{props.userEmail}</span>
                            </div>
                            <ul className="py-1" aria-labelledby="dropdown">
                                <li>
                                    {
                                        props.userEmailVerified == true ?
                                            <a href="/shelf" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Minha Prateleira</a>
                                        :
                                            <div>
                                                <p data-tooltip-target="tooltip-not-verified" data-tooltip-placement="left" className="block py-2 px-4 text-sm text-gray-400 dark:text-gray-800">Minha Prateleira</p>
                                                <div id="tooltip-not-verified" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                    Verifique seu email para usar este recurso.
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </div>
                                    }
                                </li>
                                <li>
                                    <a href="/settings" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Configurações</a>
                                </li>
                                <li>
                                    <a href="/auth/logout" className="block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 dark:hover:text-white">Sair</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Abrir menu principal</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                                <a href="/home" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Início</a>
                            </li>
                            <li>
                                {
                                    props.userEmailVerified == true ?
                                        <a href="/shelf" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Minha Prateleira</a>
                                    :
                                        <div>
                                            <p data-tooltip-target="tooltip-not-verified-nav" data-tooltip-placement="bottom" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 md:border-0 md:p-0 dark:text-white dark:border-gray-700">Minha Prateleira</p>
                                            <div id="tooltip-not-verified-nav" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                Verifique seu email para usar este recurso.
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    } else if(props.type == 'not-home'){
        return( 
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="#" className="flex">
                        <img className='className="mr-3' src='/logo white.png' style={{height: '50px'}}></img>
                    </a>
                    <div className="flex items-center md:order-2">

                        <div class="flex mr-3" id="searchBar">
                            <div class="hidden relative md:block">
                                <div class="flex items-center">
                                    <div class="relative w-full">
                                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <input onChange={handleSearch} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." required/>
                                    </div>
                                    <button onClick={handleSearchButton} type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        <span class="sr-only">Buscar</span>
                                    </button>
                                </div> 
                            </div>
                        </div>

                        <div id="notifications" className="mr-3">
                            <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button"> 
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                                </svg>
                                <div class="flex relative">
                                    {
                                        props.userNotifications.length > 0 ?
                                            <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                            :
                                            <></>
                                    }
                                </div>
                            </button>
                            <div id="dropdownNotification" class="hidden z-20 w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton" style={{position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 10px)'}} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                                <div class="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white">
                                    Notificações
                                </div>
                                <div style={{maxHeight: '60vh', overflowY: 'scroll'}} class="divide-y divide-gray-100 dark:divide-gray-700" id="notifications-area">
                                    {
                                        props.userNotifications.length > 0 ?
                                            <>
                                            {
                                                props.userNotifications.map((notification) => {
                                                    return notification.action == "goTo" ?
                                                        <button onClick={() => {
                                                            clearNotification(props.userData.id, notification)
                                                            window.location.pathname != notification.actionArg ? window.location = notification.actionArg : null 
                                                        }} class="w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>?</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location.pathname == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        notification.action == "startBook" ?
                                                        <button onClick={() => {
                                                            addBookToUser(props.userData.id, 'reading', notification.actionArg)
                                                                .then(() => {
                                                                    if(props.userData.completed.length <= ranksPromotion[props.userData.rank-1]){
                                                                        demote(props.userData.id)
                                                                        newNotification(props.userData.id, 'rankDemotion', ranks[props.userData.rank-1], '/shelf', true, `/rank${props.userData.rank-1}.png`)
                                                                    }
                                                                })
                                                            removeBookFromUser(props.userData.id, 'wantTo', notification.actionArg)
                                                            removeBookFromUser(props.userData.id, 'completed', notification.actionArg)

                                                            clearNotification(props.userData.id, notification)
                                                        }} class="w-full w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>? Clique aqui para salvar como completo</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        notification.action == "finishBook" ?
                                                        <button onClick={() => {
                                                            addBookToUser(props.userData.id, 'completed', notification.actionArg)
                                                                .then(() => {
                                                                    if(props.userData.completed.length == ranksPromotion[props.userData.rank]-1){
                                                                        newNotification(props.userData.id, 'rankPromotion', ranks[props.userData.rank+1], '/shelf', true, `/rank${props.userData.rank+1}.png`)
                                                                        promote(props.userData.id)
                                                                    }
                                                                })
                                                            removeBookFromUser(props.userData.id, 'reading', notification.actionArg)
                                                            removeBookFromUser(props.userData.id, 'wantTo', notification.actionArg)

                                                            clearNotification(props.userData.id, notification)
                                                        }} class="w-full flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <div class="flex-shrink-0">
                                                                { 
                                                                    notification.image ? 
                                                                        <img class="w-11 h-11" src={notification.src} alt="Jese image"/>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <div class="pl-3 w-full">
                                                                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notification.content.text} <span class="font-semibold text-gray-900 dark:text-white">{notification.content.arg}</span>{notification.type == 'readingBookReminder' ? <>?</> : notification.type == 'startBookReminder' ? <>?</> : <>.</>}</div>
                                                                <div class="text-xs mb-1 text-gray-400 dark:text-gray-500">Clique aqui para {notification.action == "goTo" && window.location == notification.actionArg ? <>dispensar.</> : notification.action == "goTo" ? <>ver.</> : notification.action == "startBook" ? <>adicionar à lista.</> : <>marcar como finalizado.</>}</div>
                                                                <div class="text-xs text-blue-600 dark:text-blue-500">
                                                                    {
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).days > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dias atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).days} dia atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).hours > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} horas atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).hours} hora atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).minutes > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minutos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).minutes} minuto atrás.</>
                                                                        :
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 0 ?
                                                                        getTimeDifference(notification.timestamp.toDate(), new Date()).seconds > 1 ?
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundos atrás.</>
                                                                            :
                                                                            <>{getTimeDifference(notification.timestamp.toDate(), new Date()).seconds} segundo atrás.</>
                                                                        :
                                                                        <>Agora mesmo.</>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                        :
                                                        <></>
                                                })
                                            }
                                            </>
                                        :
                                            <>
                                                <div class="py-3 px-4 pl-3 w-full text-center">
                                                    <div class="text-gray-400 mb-1.5">Não há notificações novas.</div>
                                                </div>
                                            </>
                                    }
                                </div>
                                <button onClick={() => {clearNotifications(props.userData.id)}} class="w-full block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                    <div class="inline-flex items-center ">
                                    <svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                                        Limpar notificações
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="home-dropdown">
                            <span className="sr-only">Abrir menu do usuário</span>
                            <img className="w-8 h-8 rounded-full" src={props.userAvatar} alt=""/>
                        </button>

                        <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="home-dropdown">
                            <div className="py-3 px-5">
                                <span className="block text-sm text-gray-900 dark:text-white">{props.userName}</span>
                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{props.userEmail}</span>
                            </div>
                            <ul className="py-1" aria-labelledby="dropdown">
                                <li>
                                    {
                                        props.userEmailVerified == true ?
                                            <a href="/shelf" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Minha Prateleira</a>
                                        :
                                            <div>
                                                <p data-tooltip-target="tooltip-not-verified" data-tooltip-placement="left" className="block py-2 px-4 text-sm text-gray-400 dark:text-gray-800">Minha Prateleira</p>
                                                <div id="tooltip-not-verified" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                    Verifique seu email para usar este recurso.
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </div>
                                    }
                                </li>
                                <li>
                                    <a href="/settings" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Configurações</a>
                                </li>
                                <li>
                                    <a href="/auth/logout" className="block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 dark:hover:text-white">Sair</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Abrir menu principal</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <a href="/home" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Início</a>
                            </li>
                            <li>
                                {
                                    props.userEmailVerified == true ?
                                        <a href="/shelf" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Minha Prateleira</a>
                                    :
                                        <div>
                                            <p data-tooltip-target="tooltip-not-verified-nav" data-tooltip-placement="bottom" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 md:border-0 md:p-0 dark:text-gray-400 dark:border-gray-700">Minha Prateleira</p>
                                            <div id="tooltip-not-verified-nav" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                Verifique seu email para usar este recurso.
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}