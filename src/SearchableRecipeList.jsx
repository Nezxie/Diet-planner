import { useState } from 'react';

import AddNewRecipeButton from './AddNewRecipeButton.jsx'
import SearchBar from './SearchBar.jsx'
import RecipeList from './RecipeList.jsx'

export default function SearchableRecipeList({recipes, recipeActions, onItemClick, selectedIds}){
    const [recipeFilter, setRecipeFilter] = useState("");
    const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(recipeFilter.toLowerCase()));

    return(
        <>
        <div className='recipe-list-toolbar'>
            <SearchBar onSubmit={(value)=>{setRecipeFilter(value)}}/>
        </div>
        <RecipeList recipesList={filteredRecipes} recipeActions={recipeActions} onItemClick={onItemClick} selectedIds={selectedIds}/>
        </>
    );
}