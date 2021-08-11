import React, { useState, useEffect } from "react";
import "./editableText.scss";

const EditableText = ({ value, className, handleSubmit }) => {
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setEditing(false);
  };

  if (!editing) {
    return (
      <span
        className={`${className} editable-text`}
        onClick={() => setEditing(true)}
      >
        {text}
      </span>
    );
  } else {
    return (
      <form className="editable-text" onSubmit={submitForm}>
        <input
          className={className}
          type="text"
          value={text}
          onChange={handleChange}
        />
        <input className="submit-button" type="submit" />
      </form>
    );
  }
};

export default EditableText;
