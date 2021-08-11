import React, { useState } from "react";
import "./ListForm.scss";

const ListForm = ({ handleSubmit, placeholder }) => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    // console.log("handle change", event.target.value);
    setInput(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(input);
    setInput("");
  };

  return (
    <form className="list-form" onSubmit={submitForm}>
      <label htmlFor="list"></label>
      <input
        name="list"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={input}
        className="list-input"
      />
      {/* <button className="submit-button" type="submit">
        &plus;
      </button> */}
      <input type="submit" value="&#43;" className="submit-button" />
    </form>
  );
};

export default ListForm;
