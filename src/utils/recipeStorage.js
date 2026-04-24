import { v4 as uuidv4 } from 'uuid';
const RECIPES_KEY = "recipes";
const MEAL_PLAN_KEY = "mealplan"

function getList(key){
    return JSON.parse(localStorage.getItem(key))
}

function setList(value,key){
    localStorage.setItem(key,JSON.stringify(value));
}

function deleteList(key){
    localStorage.removeItem(key); 
}

export function makeNewRecipeId(){
  return uuidv4();
}

//RECIPES FUNCTIONS
export function getSavedRecipeList(){
    return getList(RECIPES_KEY)||[];
}

export function getSavedRecipe(id){
    let recipes = getList(RECIPES_KEY);
    if(!recipes)
        return {};
    return recipes.find(r => r.id === id)||{}
}

export function saveRecipeToMemory(newRecipe){
    let savedRecipes = getSavedRecipeList();  
    let editedRecipeIndex = savedRecipes.findIndex(r => r.id === newRecipe.id);

    if(editedRecipeIndex !== -1){
        savedRecipes[editedRecipeIndex]=newRecipe;
    }
    else if(editedRecipeIndex === -1){
        savedRecipes.push(newRecipe);
    }
    else{
        throw new Error("Error when trying to find if the recipe id already exists.");
    }
    setList(savedRecipes,RECIPES_KEY)
}

export function deleteRecipeFromMemory(id){
    let recipeList = getSavedRecipeList();
    let newRecipeList = [];
    newRecipeList = recipeList.filter((r) => r.id != id);
    setList(newRecipeList,RECIPES_KEY)
    return newRecipeList;
}

//MEAL PLAN FUNCTIONS
/*
MEAL DATA STRUCTURE:
[
    {
        day_id:0,
        recipeIds:[id1, id2, id3]
    },
    {
        day_id:2,
        recipeIds:[id1, id1]
    }
]
*/

export function getMealPlansList(){
    return getList(MEAL_PLAN_KEY)||[];
}
export function getDayOfMealPlan(dayId){
    let mealPlan = getMealPlansList();
    if(!mealPlan)
        return {};
    return mealPlan.find(mp => mp.dayId === dayId)||{}
}

export function saveToMealPlan(dayId, recipeIds){
    let mealPlan = getMealPlansList();
    let exists = false;
    const updatedMealPlan = mealPlan.map((day)=>{
        if(day.dayId != dayId) return day;
        exists = true;
        return {
            ...day,
            recipeIds:[...day.recipeIds, ...recipeIds]
        }
    })
    if(!exists){
        updatedMealPlan.push({
            "dayId":dayId,
            "recipeIds":recipeIds
        })
    }
    setList(updatedMealPlan,MEAL_PLAN_KEY)
}

export function removeFromMealPlan(dayId,recipeId){
    let mealPlan = getMealPlansList();
    let updatedMealPlan = mealPlan.map((day)=>{
        if(day.dayId !== dayId){
            return day;
        }
        return {
            ...day,
            recipeIds:day.recipeIds.filter((id) => id!==recipeId)
        }
    });
    setList(updatedMealPlan,MEAL_PLAN_KEY)
    return updatedMealPlan;
}

export function clearDayInMealPlan(dayId){
    let mealPlan = getMealPlansList();
    let updatedMealPlan = mealPlan.map((day) => {
        if(day.dayId !== dayId) return day;
        return {
            "dayId":dayId,
            "recipeIds":[]
        }
    });
        
    setList(updatedMealPlan,MEAL_PLAN_KEY)
    return updatedMealPlan;
}

/*write a convert recipeId to a full recipe data for calculations or maybe do the calculations too? idk, maybe i already have everything i need, im tired */
