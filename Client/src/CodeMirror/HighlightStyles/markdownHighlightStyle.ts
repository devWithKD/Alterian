import { HighlightStyle } from "@codemirror/language";
import { tags, 
  // Tag, styleTags 
} from "@lezer/highlight";
// import { MarkdownConfig } from "@lezer/markdown";


///  Debug ///
// const customTags = {
//   CodeInfo: Tag.define(),
// }
 
// export const CodeBlockStyling: MarkdownConfig = {
//   props: [
//     styleTags({
//       CodeInfo: customTags.CodeInfo
//     })
//   ]
// }
///  Debug ///

const markdownHighlightStyle = HighlightStyle.define([
  { tag: tags.heading, textDecoration: "none" },
  { tag: tags.heading1, fontSize: "200%", fontWeight: "bolder" },
  { tag: tags.heading2, fontSize: "150%", fontWeight: "bolder" },
  { tag: tags.heading3, fontSize: "117%", fontWeight: "bolder" },
  { tag: tags.heading4, fontSize: "100%", fontWeight: "bolder" },
  { tag: tags.heading5, fontSize: "83%", fontWeight: "bolder" },
  { tag: tags.heading6, fontSize: "67%", fontWeight: "bolder" },
  // {tag: customTags.CodeInfo, display: "none"} // Debug
]);

export default markdownHighlightStyle;