import {getSavedRecipeList} from './utils/recipeStorage.js'

export default function RecipeList({}){
    let recipes = getSavedRecipeList();

    return(
        <ul>
            {recipes.map(recipe=>{
                return(
                    <li key={recipe.id}>
                        <p>{recipe.name}</p>                       
                    </li>
                );
            })}
        </ul>
    );
}