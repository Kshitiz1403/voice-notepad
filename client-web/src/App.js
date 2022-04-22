import './App.css';
import { TranscriptProvider } from './contexts/TranscriptContext';
import RecordAudio from './RecordAudio/RecordAudio';
import EditorConvertToHTML from './RichText/RichText';

const App = () => {

  return (
    <TranscriptProvider>
      <EditorConvertToHTML />
      <RecordAudio />
    </TranscriptProvider>
  );
}

export default App;
