import {useState} from 'react'
import './styles/RecipeCard.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InlineEditable from './InlineEditable.jsx'
import MacroLabel from './MacroLabel.jsx'

function calculateIngredientMacro(ingredient){
    let energy=ingredient.nutriens.energy*ingredient.quantity/100;
    let protein=ingredient.nutriens.protein*ingredient.quantity/100;
    let carbs=ingredient.nutriens.carbs*ingredient.quantity/100;
    let fat=ingredient.nutriens.fat*ingredient.quantity/100;
    return {
        'nutriens':{
            'energy':Math.round(energy,2),
            'protein':Math.round(protein,2),
            'carbs':Math.round(carbs,2),
            'fat':Math.round(fat,2)
        }
        }
}


function calculateMealMacro(ingredientList){
    let energy=0;
    let protein=0;
    let carbs=0;
    let fat=0;
    let quantity=0;
    ingredientList.forEach((ingredient) => {
        let macros = calculateIngredientMacro(ingredient)
        energy+=macros.nutriens.energy;
        protein+=macros.nutriens.protein;
        carbs+=macros.nutriens.carbs;
        fat+=macros.nutriens.fat;
        quantity+=ingredient.quantity;
    });
    return ({
        'nutriens':{
            'energy':Math.round(energy),
            'protein':Math.round(protein),
            'carbs':Math.round(carbs),
            'fat':Math.round(fat)
        },
        'quantity':Math.round(quantity)
    })
}

export default function RecipeCard({ingredientList,title,onRemoveIngredient, onQuantityChange}){
    const [recipeName, setRecipeName] = useState(title)

    let mealMacro = {
        nutriens:{
            'energy':0,
            'protein':0,
            'carbs':0,
            'fat':0
        },
        'quantity':0
    };
    let ingredients;
    if(ingredientList.length>0){
        mealMacro = calculateMealMacro(ingredientList);
        ingredients = ingredientList.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>
                        <h2>{item.name}</h2>
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
                        />
                    </td>
                    <td>
                        <button onClick={()=>{onRemoveIngredient(item.id)}}><DeleteOutlinedIcon/></button>
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

            <table className="ingredients-table">
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
            </table>
        </div>
    );
}