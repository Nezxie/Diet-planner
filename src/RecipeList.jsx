import { NavLink } from "react-router";
import {getSavedRecipeList, deleteRecipeFromMemory} from './utils/recipeStorage.js'
import {calculateMealMacro, calculateTotalQuantity} from './utils/calculateMacro.js'
import './styles/RecipeList.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MacroLabel from './MacroLabel.jsx'

export default function RecipeList({}){
    let recipes = getSavedRecipeList();

    return(
        <ul className='recipe-list'>
            {recipes.map(recipe=>{
                return(
                    <li key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        <p>{calculateTotalQuantity(recipe.ingredients)}g</p>   
                        <MacroLabel item={calculateMealMacro(recipe.ingredients)}/>
                        <div className='action-buttons'>
                            <NavLink className='edit-button button' to={`/recipe/${recipe.id}`}>
                                    <EditOutlinedIcon fontSize="small"/>Edit
                            </NavLink>

                            <button className='delete-button' 
                            onClick={()=>{
                                if(confirm(`Are you sure you want to permanently delete ${recipe.name}?`)){
                                    deleteRecipeFromMemory(recipe.id);
                                }
                            }}>
                                <DeleteOutlinedIcon fontSize="small"/>Delete
                            </button>
                        </div>                
                    </li>
                );
            })}
        </ul>
    );
}