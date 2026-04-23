import { NavLink } from 'react-router';
import { Toaster } from 'react-hot-toast';
import {useRecipes} from './hooks/useRecipes.js'
import SearchableRecipeList from './SearchableRecipeList.jsx';
import Header from './Header.jsx'

import "./styles/RecipeListPage.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function RecipeListPage(){
    const {recipesList, deleteRecipe} = useRecipes();
    
    return(
            <>
            <Header/>
            <section className='app-body'>
                <SearchableRecipeList 
                    recipes={recipesList} 
                    recipeActions={(recipe)=>
                        (
                            <>
                            <NavLink className='edit-button button' to={`/recipe/${recipe.id}`}>
                                <EditOutlinedIcon fontSize="small"/>Edit
                            </NavLink>
                            <button className='delete-button' onClick={() => deleteRecipe(recipe)}>
                                <DeleteOutlinedIcon fontSize="small"/>
                                Delete
                            </button>
                            </>
                        )
                    }
                />
            </section>
            <Toaster />
            </>
        )
}
