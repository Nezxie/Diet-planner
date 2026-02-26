import {useState, useEffect} from 'react'
import { useParams } from "react-router";
import {getFoodList,getFoodItemInfo} from './utils/getAPIData.js'
import RecipeCardEditable from './RecipeCardEditable.jsx'
import IngredientsSearch from './IngredientsSearch.jsx'
import {getSavedRecipe, saveRecipeToMemory} from './utils/recipeStorage.js'

export default function Recipe (){
    let {recipeId} = useParams();
    const [foodList, setFoodList] = useState(null);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeName, setRecipeName] = useState("New recipe");

    useEffect(()=>{
        let recipe = getSavedRecipe(recipeId);
        if(Object.keys(recipe).length !== 0){
            setRecipeIngredients(recipe.ingredients);
            setRecipeName(recipe.name);
        }
    },[recipeId])

    async function onIngredientSearch(query){
        const searchResults = await getFoodList(query);
        setFoodList(searchResults);
    }

    async function onSelectProduct(id){
        const itemInfo = await getFoodItemInfo(id);
        addToRecipe(itemInfo);
    }

    function onDiscardRecipe(id){
        if(confirm("Are you sure you want to discard all the changes?")){ //do this with custom react later maybe
            let savedRecipe = getSavedRecipe(id);
            setRecipeName(savedRecipe.name||"New recipe");
            setRecipeIngredients(savedRecipe.ingredients||[]);
        }
    }

    function onSaveRecipe(id){
        let newRecipe = {
            "id":id,
            "name":recipeName,
            "ingredients":recipeIngredients
        }
        saveRecipeToMemory(newRecipe);
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
        <IngredientsSearch
        foodList={foodList}
        onSelectProduct={onSelectProduct}
        onIngredientSearch={onIngredientSearch}
        />
        <RecipeCardEditable 
        ingredientList={recipeIngredients}
        onRemoveIngredient={removeFromRecipe}
        recipeId={recipeId}
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        onQuantityChange={editIngredientQuantity}
        onDiscardRecipe={onDiscardRecipe}
        onSaveRecipe={onSaveRecipe}
        />
        </>
    );
}