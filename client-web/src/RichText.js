import React, { Component } from 'react';
import { EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TranscriptContext } from './contexts/TranscriptContext';

class EditorConvertToHTML extends Component {
  static contextType = TranscriptContext
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), textToInsert: '' };
  }

  componentDidMount() {
    this.focusEditor();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.context.textToInsert != prevState.textToInsert) {
      // set state as text to insert -> so to avoid infinte loops
      // call send text to editor
      this.state.textToInsert = this.context.textToInsert;
      this.sendTextToEditor(this.context.textToInsert)
    }
  }

  setEditor = (editor) => {
    this.editor = editor;
  };

  focusEditor = () => {
    if (this.editor) {
      this.editor.focusEditor();
      console.log("1. Editor has the focus now");
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  sendTextToEditor = (text) => {
    this.setState({ editorState: this.insertText(text, this.state.editorState) });
    this.focusEditor();
  }

  insertText = (text, editorState) => {
    const currentContent = editorState.getCurrentContent(),
      currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text
    );

    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  }

  render() {
    const { editorState } = this.state;
    return (
      <div style={{ padding: 10 }}>
        <Editor
          ref={this.setEditor}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default EditorConvertToHTML;