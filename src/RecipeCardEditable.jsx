import './styles/RecipeCard.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InlineEditable from './InlineEditable.jsx'
import MacroLabel from './MacroLabel.jsx'
import {calculateMealMacro, calculateIngredientMacro, getEmptyMeal} from './utils/calculateMacro.js'

export default function RecipeCardEditable(
    {
        recipeId,
        recipeName,
        setRecipeName,
        ingredientList,
        onRemoveIngredient,
        onQuantityChange,
        onSaveRecipe,
        onDiscardRecipe
    }){

    let mealMacro = getEmptyMeal();
    let ingredients;
    if(ingredientList.length>0){
        mealMacro = calculateMealMacro(ingredientList);
        ingredients = ingredientList.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>
                        <p>{item.name}</p>
                    </td>
                    <td>
                        <MacroLabel item={calculateIngredientMacro(item)}/>
                    </td>
                    <td>
                        <InlineEditable
                            value={item.quantity}
                            onSave={(newValue)=>{onQuantityChange(item.id,newValue)}}
                            displayAs={"span"}
                            type={"number"}
                            className='small-inline-number'
                        />
                    </td>
                    <td>
                        <button className='delete-button' onClick={()=>{onRemoveIngredient(item.id)}}><DeleteOutlinedIcon fontSize="small"/></button>
                    </td>
                            </tr>
            )
        })
    }

    return(
        <div className="recipe-card">
            <InlineEditable
                value={recipeName}
                onSave={(newValue)=>{setRecipeName(newValue)}}
                displayAs={"h2"}
                type={"text"}
                className='full-width'
                        />
            <MacroLabel item={mealMacro}/>

            {ingredients?<table className="ingredients-table">
                <thead>
                <tr>
                <th>Name</th>
                <th>Macronutrients</th>
                <th>Quantity (g)</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                    {ingredients}
                </tbody>
            </table>:
            <p>Try adding ingredients from the list above to create your recipe.</p>}
            <div className='edit-actions'>
                <button className='delete-button' onClick={()=>{onDiscardRecipe(recipeId)}}><DeleteOutlinedIcon fontSize="small"/>Clear</button>
                <button className='save-button' onClick={()=>{onSaveRecipe(recipeId)}}><SaveOutlinedIcon fontSize="small"/>Save</button>
            </div>
        </div>
    );
}
