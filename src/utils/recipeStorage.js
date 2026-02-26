import { v4 as uuidv4 } from 'uuid';
const STORAGE_KEY = "recipes";

export function getSavedRecipeList(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]
}

export function getSavedRecipe(id){
    let recipes = JSON.parse(localStorage.getItem(STORAGE_KEY));
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

    localStorage.setItem(STORAGE_KEY,JSON.stringify(savedRecipes));
}

export function deleteRecipeFromMemory(id){
    let recipeList = getSavedRecipeList();
    if(recipeList.length<2){
        clearStorage();
    }
    else{
        let newRecipeList = recipeList.filter((r) => r.id != id);
        localStorage.setItem(STORAGE_KEY,JSON.stringify(newRecipeList));
    }
}

export function makeNewRecipeId(){
  return uuidv4();
}

function clearStorage(){
    localStorage.removeItem(STORAGE_KEY); 
}