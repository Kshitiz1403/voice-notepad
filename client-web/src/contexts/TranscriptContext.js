import React, { createContext, useState } from 'react'

export const TranscriptContext = createContext()

export const TranscriptProvider = (props) => {
    const [textToInsert, setTextToInsert] = useState('')
    const [currentText, setCurrentText] = useState('')
    return (
        <TranscriptContext.Provider value={{
            textToInsert, setTextToInsert, currentText, setCurrentText
        }}>
            {props.children}
        </TranscriptContext.Provider>
    )
}