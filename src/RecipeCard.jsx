import {useState} from 'react'
import './styles/RecipeCard.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InlineEditable from './InlineEditable.jsx'
import MacroLabel from './MacroLabel.jsx'

function calculateMealMacro(ingredientList){
    let energy=0;
    let protein=0;
    let carbs=0;
    let fat=0;
    let quantity=0;
    ingredientList.forEach((ingredient) => {
        energy+=ingredient.nutriens.energy*(ingredient.quantity/100);
        protein+=ingredient.nutriens.protein*(ingredient.quantity/100);
        carbs+=ingredient.nutriens.carbs*(ingredient.quantity/100);
        fat+=ingredient.nutriens.fat*(ingredient.quantity/100);
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
                <li key={item.id}>
                            <h2>{item.name}</h2>
                            <div className='labels'>
                            <MacroLabel item={item}/>
                            <div>
                            <p className="label">Quantity: </p>
                            <InlineEditable
                            value={item.quantity}
                            onSave={(newValue)=>{onQuantityChange(item.id,newValue)}}
                            displayAs={"span"}
                            type={"number"}
                            />
                            </div>
                            <button onClick={()=>{onRemoveIngredient(item.id)}}><DeleteOutlinedIcon/></button>
                            </div>
                            </li>
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
            <ul>
                {ingredients}
            </ul>
        </div>
    );
}