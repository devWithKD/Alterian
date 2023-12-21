import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder, StateField } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  // WidgetType,
  // MatchDecorator,
  // ViewPlugin,
  // ViewUpdate,
} from "@codemirror/view";

//TODO write a statefield to add customclasses to CodeInfo
// CodeBlock advanced Decoration has to be implied
// Refer https://discuss.codemirror.net/t/preferred-way-to-create-multi-line-widget/4865/3 for more info

const codeBlockMarker = Decoration.line({ class: "cm-codeblock" });
export const codeBlockTheme = EditorView.baseTheme({
  ".cm-line.cm-codeblock": {
    backgroundColor: "#838383",
    color: "#fff",
  },
  ".cm-line.cm-activeLine.cm-codeblock": {
    backgroundColor: "#939393",
    color: "#fff",
  },
  ".cm-codeblock-inactive": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    width: "100%",
  },
});
const CodeBlockField = StateField.define<DecorationSet>({
  create(state) {
    const builder = new RangeSetBuilder<Decoration>();
    syntaxTree(state).iterate({
      enter(node) {
        if (node.type.is("FencedCode")) {
          const firstLine = state.doc.lineAt(node.from).number;
          const lastLine = state.doc.lineAt(node.to).number;
          for (let i = firstLine; i <= lastLine; i++) {
            builder.add(
              state.doc.line(i).from,
              state.doc.line(i).from,
              codeBlockMarker
            );
          }
        }
      },
    });
    return builder.finish();
  },
  update(decorations, tr) {
    const builder = new RangeSetBuilder<Decoration>();
    decorations = decorations.map(tr.changes);
    syntaxTree(tr.state).iterate({
      enter(node) {
        if (node.type.is("FencedCode")) {
          const firstLine = tr.state.doc.lineAt(node.from).number;
          const lastLine = tr.state.doc.lineAt(node.to).number;
          for (let i = firstLine; i <= lastLine; i++) {
            builder.add(
              tr.state.doc.line(i).from,
              tr.state.doc.line(i).from,
              codeBlockMarker
            );
          }
        }
      },
    });
    const newRangeSet = builder.finish();
    return newRangeSet.update({ sort: true });
  },
  provide(field) {
    return EditorView.decorations.from(field);
  },
});

export default CodeBlockField;
