import {useState} from "react";

export default function SearchBar({strictSearch, onSubmit, onCheckbox}){
    const [query, setQuery] = useState("");
    
    function handleTextInput(e){
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(query);
    }

      return(
        <form onSubmit={handleSubmit}>
            <input name="query" onChange={handleTextInput} value={query}></input>
            <label htmlFor="checkbox">Require all words?</label>
            <input id="checkbox" type="checkbox" onChange={onCheckbox} checked={strictSearch}></input>
            <button type="submit">Search</button>
        </form>
    )
}
