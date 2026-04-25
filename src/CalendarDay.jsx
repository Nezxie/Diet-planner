import RecipeInCalendar from './RecipeInCalendar.jsx'
import './styles/CalendarDay.css'
export default function CalendarDay({dayId, onEditDay, onRemoveDay, onRemoveMeal, recipes}){

    return(
        <div className="calendar-day">
            <section className='title-row'>
            <h2>Day {dayId+1}</h2>
            <button className="inline-button" onClick={onRemoveDay}>-</button>
            </section>
            <section className='recipes-list'>{
                recipes.map((recipe, id)=>{
                    return <RecipeInCalendar key={id} recipe={recipe} onRemoveMeal={onRemoveMeal}/>  
                })
            }</section>
            <button onClick={onEditDay}>Add recipes to day {dayId+1}</button>
        </div>
    );
}