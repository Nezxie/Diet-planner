import {useState} from 'react'
import Drawer from './Drawer'
import CalendarDay from './CalendarDay.jsx';
import RecipeSelectionList from './RecipeSelectionList';
import toast, { Toaster } from 'react-hot-toast';
import {getMealPlansList, saveToMealPlan, clearDayInMealPlan, getDayOfMealPlan, getSavedRecipe, removeFromMealPlan} from './utils/recipeStorage.js'
import './styles/Calendar.css'

const notify_save = () => toast('Recipe added to the schedule.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
});

export default function Calendar(){
    const [showModal, setShowModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [mealPlanData, setMealPlanData] = useState(getMealPlansList())
    const [activeDayId, setActiveDayId] = useState(null);
    const [daysCount, setDaysCount] = useState(0); //this we can set in use settings so it defaults to a preffered number
    const maxDays = 7; //a week has 7 days + ui vibes

    function onSelectRecipe(recipeId){
            let newSelectedIds;
            if(selectedIds.includes(recipeId)){
                newSelectedIds=selectedIds.filter((id)=>id!==recipeId);
            }
            else{
                newSelectedIds = [...selectedIds,recipeId];
            }
            setSelectedIds(newSelectedIds);
    }

    function saveRecipe(){
        let newMealPlan = saveToMealPlan(activeDayId, selectedIds, maxDays);
        setMealPlanData(newMealPlan);
        notify_save();
        setSelectedIds([]);
    }

    function onEditDay(dayId){
        setActiveDayId(dayId);
        setShowModal(true);
    }

    function addDay(){
        setDaysCount(daysCount => daysCount+1)
    }
    function removeDay(dayId){
        clearDayInMealPlan(dayId);
        setDaysCount(daysCount => daysCount-1);
    }

    function removeMeal(dayId,recipeId){
        let newMealPlan = removeFromMealPlan(dayId,recipeId);
        setMealPlanData(newMealPlan);
    }

    const getDayData = (dayId) => {
        return (mealPlanData[dayId] || []).map(getSavedRecipe);
    };

    return(
        <>
        <div className='calendar-days-area'>
            {
            daysCount>0?
            Array.from({length:daysCount},(item, index)=>{
                return <CalendarDay 
                key={index} 
                dayId={index} 
                onEditDay={()=>{onEditDay(index)}} 
                onRemoveDay={()=>{removeDay(index)}} 
                recipes={getDayData(index)} 
                onRemoveMeal={(recipeId)=>{removeMeal(index,recipeId)}}/>
            })
            :
            <p>Add a new day to start planing.</p>
        }
        </div>
        <button onClick={addDay} disabled={daysCount>6}>Add day</button>
        
        {showModal && <Drawer onClose={() => setShowModal(false)} title={"Select a meal"} onSave={saveRecipe} saveText={selectedIds.length>0?`Add ${selectedIds.length} to meal plan`:""}>
            <RecipeSelectionList selectedIds={selectedIds} onSelectRecipe={onSelectRecipe}/>
            </Drawer>
            }
        <Toaster/>
        </>
    )
}