import {useState} from 'react'
import SearchBar from "./SearchBar.jsx"
import ProductList from './ProductList.jsx'
import {getFoodList,getFoodItemInfo} from './getAPIData.js'

export default function Recipe ({}){
    const [foodList, setFoodList] = useState(null);
    async function onSearch(query){
        const searchResults = await getFoodList(query);
        setFoodList(searchResults);
    }

    return(
        <>
        <SearchBar onSubmit={onSearch}/>
        {foodList&&<ProductList foodList={foodList}/>}
        </>
    );
}