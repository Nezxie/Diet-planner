import RecipeInCalendar from './RecipeInCalendar.jsx'
import './styles/CalendarDay.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'; 

export default function CalendarDay({dayId, position, onEditDay, onRemoveDay, onRemoveMeal, recipes}){
    return(
        <div className="calendar-day">
            <section className='calendar-title-row title-row'>
            <h2>Day {position+1}</h2>
            <button className="inline-button delete-button" aria-description='remove day from meal plan' onClick={onRemoveDay}><DeleteOutlinedIcon fontSize="small"/></button>
            </section>
            <section className='recipes-list'>{
                recipes.map((recipe, id)=>{
                    return <RecipeInCalendar key={id} recipe={recipe} onRemoveMeal={()=>{onRemoveMeal(recipe.id, id)}}/>  
                })
            }</section>
            <button onClick={onEditDay}>Add recipes to day {position+1}</button>
        </div>
    );
}