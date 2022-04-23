import React, { useContext, useState } from 'react'
import { TranscriptContext } from '../contexts/TranscriptContext'
import { ReactComponent as Microphone } from '../assets/microphone.svg'
import { ReactComponent as Square } from '../assets/square.svg'
import { ReactComponent as Download } from '../assets/download.svg'
import stylesheet from './RecordAudio.module.css'
const MicRecorder = require('mic-recorder-to-mp3')

const RecordAudio = () => {

    const { setTextToInsert, currentText } = useContext(TranscriptContext)

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
            if (jsonResponse) setTextToInsert(`${jsonResponse} `)
        })
    }

    const downloadTxtFile = () => {
        const element = document.createElement('a')
        const file = new Blob([currentText], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = "transcript.txt"
        document.body.appendChild(element)
        element.click()
    }

    return (
        <div className={stylesheet.container}>
            <div onClick={downloadTxtFile} className={stylesheet.buttons} style={{ backgroundColor: 'black' }}>
                <Download width='25px' fill='white' />
            </div>
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