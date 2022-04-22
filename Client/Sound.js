import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { Audio } from 'expo-av'

const Sound = () => {
    const [recording, setRecording] = useState(null)
    // const [recordingURL, setRecordingURL] = useState('')
    const [recordings, setRecordings] = useState({})

    const startRecording = async () => {
        try {

            const permission = await Audio.requestPermissionsAsync()
            if (permission.status === 'granted') {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                })

                const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)

                setRecording(recording);
            }
        }
        catch (err) {
            console.error("Failed to start recording", err)
        }
    }

    const stopRecording = async () => {
        setRecording(undefined)

        // let updatedRecordings = [...recordings]

        await recording.stopAndUnloadAsync();

        const { sound, status } = await recording.createNewLoadedSoundAsync();

        let recordingsObj = { sound: sound, file: recording.getURI() }

        setRecordings(recordingsObj)
    }

    const [audioRecorded, setAudioRecorded] = useState(false)

    console.log(recordings.file)

    return (
        <View>
            <Button title={recording ? "Stop Recording" : "Start Recording"} onPress={recording ? stopRecording : startRecording} />
            {audioRecorded ? <Button title='play sound' /> : null}
            {recordings?
            <Button onPress={() => recordings.sound.replayAsync()} title='play sound'/>
            :null
            }
            <Text>Sound</Text>
        </View>
    )
}

export default Sound