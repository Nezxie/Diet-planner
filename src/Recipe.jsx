import {useState} from 'react'
import SearchBar from "./SearchBar.jsx"
import ProductList from './ProductList.jsx'
import RecipeCard from './RecipeCard.jsx'
import {getFoodList,getFoodItemInfo} from './getAPIData.js'

export default function Recipe ({}){
    const [foodList, setFoodList] = useState(null); //there must be a better way to not display the foodlist "no data" than this, i'd rather init this to {}
    const [recipeIngredients, setRecipeIngredients] = useState([]);

    async function onSearch(query){
        const searchResults = await getFoodList(query);
        setFoodList(searchResults);
    }

    async function onSelectProduct(id){
        const itemInfo = await getFoodItemInfo(id);
        addToRecipe(itemInfo);
    }

    function addToRecipe(item){
        let ingredient = {...item};
        if(!recipeIngredients.some(i=>i.id==ingredient.id)){
            ingredient.quantity = 100;
            setRecipeIngredients([...recipeIngredients,ingredient])
        }
    }
    function removeFromRecipe(id){
        let newIngredients = [...recipeIngredients].filter((item)=>item.id!=id);
        setRecipeIngredients(newIngredients);
    }
    function editIngredientQuantity(id, newValue){
       let newIngredients=prev=>prev.map(item=> item.id === id?{...item,quantity:newValue}:item);
       setRecipeIngredients(newIngredients);
    }

    return(
        <>
        <SearchBar onSubmit={onSearch}/>
        {foodList&&<ProductList foodList={foodList} onSelectProduct={onSelectProduct}/>}
        <RecipeCard ingredientList={recipeIngredients} onRemoveIngredient={removeFromRecipe} title={"New recipe"} onQuantityChange={editIngredientQuantity}/>
        </>
    );
}