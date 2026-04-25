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
        ["id1", "id2", "id3"]
        ["id1", "id1"]
    ]
*/

export function getMealPlansList(){
    return getList(MEAL_PLAN_KEY)||[];
}
export function getDayOfMealPlan(dayId){
    let mealPlan = getMealPlansList();
    return mealPlan[dayId]||[];
}

export function saveToMealPlan(dayId, recipeIds, maxDays){
    let mealPlan = getMealPlansList();
    if (dayId < 0 || dayId >= maxDays) {
        console.warn("Invalid dayId:", dayId);
        return mealPlan;
    }

    if(mealPlan[dayId]){
        mealPlan[dayId].push(...recipeIds);
    }
    else{
        mealPlan[dayId]=[...recipeIds];
    }
    setList(mealPlan,MEAL_PLAN_KEY);
    return mealPlan;
}

export function removeFromMealPlan(dayId,recipeId){
    let mealPlan = getMealPlansList();
    if(mealPlan[dayId]){
        let recipeIndex = mealPlan[dayId].lastIndexOf(recipeId);
        if(recipeIndex === -1){
            console.warn(`Recipe with id: ${recipeId} not found in meal plan for day ${dayId}`);
            return mealPlan;
        }
        mealPlan[dayId].splice(recipeIndex,1);
        
        setList(mealPlan,MEAL_PLAN_KEY)
    }
    return mealPlan;
}

export function clearDayInMealPlan(dayId){
    let mealPlan = getMealPlansList();
    if (dayId < 0 || dayId >= mealPlan.length)
        return mealPlan;

    mealPlan.splice(dayId,1);
           
    setList(mealPlan,MEAL_PLAN_KEY)
    return mealPlan;
}

/*
write a convert recipeId to a full recipe data for calculations
    > we have already, it's getSavedRecipe(id)
or maybe do the calculations too
    > we have that in calculateMacro.js
    calculateMealMacro(ingredientList) and run that for each meal then sumTwoMacros(macroObj1, macroObj2)
*/