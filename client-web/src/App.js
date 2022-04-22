import './App.css';
const MicRecorder = require('mic-recorder-to-mp3')

const App = () => {
  const recorder = new MicRecorder({
    bitRate: 128
  })
  const recordAudio = () => {


    recorder.start().then(() => {

    }).catch(err => console.error(err))
  }

  const sendAudio = (file) => {
    const formData = new FormData()
    formData.append('file', file, `${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}.wav`)
    fetch('http://localhost:5000', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(jsonResponse => console.log(jsonResponse))
  }

  const stopAudio = () => {
    recorder.stop().getMp3().then(([buffer, blob]) => {
      const file = new File(buffer, 'file.mp3', { type: blob.type, lastModified: Date.now() })
      sendAudio(file)
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={recordAudio}>Start</button>
        <button onClick={stopAudio}>Stop</button>
      </header>
    </div>
  );
}

export default App;
