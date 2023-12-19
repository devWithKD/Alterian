import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder, StateField } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
  MatchDecorator,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";

//TODO write a statefield to add customclasses to CodeInfo

const codeBlockMarker = Decoration.line({ class: "cm-codeblock" });

// class codeblockMakerWidget extends WidgetType {
//   value: RegExpExecArray;
//   constructor(value: RegExpExecArray) {
//     super();
//     this.value = value;
//   }
//   toDOM(): HTMLElement {
//     const div = document.createElement("div");
//     div.innerHTML = "";
//     div.className = "cm-codeblock-inactive";
//     return div;
//   }
//   ignoreEvent(): boolean {
//     return true;
//   }
// }

// const codeblockMatcher = new MatchDecorator({
//   regexp: /`{2,2}(\s|[\n\r]|.+){0,}`/g,
//   decorate(add, from, to, match, view) {
//     const state = view.state;
//     const currentLine = state.doc.lineAt(state.selection.main.head);
//     const currentLineNum = currentLine.number;
//     console.log(from, to, currentLineNum);

//     syntaxTree(view.state).iterate({
//       enter(node) {
//         if (node.type.is("FencedCode")) {
//           const nodeStartLine = view.state.doc.lineAt(node.from).number;
//           const nodeEndLine = view.state.doc.lineAt(node.to).number;
//           if (
//             !(currentLineNum >= nodeStartLine && currentLineNum <= nodeEndLine)
//           ) {
//             const newCodeBlock = new codeblockMakerWidget(match);
//             add(from, to, Decoration.widget({ widget: newCodeBlock }));
//           }
//         }
//       },
//     });

//     // add(from, to, Decoration.widget({ widget: newCodeBlock }));
//   },
// });

// export const FoldCodeBlockTags = ViewPlugin.fromClass(
//   class {
//     foldedTags: DecorationSet;
//     constructor(view: EditorView) {
//       this.foldedTags = codeblockMatcher.createDeco(view);
//     }
//     update(update: ViewUpdate) {
//       this.foldedTags = codeblockMatcher.updateDeco(update, this.foldedTags);
//     }
//   },
//   {
//     decorations: (instance) => instance.foldedTags,
//     provide: (plugin) =>
//       EditorView.atomicRanges.of(
//         (view) => view.plugin(plugin)?.foldedTags || Decoration.none
//       ),
//   }
// );

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
