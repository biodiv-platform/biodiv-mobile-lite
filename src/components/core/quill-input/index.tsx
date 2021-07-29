import "quill/dist/quill.snow.css";
import "./quill.css";

import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";

interface QuillInputProps {
  value?;
  onChange;
}

const QuillInput = ({ value: EValue, onChange }: QuillInputProps) => {
  const [value, setValue] = useState(EValue);

  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike", "link"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"]
      ]
    }
  });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(value || "");

      quill.on("text-change", () => {
        setValue(quill.root.innerHTML);
      });
    }
  }, [quill]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  /*
   * diffing before hard updating quill
   * This is useful when key gets updated externally
   * for example importing `BibTex` file
   */
  useEffect(() => {
    if (EValue !== value) {
      quill.clipboard.dangerouslyPasteHTML(EValue);
    }
  }, [EValue]);

  return (
    <div className="ql-box">
      <div ref={quillRef} />
    </div>
  );
};

export default QuillInput;
