import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const markdownHighlightStyle = HighlightStyle.define([
  { tag: tags.heading, textDecoration: "none" },
  { tag: tags.heading1, fontSize: "200%", fontWeight: "bolder" },
  { tag: tags.heading2, fontSize: "150%", fontWeight: "bolder" },
  { tag: tags.heading3, fontSize: "117%", fontWeight: "bolder" },
  { tag: tags.heading4, fontSize: "100%", fontWeight: "bolder" },
  { tag: tags.heading5, fontSize: "83%", fontWeight: "bolder" },
  { tag: tags.heading6, fontSize: "67%", fontWeight: "bolder" },
]);

export default markdownHighlightStyle;