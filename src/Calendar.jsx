import {useState} from 'react'
import Drawer from './Drawer'
import CalendarDay from './CalendarDay.jsx';
import RecipeSelectionList from './RecipeSelectionList';
import toast, { Toaster } from 'react-hot-toast';
import {
    getMealPlansList, 
    saveToMealPlan, 
    clearDayInMealPlan, 
    getSavedRecipe, 
    removeFromMealPlan,
    addDayToMealPlan,
    removeDayFromMealPlan,
    composeGroceryList } from './utils/recipeStorage.js'
import {triggerDownloadTXTFile} from './utils/fileUtils.js'    
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
        if(mealPlanData.length < maxDays){
            const mealPlan = addDayToMealPlan();
            setMealPlanData(mealPlan);
        }
    }

    function removeDay(dayId){
        let newMealPlan = removeDayFromMealPlan(dayId);
        setMealPlanData(newMealPlan);
    }

    function clearDay(dayId){
        let newMealPlan = clearDayInMealPlan(dayId);
        setMealPlanData(newMealPlan);
    }

    function removeMeal(dayId, recipeId, position){
        let newMealPlan = removeFromMealPlan(dayId,recipeId,position);
        setMealPlanData(newMealPlan);
    }
    function onGetGroceryList(){
        const groceryListData = composeGroceryList(mealPlanData);
        triggerDownloadTXTFile(groceryListData, "grocery-list");
    }

    return(
        <>
        <div className='calendar-days-area'>
            {
            mealPlanData.length>0?
                mealPlanData.map((day,index)=>{
                    return <CalendarDay 
                    key={day.id}
                    position = {index} 
                    dayId={day.id} 
                    onEditDay={()=>{onEditDay(day.id)}} 
                    onRemoveDay={()=>{removeDay(day.id)}} 
                    recipes={day.recipeIds.map(getSavedRecipe)} 
                    onRemoveMeal={(recipeId, position)=>{removeMeal(day.id,recipeId,position)}}/>
                })
            // })
            :
            <p>Add a new day to start planing.</p>
        }
        </div>
        <button onClick={addDay} disabled={mealPlanData.length>=maxDays}>Add day</button>
        <button className='download-button' onClick={onGetGroceryList}>Download grocery list</button>
        
        {showModal && <Drawer onClose={() => setShowModal(false)} title={"Select a meal"} onSave={saveRecipe} saveText={selectedIds.length>0?`Add ${selectedIds.length} to meal plan`:""}>
            <RecipeSelectionList selectedIds={selectedIds} onSelectRecipe={onSelectRecipe}/>
            </Drawer>
            }
        <Toaster/>
        </>
    )
}