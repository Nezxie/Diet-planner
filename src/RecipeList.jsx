import { useState, useEffect } from 'react';
import {getSavedRecipeList, deleteRecipeFromMemory} from './utils/recipeStorage.js'
import './styles/RecipeList.css'
import RecipeCard from './RecipeCard.jsx'

export default function RecipeList({notifyDelete, recipeListFilter}){
    const [recipesList, setRecipesList] = useState([])
    
    useEffect(()=>{
        let recipesList = getSavedRecipeList();
        recipesList = recipesList.filter((recipe)=>
            recipe.name.toLowerCase().includes(recipeListFilter.toLowerCase())
        );
        setRecipesList(recipesList);
    },[recipeListFilter])

    function onDeleteRecipe(id){
        setRecipesList(deleteRecipeFromMemory(id).filter((recipe)=>
            recipe.name.toLowerCase().includes(recipeListFilter.toLowerCase())
        ));
        notifyDelete();
        
    }

    return(
        <ul className='recipe-list'>
            {recipesList.map(recipe=>{
                return(
                    <RecipeCard key={recipe.id} recipe={recipe} onDeleteRecipe={onDeleteRecipe}/>
                );
            })}
        </ul>
    );
}