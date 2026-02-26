import { NavLink } from "react-router";
import {calculateMealMacro, calculateTotalQuantity} from './utils/calculateMacro.js'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MacroLabel from './MacroLabel.jsx'

export default function RecipeCard({recipe, onDeleteRecipe}){
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
                                           onDeleteRecipe(recipe.id);  
                                        }
                                    }}>
                                        <DeleteOutlinedIcon fontSize="small"/>Delete
                                    </button>
                                </div>                
                            </li>
    )
}