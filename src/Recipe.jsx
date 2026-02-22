import {useState, useEffect} from 'react'
import {getFoodList,getFoodItemInfo} from './getAPIData.js'
import RecipeCard from './RecipeCard.jsx'
import IngredientsSearch from './IngredientsSearch.jsx'

function getRecipeFromSessionStorage(id){
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    if(!recipes)
        return {};
    return recipes[id]||{}
}

export default function Recipe ({recipeId}){
    const [foodList, setFoodList] = useState(null);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeName, setRecipeName] = useState("New recipe");

    async function onIngredientSearch(query){
        const searchResults = await getFoodList(query);
        setFoodList(searchResults);
    }

    async function onSelectProduct(id){
        const itemInfo = await getFoodItemInfo(id);
        addToRecipe(itemInfo);
    }

    function onDiscardRecipe(id){
        if(confirm("Are you sure you want to discard all the changes?")){ //do this with custom react later maybe
            let savedRecipe = getRecipeFromSessionStorage(id);
            setRecipeName(savedRecipe.name||"New recipe");
            setRecipeIngredients(savedRecipe.ingredients||[]);
        }
    }

    function onSaveRecipe(id){
        let savedRecipes = JSON.parse(localStorage.getItem("recipes"))||{};
        let newRecipe = {
            "id":id,
            "name":recipeName,
            "ingredients":recipeIngredients
        }
        savedRecipes[id]=newRecipe;
        let newSavedRecipes=JSON.stringify(savedRecipes);
        localStorage.setItem("recipes",newSavedRecipes);
    }

    function addToRecipe(item){
        let ingredient = {...item};
        if(!recipeIngredients.some(i=>i.id==ingredient.id)){
            ingredient.quantity = 100;
            setRecipeIngredients([...recipeIngredients,ingredient])
        }
    }

    function removeFromRecipe(id){
        let newIngredients = [...recipeIngredients].filter((item)=>item.id!=id);
        setRecipeIngredients(newIngredients);
    }

    function editIngredientQuantity(id, newValue){
       let newIngredients=prev=>prev.map(item=> item.id === id?{...item,quantity:newValue}:item);
       setRecipeIngredients(newIngredients);
    }

    return(
        <>
        <IngredientsSearch
        foodList={foodList}
        onSelectProduct={onSelectProduct}
        onIngredientSearch={onIngredientSearch}
        />
        <RecipeCard 
        ingredientList={recipeIngredients}
        onRemoveIngredient={removeFromRecipe}
        recipeId={recipeId}
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        onQuantityChange={editIngredientQuantity}
        onDiscardRecipe={onDiscardRecipe}
        onSaveRecipe={onSaveRecipe}
        />
        </>
    );
}