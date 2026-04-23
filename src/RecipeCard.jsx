import { NavLink } from "react-router";
import {calculateMealMacro, calculateTotalQuantity} from './utils/calculateMacro.js'
import {useState} from 'react'

import MacroLabel from './MacroLabel.jsx'

export default function RecipeCard({recipe, onCardClick, selected, actions}){
    const [showMore, setShowMore] = useState(false);
    
    const cardMainPage = 
    <>
        <p>{calculateTotalQuantity(recipe.ingredients)}g</p>   
        <MacroLabel item={calculateMealMacro(recipe.ingredients)}/>
    </>;

    const cardShowMorePage = <>
        <ul>
            {
            recipe.ingredients.length > 0?
                recipe.ingredients.map((ingredient)=>{
                    return(<li key={ingredient.id}>{ingredient.name}: {ingredient.quantity}g</li>)
                })
                :
                <p>No ingredients found - try edditing the recipe.</p>
            }
        </ul>    
    </>;
;
    return(
        <li key={recipe.id} onClick={onCardClick} className={selected&&"selected"}>
            <div className="inline-button-in-header">
                <h2>{recipe.name}</h2>
                <button onClick={(e)=>{
                    e.stopPropagation();
                    setShowMore(!showMore)
                    }}>
                        {showMore?"Show summary":"Show ingredients"}
                </button>
            </div>
            {showMore?cardShowMorePage:cardMainPage}
            <div className='action-buttons'>
                {actions}
            </div>                              
        </li>
    )
}