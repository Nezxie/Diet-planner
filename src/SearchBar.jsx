import {useState} from "react";

export default function SearchBar({onSubmit}){
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
            <button type="submit">Search</button>
        </form>
    )
}
