import { useState, useEffect } from 'react';
import {getSavedRecipeList, deleteRecipeFromMemory} from '../utils/recipeStorage.js'
import toast from 'react-hot-toast';


export function useRecipes(){
    const [recipesList, setRecipesList] = useState([])
    
    useEffect(()=>{
        let recipesList = getSavedRecipeList();
        setRecipesList(recipesList);
    },[])
    
    function deleteRecipe(recipe){
        if(confirm(`Are you sure you want to permanently delete ${recipe.name}?`)){
            let updated = deleteRecipeFromMemory(recipe.id);
            setRecipesList(updated);
            toast('Recipe deleted.',{
                duration: 2500,
                position: 'bottom-right',
                className: 'notify_delete',
                icon:'🗑️'
            });
        }   
    }
    return {
        recipesList,
        deleteRecipe
    }
}
