import React, { useContext, useState } from 'react'
import { TranscriptContext } from '../contexts/TranscriptContext'
import { ReactComponent as Microphone } from '../assets/microphone.svg'
import { ReactComponent as Square } from '../assets/square.svg'
import stylesheet from './RecordAudio.module.css'
const MicRecorder = require('mic-recorder-to-mp3')

const RecordAudio = () => {

    const { setTextToInsert } = useContext(TranscriptContext)

    const [isRecording, setIsRecording] = useState(false)

    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));

    const recordAudio = async () => {

        Mp3Recorder.start().then(() => {
            setIsRecording(true)
        }).catch(err => console.error(err))
    }

    const stopAudio = async () => {

        Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
            const file = new File(buffer, 'file.mp3', { type: blob.type, lastModified: Date.now() })
            setIsRecording(false)
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
            setTextToInsert(`${jsonResponse} `)
        })
    }

    return (
        <div className={stylesheet.container}>
            {isRecording ?
                <div onClick={stopAudio} className={stylesheet.buttons} >
                    <Square width='25px' fill='white' />
                </div> :
                <div onClick={recordAudio} className={stylesheet.buttons}>
                    <Microphone width='27px' fill='white' />
                </div>
            }

        </div>
    )
}

export default RecordAudio