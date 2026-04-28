import './styles/RecipeInCalendar.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MacroLabel from './MacroLabel.jsx'
import {calculateMealMacro} from './utils/calculateMacro.js'

export default function RecipeInCalendar({recipe,onRemoveMeal}){
    return (
        <div className="recipe-card recipe-card-small">
            <section className='title-row'>
            <p>{recipe.name}</p>
            <button className="inline-button delete-button" aria-description='remove recipe from meal plan' onClick={()=>{onRemoveMeal(recipe.id)}}><CloseOutlinedIcon fontSize="small"/></button>
            </section>
            <MacroLabel item={calculateMealMacro(recipe.ingredients)}/>
        </div>
    )
}

