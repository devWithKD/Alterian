import { useEffect, useRef } from "react";

interface props {
  onChange: (val: string | undefined) => void;
  onKeyDown: (
    val: string | undefined,
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  text: string;
}

const ContentEditable = (props: props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  });
  return (
    <textarea
      ref={textAreaRef}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      className="textRenderer w-full focus:outline-none bg-inherit h-auto flex resize-none"
      value={props.text}
      name="textarea"
      autoFocus={true}
      onFocus={(e) =>
        e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length
        )
      }
      onKeyDown={(e) => {
        props.onKeyDown(props.text, e);
      }}
      style={{ minHeight: "1rem" }}
    ></textarea>
  );
};

export default ContentEditable;
