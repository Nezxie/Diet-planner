import './styles/RecipeInCalendar.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MacroLabel from './MacroLabel.jsx'
import {calculateMealMacro} from './utils/calculateMacro.js'
import {useDraggable} from './utils/DragProvider.jsx'
import {useState} from 'react'
import {makeNewId} from './utils/recipeStorage.js'

export default function RecipeInCalendar({recipe, parentContainerId, onRemoveMeal=null}){
    const [instanceId,setInstanceId] = useState(makeNewId());
    const {
        listeners,
        isDragging
    } = useDraggable(recipe,instanceId,parentContainerId);
    
    return (
        <div className={`recipe-card recipe-card-small ${isDragging?"placeholder":"draggable"}`} {...listeners}>
            <section className='title-row'>
            <p>{recipe.name}</p>
            
            {onRemoveMeal&&<button className="inline-button delete-button" aria-description='remove recipe from meal plan' 
            onClick={(e)=>{
                e.stopPropagation();
                onRemoveMeal(recipe.id)}
                }>
                <CloseOutlinedIcon fontSize="small"/></button>}
            </section>
            <MacroLabel item={calculateMealMacro(recipe.ingredients)}/>
        </div>
    )
}

