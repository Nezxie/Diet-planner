import './styles/RecipeInCalendar.css'

export default function RecipeInCalendar({recipe,onRemoveMeal}){
    return (
        <div className="recipe-card recipe-card-small">
            <section className='title-row'>
            <p>{recipe.name}</p>
            <button className="inline-button" onClick={()=>{onRemoveMeal(recipe.id)}}>-</button>
            </section>
        </div>
    )
}