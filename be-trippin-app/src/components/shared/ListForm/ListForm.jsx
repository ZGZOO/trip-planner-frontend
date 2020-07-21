import React, { useState } from "react";
import "./ListForm.scss";

const ListForm = ({ handlePackListSubmit }) => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    console.log("handle change", event.target.value);
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePackListSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="list"></label>
      <input name="list" type="text" onChange={handleChange} value={input} />
      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ListForm;
