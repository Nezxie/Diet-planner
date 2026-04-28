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

export function makeNewId(){
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
    id: "00cca719-3fd6-43ed-9978-33c87e7dbfd8", 
    recipeIds: ["6dca4b62-9639-4448-be02-5764d09ab96c"]
}
{
    id: "a72c15e7-ce5f-4c8c-82f8-6c12a443e930",
    recipeIds: ["6dca4b62-9639-4448-be02-5764d09ab96c", "b794c4a1-bba1-4f20-9890-c6944e40e07d"]
}
{
    id: "5e947aee-07a8-4037-8d56-28e2c88ad337", 
    recipeIds: []
}
*/

export function getMealPlansList(maxDays = 7){
    const list = getList(MEAL_PLAN_KEY)||[];
    const normalizedList = list.slice(0,maxDays).map(day=>({
        ...day,
        recipeIds: day.recipeIds??[] // data normalization
    }))
    const validatedList = removeInvalidRecipesFromMealPlan(normalizedList);
    return validatedList;
}

function removeInvalidRecipesFromMealPlan(mealPlan){
    const validatedMealPlan = mealPlan.map((day)=>{
        const validRecipeIds = day.recipeIds.filter(recipeId=>Object.keys(getSavedRecipe(recipeId)).length !== 0);
        return ({
            ...day,
            recipeIds: validRecipeIds
        })
    });
    return validatedMealPlan;
}

export function getDayOfMealPlan(dayId, maxDays = 7){
    let mealPlan = getMealPlansList(maxDays);
    if(!mealPlan)
        return {};
    return mealPlan.find(day => day.id === dayId)||{}
}

export function saveToMealPlan(dayId, recipeIds, maxDays = 7){
    let mealPlan = getMealPlansList(maxDays);
    const updatedMealPlan = mealPlan.map((day)=>{
        if(day.id != dayId) return day;
        return {
            ...day,
            recipeIds:[...day.recipeIds, ...recipeIds]
        }
    })
    setList(updatedMealPlan,MEAL_PLAN_KEY)
    return updatedMealPlan;
}

export function addDayToMealPlan(maxDays = 7){
    const mealPlan = getMealPlansList(maxDays);
    const newDay = {
        id:makeNewId(),
        recipeIds:[]
    }
    const updatedMealPlan = [...mealPlan, newDay];
    setList(updatedMealPlan, MEAL_PLAN_KEY);
    return updatedMealPlan;
}

export function removeDayFromMealPlan(dayId, maxDays = 7){
    const mealPlan = getMealPlansList(maxDays);
    const updatedMealPlan = mealPlan.filter(day=>day.id!==dayId)
    setList(updatedMealPlan, MEAL_PLAN_KEY);
    return updatedMealPlan;
}

export function removeFromMealPlan(dayId,recipeId,recipePosition, maxDays = 7){
    let mealPlan = getMealPlansList(maxDays);
    let updatedMealPlan = mealPlan.map((day)=>{
        if(day.id !== dayId){
            return day;
        }
        const newRecipeIds = [...day.recipeIds];
        newRecipeIds.splice(recipePosition,1);
        return {
            ...day,
            recipeIds: newRecipeIds
        }
    });
    setList(updatedMealPlan,MEAL_PLAN_KEY)
    return updatedMealPlan;
}

export function clearDayInMealPlan(dayId, maxDays = 7){
    let mealPlan = getMealPlansList(maxDays);
    let updatedMealPlan = mealPlan.map((day) => {
        if(day.id !== dayId) return day;
        return {
            ...day,
            recipeIds:[]
        }
    });
        
    setList(updatedMealPlan,MEAL_PLAN_KEY)
    return updatedMealPlan;
}