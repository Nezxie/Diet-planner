import {useState} from 'react'
import Drawer from './Drawer'
import RecipeSelectionList from './RecipeSelectionList';
import toast, { Toaster } from 'react-hot-toast';
import {getMealPlansList, saveToMealPlan, clearDayInMealPlan} from './utils/recipeStorage.js'

const notify_save = () => toast('Recipe added to the schedule.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_save',
    icon:'✅'
});

export default function Calendar(){
    const [showModal, setShowModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const dayId = 1; //where does that live ;-; <- don't cry this will be state when user selects a day to edit i guess, we'll move this to a Day  component or something

    function test1(){
        console.log("Saved meal plan:");
        console.log(getMealPlansList());
    }

     function test2(){
        console.log("Cleared meal plan day 1:");
        console.log(clearDayInMealPlan(dayId));
    }

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
        saveToMealPlan(dayId, selectedIds);
        notify_save();
        setSelectedIds([]);
    }

    return(
        <>
        <button onClick={() => setShowModal(true)}>Show drawer</button>
        <button onClick={test1}>Get meal plan</button>
        <button onClick={test2}>Clear meal plan</button>

        {showModal && <Drawer onClose={() => setShowModal(false)} title={"Select a meal"} onSave={saveRecipe} saveText={selectedIds.length>0?`Add ${selectedIds.length} to meal plan`:""}>
            <RecipeSelectionList selectedIds={selectedIds} onSelectRecipe={onSelectRecipe}/>
            </Drawer>
            }
        <Toaster/>
        </>
    )
}