import React, { useContext, useState } from 'react'
import { TranscriptContext } from './contexts/TranscriptContext'
const MicRecorder = require('mic-recorder-to-mp3')

const RecordAudio = () => {

    const { setTextToInsert } = useContext(TranscriptContext)

    const [isRecording, setIsRecording] = useState(false)

    const recorder = new MicRecorder({
        bitRate: 128
    })
    const recordAudio = () => {
        recorder.start().then(() => {
            setIsRecording(true)
        }).catch(err => console.error(err))
    }

    const stopAudio = () => {
        setIsRecording(false)
        recorder.stop().getMp3().then(([buffer, blob]) => {
            const file = new File(buffer, 'file.mp3', { type: blob.type, lastModified: Date.now() })
            sendAudio(file)
        })
    }

    const sendAudio = (file) => {
        const formData = new FormData()
        formData.append('audio', file, `${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}.wav`)
        fetch('http://localhost:5000', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(jsonResponse => {
            console.log(jsonResponse)
            setTextToInsert(jsonResponse)
        })
    }

    return (
        <div>
            {!isRecording ?
                <button onClick={recordAudio}>Start</button> :
                <button onClick={stopAudio}>Stop</button>
            }
        </div>
    )
}

export default RecordAudio