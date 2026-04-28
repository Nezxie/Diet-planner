import './styles/RecipeList.css'
import RecipeCard from './RecipeCard.jsx'
import AddNewRecipeButton from './AddNewRecipeButton.jsx'

export default function RecipeList({recipesList, recipeActions, onItemClick, selectedIds}){

    const noRecipesElement = (
        <section className='empty-recipe-list'>
            <p>No recipes found, try adding a new recipe.</p>
            <AddNewRecipeButton/>
        </section>
    )
    return(
        <ul className='recipe-list'>
            {
            recipesList.length === 0? noRecipesElement:    
            recipesList.map(recipe=>{
                return(
                    <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    actions={recipeActions?.(recipe)} 
                    onCardClick={()=>{onItemClick?.(recipe.id)}} 
                    selected={selectedIds?.includes(recipe.id)}
                    />
                );
            })}
        </ul>
    );
}