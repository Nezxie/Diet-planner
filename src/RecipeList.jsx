import { useState, useEffect } from 'react';
import {getSavedRecipeList, deleteRecipeFromMemory} from './utils/recipeStorage.js'
import './styles/RecipeList.css'
import RecipeCard from './RecipeCard.jsx'

export default function RecipeList({notifyDelete}){
    const [recipesList, setRecipesList] = useState([])
    
    useEffect(()=>{
        setRecipesList(getSavedRecipeList());
    },[])

    function onDeleteRecipe(id){
        setRecipesList(deleteRecipeFromMemory(id));
        notifyDelete();
        
    }

    return(
        <ul className='recipe-list'>
            {recipesList.map(recipe=>{
                return(
                    <RecipeCard recipe={recipe} onDeleteRecipe={onDeleteRecipe}/>
                );
            })}
        </ul>
    );
}