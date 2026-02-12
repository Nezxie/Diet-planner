import {useState, useEffect} from "react";
import SearchBar from './SearchBar.jsx'
import {getFoodList, getFoodItemInfo, foodCategoriesEmojiDictionary} from "./getAPIData.js"


export default function ProductList(showSearchBar){
    const [foodList, setFoodList] = useState("");
    const [strictSearch, setStrictSearch] = useState(false);
    const APIConfig = {
            "dataTypeFilter":"Foundation",
            "pageSize":25,
            "sortBy":"lowercaseDescription.keyword",
            "requireAllWords":strictSearch
        }

    async function onFormSubmit(query){
        let listOfProduce = await getFoodList({...APIConfig,"query":query});
        setFoodList(listOfProduce);
    }

    return (
        <>
        {showSearchBar&&<SearchBar 
        onSubmit={onFormSubmit} 
        onCheckbox={(e)=>{setStrictSearch(e.target.checked)}}
        strictSearch={strictSearch}
        />}
        <ul>
            {foodList&&foodList.foods.map((item)=>{
                console.log(item)
                return <li key={item.fdcId}>{foodCategoriesEmojiDictionary[item.foodCategory]}{item.description}</li>
            })}
        </ul>
        </>
    );
}