import React from "react";

const emojis = {
    'success': '✔️',
    'error': '❌',
    'warning': '⚠️'
}

export default function Toast(props){
    return(
        <div class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                {emojis[props.type]}
            </div>
            <div class="ml-3 text-sm font-normal">{props.message}</div>
        </div>
    )
}