import React, { createContext, useState } from 'react'

export const TranscriptContext = createContext()

export const TranscriptProvider = (props) => {
    const [textToInsert, setTextToInsert] = useState('')
    return (
        <TranscriptContext.Provider value={{textToInsert, setTextToInsert}}>
            {props.children}
        </TranscriptContext.Provider>
    )
}