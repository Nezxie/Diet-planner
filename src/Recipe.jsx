import {useState, useEffect} from 'react'
import { useParams } from "react-router";
import {getFoodList,getFoodItemInfo} from './utils/getAPIData.js'
import RecipeCardEditable from './RecipeCardEditable.jsx'
import IngredientsSearch from './IngredientsSearch.jsx'
import {getSavedRecipe, saveRecipeToMemory, deleteRecipeFromMemory, makeNewId} from './utils/recipeStorage.js'

export default function Recipe ({notifySaved, notifyClear, notifyRestore}){
    let {recipeId} = useParams();
    const [foodList, setFoodList] = useState(null);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeName, setRecipeName] = useState("New recipe");
    const [titleResetKey, setTitleResetKey] = useState(recipeId);

    useEffect(()=>{
        let recipe = getSavedRecipe(recipeId)||{};
        if(Object.keys(recipe).length !== 0){
            setRecipeIngredients(recipe.ingredients);
            setRecipeName(recipe.name);
        }
        else{
            setRecipeIngredients([]);
            setRecipeName("New recipe");
            setFoodList(null);
        }
        setTitleResetKey(recipeId);
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
        //I think it's annoying, although it would be nice to have an alert before a destructive action,
        //but we also don't have a warning before exiting the page without saving, so i don't think it matters that much
       // if(confirm("Are you sure you want to discard all the changes and restore last save?")){ //do this with custom react later maybe
            let savedRecipe = getSavedRecipe(id);
            setRecipeName(savedRecipe.name||"New recipe");
            setRecipeIngredients(savedRecipe.ingredients||[]);
            setTitleResetKey(makeNewId());
            notifyRestore();
        //}
    }

    function onClearRecipe(id){
        if(confirm("Are you sure you want to delete this recipe from memory? This action cannot be undone.")){
            deleteRecipeFromMemory(id)
            setRecipeName("New recipe");
            setRecipeIngredients([]);
            notifyClear();
        }
    }

    function onSaveRecipe(id){
        let newRecipe = {
            "id":id,
            "name":recipeName,
            "ingredients":recipeIngredients
        }
        saveRecipeToMemory(newRecipe);
        notifySaved();
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
       setRecipeIngredients(prev=>prev.map(item=> item.id === id?{...item,quantity:newValue}:item));
    }

    return(
        <section className='app-body'>
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
        titleResetKey={titleResetKey}
        setRecipeName={setRecipeName}
        onQuantityChange={editIngredientQuantity}
        onDiscardRecipe={onDiscardRecipe}
        onSaveRecipe={onSaveRecipe}
        onClearRecipe={onClearRecipe}
        />
        </section>
    );
}