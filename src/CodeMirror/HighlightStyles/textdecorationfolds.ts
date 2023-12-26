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
    return this.type !== other.type;
  }
  toDOM(): HTMLElement {
    const span = document.createElement("span");
    span.className = "cm-custom-text";
    const substring = document.createElement("span");
    substring.className =
      this.type === "bold"
        ? "cm-strong"
        : this.type === "strikethrough"
        ? "cm-strikethrough"
        : this.type === "italic"
        ? "cm-emphasis"
        : "cm-underline";

    substring.innerText = this.visibleVal;
    span.appendChild(substring);
    return span;
  }
  ignoreEvent(): boolean {
    return false;
  }
}

export const CustomTextTheme = EditorView.baseTheme({
  ".cm-strong": {
    fontWeight: "bold",
  },
  ".cm-strikethrough": {
    textDecoration: "line-through",
  },
  ".cm-emphasis": {
    fontStyle: "italic",
  },
  ".cm-underline": {
    textDecoration: "underline",
  },
});

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
    const strongText = new CustomWidget(match[1], "bold");
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
    const emphasisText = new CustomWidget(match[1], "italic");
    return Decoration.widget({ widget: emphasisText });
  },
});

export const FoldEmphasisTags = ViewPlugin.fromClass(
  class {
    foldEmphasis: DecorationSet;
    constructor(readonly view: EditorView) {
      this.foldEmphasis = EmphasisTagMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.foldEmphasis = EmphasisTagMatcher.updateDeco(
        update,
        this.foldEmphasis
      );
    }
  },
  {
    decorations: (state) => state.foldEmphasis,
    provide: (plugin) =>
      EditorView.decorations.of(
        (view) => view.plugin(plugin)?.foldEmphasis || Decoration.none
      ),
  }
);

//////////////////////////////////////////////////////////////////////////

/////////////////////// Underline Synteax //////////////////////////////////

const UnderlineTagMatcher = new MatchDecorator({
  regexp: /<u>(.*?)<\/u>/g,
  decoration(match) {
    const underlineText = new CustomWidget(match[1], "underline");
    return Decoration.widget({ widget: underlineText });
  },
});

export const FoldUnderlineTags = ViewPlugin.fromClass(
  class {
    foldUnderlines: DecorationSet;
    constructor(readonly view: EditorView) {
      this.foldUnderlines = UnderlineTagMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.foldUnderlines = UnderlineTagMatcher.updateDeco(
        update,
        this.foldUnderlines
      );
    }
  },
  {
    decorations: (state) => state.foldUnderlines,
    provide: (plugin) =>
      EditorView.decorations.of(
        (view) => view.plugin(plugin)?.foldUnderlines || Decoration.none
      ),
  }
);

//////////////////////////////////////////////////////////////////////////

/////////////////////////// Bulleted List ////////////////////////////////

class BulletedListItem extends WidgetType {
  constructor() {
    super();
  }
  toDOM(): HTMLElement {
    const span = document.createElement("span");
    span.innerText = "• ";
    span.className = "cm-custombullet";
    return span;
  }
}

const bulletedListTagMatcher = new MatchDecorator({
  regexp: /^-\s(?!\s|-)/g,
  decoration() {
    return Decoration.replace({ widget: new BulletedListItem() });
  },
});

export const BulletedListTags = ViewPlugin.fromClass(
  class {
    bulletedListItems: DecorationSet;
    constructor(readonly view: EditorView) {
      this.bulletedListItems = bulletedListTagMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.bulletedListItems = bulletedListTagMatcher.updateDeco(
        update,
        this.bulletedListItems
      );
    }
  },
  {
    decorations: (state) => state.bulletedListItems,
    provide: (plugin) =>
      EditorView.decorations.of(
        (view) => view.plugin(plugin)?.bulletedListItems || Decoration.none
      ),
  }
);
