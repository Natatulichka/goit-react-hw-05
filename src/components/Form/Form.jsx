import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import css from "./Form.module.css";

function Form({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(query);
    setQuery("");
  };

  return (
    <form className={css.box} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter Movie"
      />
      <button className={css.btn} type="submit">
        <span className={css.spanBtn}>Search</span>
        <FiSearch size="16px" />
      </button>
    </form>
  );
}

export default Form;
