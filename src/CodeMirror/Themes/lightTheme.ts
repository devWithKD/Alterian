import { EditorView } from "codemirror";

const lightTheme = EditorView.theme({
  "&": {
    color: "black",
    backgroundColor: "#fafafa",
    fontSize: "1rem",
  },
  ".cm-gutters": {
    display: "none",
  },
  ".cm-activeLine": { backgroundColor: "#fafafa" },
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
});

export default lightTheme;
