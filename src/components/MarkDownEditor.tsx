import { EditorView, basicSetup } from "codemirror";
import { useEffect, useRef } from "react";
import { Compartment, EditorState } from "@codemirror/state";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { syntaxHighlighting } from "@codemirror/language";
import modedDefaultHightLightStyle from "../CodeMirror/HighlightStyles/moddedDefault";
import lightTheme from "../CodeMirror/Themes/lightTheme";
import markdownHighlightStyle, {
  MarkStylingExtention,
} from "../CodeMirror/HighlightStyles/markdownHighlightStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { updateBody } from "../state/notes/notesSlice";
import FoldableHeadings, {
  FoldableHeadingsTheme,
} from "../CodeMirror/HighlightStyles/headingFold";

interface MarkDownEditorProps {
  noteID: string;
}

function MarkDownEditor(props: MarkDownEditorProps) {
  const noteBody = useSelector((state: RootState) => {
    const note = state.notes.filter((_note) => _note.id === props.noteID)[0];
    return note.body;
  });
  const dispatch = useDispatch();

  const onBlur = EditorView.domEventHandlers({
    blur: (_e, view) => {
      if (noteBody !== view.state.doc.toString()) {
        dispatch(
          updateBody({ id: props.noteID, body: view.state.doc.toString() })
        );
      }
    },
  });

  const language = new Compartment();
  const state = EditorState.create({
    doc: noteBody,
    extensions: [
      basicSetup,
      language.of(
        markdown({ base: markdownLanguage, extensions: [MarkStylingExtention] })
      ),
      lightTheme,
      onBlur,
      FoldableHeadings,
      FoldableHeadingsTheme,
      syntaxHighlighting(markdownHighlightStyle),
      syntaxHighlighting(modedDefaultHightLightStyle),
    ],
  });
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
  }, [state]);
  return <div ref={editorRef}></div>;
}

export default MarkDownEditor;
