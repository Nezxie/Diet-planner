import './styles/RecipeList.css'
import RecipeCard from './RecipeCard.jsx'

export default function RecipeList({recipesList, recipeActions, onItemClick, selectedIds}){

    return(
        <ul className='recipe-list'>
            {recipesList.map(recipe=>{
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