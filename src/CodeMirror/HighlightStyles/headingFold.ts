import {
  MatchDecorator,
  Decoration,
  ViewPlugin,
  DecorationSet,
  ViewUpdate,
  WidgetType,
  EditorView,
} from "@codemirror/view";

function getHashNum(str: string) {
  const elements = str.split("");
  const hashes = elements.filter((el) => el == "#");
  return hashes.length;
}

class NullWidget extends WidgetType {
  value: RegExpExecArray;
  constructor(value: RegExpExecArray) {
    super();
    this.value = value;
  }
  toDOM(): HTMLElement {
    const span = document.createElement("span");
    const hashNum = getHashNum(this.value[0]);
    span.textContent = `Heading ${hashNum}`;
    span.className = `cm-heading-placeholder cm-heading-${hashNum}`;
    // console.log(this.value.input);

    if (this.value[0].length < this.value.input.length) {
      span.style.display = "none";
    }
    return span;
  }
  ignoreEvent(): boolean {
    return true;
  }
}

export const FoldableHeadingsTheme = EditorView.baseTheme({
  ".cm-activeLine.cm-line .cm-heading-placeholder": {
    fontWeight: "bold",
    color: "#bebebe",
  },
  ".cm-heading-placeholder.cm-heading-1": { fontSize: "200%" },
  ".cm-heading-placeholder.cm-heading-2": { fontSize: "150%" },
  ".cm-heading-placeholder.cm-heading-3": { fontSize: "117%" },
  ".cm-heading-placeholder.cm-heading-4": { fontSize: "100%" },
  ".cm-heading-placeholder.cm-heading-5": { fontSize: "83%" },
  ".cm-heading-placeholder.cm-heading-6": { fontSize: "67%" },
  ".cm-line:not(.cm-activeLine) > .cm-heading-placeholder": {
    display: "none",
  },
});

const headingMatcher = new MatchDecorator({
  regexp: /^#{1,6}\s(?!\s|#)/g,
  // regexp: /^#{1,6}\s/g,
  decoration: (match) => {
    console.log(match);

    return Decoration.replace({ widget: new NullWidget(match) });
  },
});

const FoldableHeadings = ViewPlugin.fromClass(
  class {
    hiddenHashes: DecorationSet;
    constructor(view: EditorView) {
      this.hiddenHashes = headingMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.hiddenHashes = headingMatcher.updateDeco(update, this.hiddenHashes);
    }
  },
  {
    decorations: (instance) => instance.hiddenHashes,
    provide: (plugin) =>
      EditorView.atomicRanges.of((view) => {
        return view.plugin(plugin)?.hiddenHashes || Decoration.none;
      }),
  }
);

export default FoldableHeadings;
