import {
  DecorationSet,
  Decoration,
  ViewUpdate,
  EditorView,
  ViewPlugin,
  MatchDecorator,
  WidgetType,
} from "@codemirror/view";

////////////////////////// Custom Synteax /////////////////////////////

class CustomWidget extends WidgetType {
  constructor(readonly visibleVal: string, readonly type: string) {
    super();
  }
  eq(other: CustomWidget) {
    return this.visibleVal === other.visibleVal;
  }
  toDOM(): HTMLElement {
    const span = document.createElement("span");
    const substring = document.createElement(
      this.type === "bold"
        ? "strong"
        : this.type === "strikethrough"
        ? "s"
        : this.type === "italic"
        ? "em"
        : "u"
    );
    console.log(this.type);
    substring.innerText = this.visibleVal;
    span.appendChild(substring);
    return span;
  }
  ignoreEvent(): boolean {
    return false;
  }
}

/////////////////// StrikeThrough Synteax /////////////////////////////

const strikeTagMatcher = new MatchDecorator({
  regexp: /~~(.*?)~~/g,
  decoration(match) {
    const strikeThrough = new CustomWidget(match[1], "strikethrough");
    return Decoration.widget({ widget: strikeThrough });
  },
});

export const FoldStrikeTags = ViewPlugin.fromClass(
  class {
    foldedStrikeTags: DecorationSet;
    constructor(view: EditorView) {
      this.foldedStrikeTags = strikeTagMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.foldedStrikeTags = strikeTagMatcher.updateDeco(
        update,
        this.foldedStrikeTags
      );
    }
  },
  {
    decorations: (instance) => instance.foldedStrikeTags,
    provide: (plugin) =>
      EditorView.decorations.of((view) => {
        return view.plugin(plugin)?.foldedStrikeTags || Decoration.none;
      }),
  }
);

///////////////////////////////////////////////////////////////////////

/////////////////////// Bold Synteax //////////////////////////////////

const StrongTagMatcher = new MatchDecorator({
  regexp: /\*\*(.*?)\*\*/g,
  decoration(match) {
    const strongText = new CustomWidget(match[1],"bold");
    return Decoration.widget({ widget: strongText });
  },
});

export const FoldStrongTags = ViewPlugin.fromClass(
  class {
    foldStrongs: DecorationSet;
    constructor(readonly view: EditorView) {
      this.foldStrongs = StrongTagMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.foldStrongs = StrongTagMatcher.updateDeco(update, this.foldStrongs);
    }
  },
  {
    decorations: (state) => state.foldStrongs,
    provide: (plugin) =>
      EditorView.decorations.of(
        (view) => view.plugin(plugin)?.foldStrongs || Decoration.none
      ),
  }
);

//////////////////////////////////////////////////////////////////////////

/////////////////////// Italic Synteax //////////////////////////////////

const EmphasisTagMatcher = new MatchDecorator({
  regexp: /(?<!\*)\*([^*\r\n\s].*?)\*/g,
  decoration(match) {
    const strongText = new CustomWidget(match[1],"italic");
    return Decoration.widget({ widget: strongText });
  },
});

export const FoldEmphasisTags = ViewPlugin.fromClass(
  class {
    foldStrongs: DecorationSet;
    constructor(readonly view: EditorView) {
      this.foldStrongs = EmphasisTagMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.foldStrongs = EmphasisTagMatcher.updateDeco(update, this.foldStrongs);
    }
  },
  {
    decorations: (state) => state.foldStrongs,
    provide: (plugin) =>
      EditorView.decorations.of(
        (view) => view.plugin(plugin)?.foldStrongs || Decoration.none
      ),
  }
);

//////////////////////////////////////////////////////////////////////////

/////////////////////// Underline Synteax //////////////////////////////////

const UnderlineTagMatcher = new MatchDecorator({
  regexp: /<u>(.*?)<\/u>/g,
  decoration(match) {
    const strongText = new CustomWidget(match[1],"underline");
    return Decoration.widget({ widget: strongText });
  },
});

export const FoldUnderlineTags = ViewPlugin.fromClass(
  class {
    foldStrongs: DecorationSet;
    constructor(readonly view: EditorView) {
      this.foldStrongs = UnderlineTagMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.foldStrongs = UnderlineTagMatcher.updateDeco(update, this.foldStrongs);
    }
  },
  {
    decorations: (state) => state.foldStrongs,
    provide: (plugin) =>
      EditorView.decorations.of(
        (view) => view.plugin(plugin)?.foldStrongs || Decoration.none
      ),
  }
);

//////////////////////////////////////////////////////////////////////////

// (?:\*\*|~~|\*)((?:\*\*|~~|\*)?[^*~]+(?:\*\*|~~|\*)?)(?:\*\*|~~|\*)
