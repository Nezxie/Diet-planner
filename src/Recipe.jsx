import {useState} from 'react'
import SearchBar from "./SearchBar.jsx"
import ProductList from './ProductList.jsx'
import RecipeCard from './RecipeCard.jsx'
import {getFoodList,getFoodItemInfo} from './getAPIData.js'

export default function Recipe ({}){
    const [foodList, setFoodList] = useState(null);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeName, setRecipeName] = useState("New recipe");

    async function onIngredientSearch(query){
        const searchResults = await getFoodList(query);
        setFoodList(searchResults);
    }

    async function onSelectProduct(id){
        const itemInfo = await getFoodItemInfo(id);
        addToRecipe(itemInfo);
    }

    function onDiscardRecipe(){
        //do a modal "are u sure"
        setRecipeName("New recipe");
        setRecipeIngredients([]);
    }

    function onSaveRecipe(){
        let newRecipe = {
            "id":1, //here get the last id saved and ++ it? so like id = savedRecipes.length
            "name":recipeName,
            "ingredients":recipeIngredients
        }
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
        <SearchBar onSubmit={onIngredientSearch}/>
        {foodList&&<ProductList foodList={foodList} onSelectProduct={onSelectProduct}/>}
        <RecipeCard 
        ingredientList={recipeIngredients}
        onRemoveIngredient={removeFromRecipe}
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        onQuantityChange={editIngredientQuantity}
        onDiscardRecipe={onDiscardRecipe}
        onSaveRecipe={onSaveRecipe}
        />
        </>
    );
}