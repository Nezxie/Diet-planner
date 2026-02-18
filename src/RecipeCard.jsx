import {useState} from 'react'
import './styles/RecipeCard.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function RecipeCard({ingredientList,title}){
    const [recipeName, setRecipeName] = useState(title)
    const [isEditing, setIsEditing] = useState(false)
    const ingredients = ingredientList.map((item)=>{
        return (
            <li key={item.id}>
                        <h2>{item.name}</h2>
                        <div className='labels'>
                        <p className="label">Energy: {item.nutriens.energy}kcal</p>
                        <p className="label">Protein: {item.nutriens.protein}g</p>
                        <p className="label">Carbs: {item.nutriens.carbs}g</p>
                        <p className="label">Fats: {item.nutriens.fat}g</p>
                        <p className="label">Quantity: {item.quantity}</p>
                        </div>
                        </li>
        )
    })
    const displayTitle = <h2 className='recipe-name' onClick={()=>{setIsEditing(true)}}>{recipeName}</h2>
    const inputTitle = <input name='recipe-title' className='recipe-title-input' onChange={(e)=>{setRecipeName(e.target.value)}} value={recipeName}></input>
   
    return(
        <div className="card">
             <form onSubmit={(e) => {
            e.preventDefault();
            setIsEditing(!isEditing);}}
            className='recipe-title-form'
            >
                {isEditing?inputTitle:displayTitle}
                <button type='submit'>{isEditing?<CheckOutlinedIcon/>:<EditOutlinedIcon/>}</button>
            </form>

            <ul>
                {ingredients}
            </ul>
        </div>
    );
}