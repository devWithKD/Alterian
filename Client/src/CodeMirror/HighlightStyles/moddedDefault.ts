import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const modedDefaultHightLightStyle = HighlightStyle.define([
  { tag: tags.meta, color: "#404740" },
  { tag: tags.link, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.keyword, color: "#708" },
  {
    tag: [
      tags.atom,
      tags.bool,
      tags.url,
      tags.contentSeparator,
      tags.labelName,
    ],
    color: "#219",
  },
  { tag: [tags.literal, tags.inserted], color: "#164" },
  { tag: [tags.string, tags.deleted], color: "#a11" },
  {
    tag: [tags.regexp, tags.escape, /*@__PURE__*/ tags.special(tags.string)],
    color: "#e40",
  },
  { tag: /*@__PURE__*/ tags.definition(tags.variableName), color: "#00f" },
  { tag: /*@__PURE__*/ tags.local(tags.variableName), color: "#30a" },
  { tag: [tags.typeName, tags.namespace], color: "#085" },
  { tag: tags.className, color: "#167" },
  {
    tag: [/*@__PURE__*/ tags.special(tags.variableName), tags.macroName],
    color: "#256",
  },
  { tag: /*@__PURE__*/ tags.definition(tags.propertyName), color: "#00c" },
  { tag: tags.comment, color: "#940" },
  { tag: tags.invalid, color: "#f00" },
]);
export default modedDefaultHightLightStyle;
