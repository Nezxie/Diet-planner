import RecipeInCalendar from './RecipeInCalendar.jsx'
import './styles/CalendarDay.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MacroLabel from './MacroLabel.jsx'
import {useState, useEffect} from 'react' 
import {getEmptyMeal, calculateMealMacro, sumTwoMacros} from './utils/calculateMacro.js'

export default function CalendarDay({dayId, position, onEditDay, onRemoveDay, onRemoveMeal, recipes}){
    const [dayMacro, setDayMacro] = useState(getEmptyMeal());

    useEffect(()=>{
        // i could move all that to calculateMacro.js ? or a custom hook maybe
        const sumMealMacro = recipes.reduce((acc, recipe) => {
            const mealMacro = calculateMealMacro(recipe.ingredients);
            return sumTwoMacros(mealMacro,acc);
        }, getEmptyMeal());
        setDayMacro(sumMealMacro);
    },[recipes])

    return(
        <div className="calendar-day">
            <section className='calendar-title-row'>
                <div className='title-row'>
                    <h2>Day {position+1}</h2>
                    <button className="inline-button delete-button" aria-description='remove day from meal plan' onClick={onRemoveDay}><DeleteOutlinedIcon fontSize="small"/></button>
                </div>
                <MacroLabel item={dayMacro}/>
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