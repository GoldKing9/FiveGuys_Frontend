import React, { useEffect } from 'react';
import { OnMount } from '@monaco-editor/react'
import { useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  fontSize: number;
}



const CodeEditor:React.FC<CodeEditorProps> = ({ fontSize }) => {

  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const  handleEditorDidMount: OnMount = (editor, monaco) => {
  
    editorRef.current = editor;
  }

  useEffect(() => {
    if (editorRef.current) {

      monaco.editor.setModelLanguage(editorRef.current.getModel()!, 'javascript');
      monaco.editor.setTheme('vs-dark');
      editorRef.current.updateOptions({ fontSize: fontSize });
    }
  }, [fontSize]);



  return (
    <>
      <Editor 
        height='100%'
        defaultLanguage='javascript'
        theme='vs-dark'
        onMount={handleEditorDidMount}
        options={{
          fontSize: fontSize,
          minimap: {enabled: false},
          scrollbar: {
              vertical: 'auto',
              horizontal: 'auto'
          }
      }} 
      />
    </>
  );
};

export default CodeEditor;