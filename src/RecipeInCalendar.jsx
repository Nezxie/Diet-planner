import './styles/RecipeInCalendar.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MacroLabel from './MacroLabel.jsx'
import {calculateMealMacro} from './utils/calculateMacro.js'
import {useDraggable} from './Drag_and_Drop/DragProvider.jsx'
import {useState} from 'react'
import {makeNewId} from './utils/recipeStorage.js'

export default function RecipeInCalendar({recipe,onRemoveMeal}){
    const [instanceId,setInstanceId] = useState(makeNewId());
    const {
        listeners,
        isDragging
    } = useDraggable(recipe,instanceId);
    
    return (
        <div className={`recipe-card recipe-card-small ${isDragging?"placeholder":"draggable"}`} {...listeners}>
            <section className='title-row'>
            <p>{recipe.name}</p>
            <button className="inline-button delete-button" aria-description='remove recipe from meal plan' 
            onClick={(e)=>{
                e.stopPropagation();
                onRemoveMeal(recipe.id)}
                }><CloseOutlinedIcon fontSize="small"/></button>
            </section>
            <MacroLabel item={calculateMealMacro(recipe.ingredients)}/>
        </div>
    )
}

