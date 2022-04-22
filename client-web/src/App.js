import logo from './logo.svg';
import './App.css';
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

function App() {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  const sendAudioFile = (file) => {
    const formData = new FormData()
    formData.append('file', file, 'audio.wav')
    return fetch('http://localhost:5000', {
      headers: {
        Accept: "application/json"
      }, method: 'POST',
      body: formData
    })
  }

  const onStopRecording = async () => {
    stopRecording()
    const blob = await fetch(mediaBlobUrl).then(r => r.blob())
    sendAudioFile(blob)
  }

  console.log(status)

  return (
    <div className="App">
      <header className="App-header">
        {status == 'idle' || status == 'stopped' ?
          <button onClick={startRecording}>Start Recording</button>
          :
          <button onClick={onStopRecording}>Stop Recording</button>
        }
      </header>
    </div>
  );
}

export default App;
