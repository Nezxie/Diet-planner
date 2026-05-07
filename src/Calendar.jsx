import {useState} from 'react'
import Drawer from './Drawer'
import CalendarDay from './CalendarDay.jsx';
import RecipeSelectionList from './RecipeSelectionList';
import DragProvider from './utils/DragProvider.jsx'
import RecipeInCalendar from './RecipeInCalendar.jsx'
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

    function onDropMeal(activeElem,hoveredZone){
        console.log(activeElem);
        console.log(hoveredZone);
        //mealPlanData.map()
        //now remove from activeElem.startingContainer and add to hoveredZone
        //activeElem.item.id from activeElem.startingContainer.recipeIds[]

        /*
        let newMealPlan = removeFromMealPlan(hoveredZone,activeElem.item.id,position==???)
        newMealPlan = saveToMealPlan(hoveredZone, activeElem.item.id, maxDays);
        setMealPlanData(newMealPlan);


        */
    }

    const defaultDraggableItem = (item) => {
          return <RecipeInCalendar recipe={item}/>}

    return(
        <>
        <div className='calendar-days-area'>
            <DragProvider onDrop={onDropMeal} renderDragPreview={defaultDraggableItem}>
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
        </DragProvider>
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