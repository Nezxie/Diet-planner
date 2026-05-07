import DragProvider, {useDropZone,useDraggable} from './DragProvider'
import { useState } from 'react'
import {getSavedRecipe, getMealPlansList} from '../utils/recipeStorage'
import CalendarDay from '../CalendarDay'
import RecipeInCalendar from '../RecipeInCalendar'
import './style.css'
export default function Test(){
    const [mealPlanData, setMealPlanData] = useState(getMealPlansList())
    
    return(
    <DragProvider renderDragPreview={(item) => {
      return <RecipeInCalendar recipe={item} onRemoveMeal={()=>{}} />}}>
        <div  className='main'>
        {
                    mealPlanData.length>0&&
                        mealPlanData.map((day,index)=>{
                            return <CalendarDay 
                            key={day.id}
                            position = {index} 
                            dayId={day.id} 
                            onEditDay={()=>{}} 
                            onRemoveDay={()=>{}} 
                            recipes={day.recipeIds.map(getSavedRecipe)} 
                            onRemoveMeal={()=>{}}/>
                        })
            }

        </div>
    </DragProvider>
    )
}