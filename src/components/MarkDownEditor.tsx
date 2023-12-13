import { EditorView, basicSetup } from "codemirror";
import { useEffect, useRef } from "react";
import { Compartment, EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";

function MarkDownEditor() {
  let language = new Compartment;
  let state = EditorState.create({
    extensions: [
      basicSetup,
      language.of(markdown())
    ]
  })
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!editorRef.current) return;
    const editor = new EditorView({
      state,
      parent: editorRef.current,
    });
    return () => {
      editor.destroy();
    };
  }, []);
  return <div ref={editorRef}></div>;
}

export default MarkDownEditor;
