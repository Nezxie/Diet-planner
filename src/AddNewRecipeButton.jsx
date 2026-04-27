import { useNavigate } from "react-router";
import {makeNewId} from './utils/recipeStorage.js'
export default function AddNewRecipeButton(){
    const navigate = useNavigate();
    
    return (
        <button onClick={()=>{
                        const newId = makeNewId();
                        navigate(`/recipe/${newId}`);
                    }}>+ Add new recipe</button>
    )
}