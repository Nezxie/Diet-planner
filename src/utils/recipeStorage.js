export function getSavedRecipeList(){
    return JSON.parse(localStorage.getItem("recipes"))||[]
}

export function getSavedRecipe(id){
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    if(!recipes)
        return [];
    return recipes.find(r => r.id === id)||[]
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

    localStorage.setItem("recipes",JSON.stringify(savedRecipes));
}

export function makeNewRecipeId(){
  let recipeList = JSON.parse(localStorage.getItem("recipes"))||[];
  return recipeList.length;
}