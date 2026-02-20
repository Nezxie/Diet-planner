import {useState} from "react";
import './styles/SearchBar.css'

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
        <form onSubmit={handleSubmit} className="search-form">
            <input name="query" onChange={handleTextInput} value={query}></input>
            <button type="submit" className="search-button">Search</button>
        </form>
    )
}
