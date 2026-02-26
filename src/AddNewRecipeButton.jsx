import { useNavigate } from "react-router";
import {makeNewRecipeId} from './utils/recipeStorage.js'
export default function AddNewRecipeButton(){
    const navigate = useNavigate();
    
    return (
        <button onClick={()=>{
                        const newId = makeNewRecipeId();
                        navigate(`/recipe/${newId}`);
                    }}>+ Add new recipe</button>
    )
}