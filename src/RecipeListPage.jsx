import {useState} from 'react'
import Header from './Header.jsx'
import AddNewRecipeButton from './AddNewRecipeButton.jsx'
import SearchBar from './SearchBar.jsx'
import RecipeList from './RecipeList.jsx'
import "./styles/RecipeListPage.css"
import toast, { Toaster } from 'react-hot-toast';
const notify_delete = () => toast('Recipe deleted.',{
    duration: 2500,
    position: 'bottom-right',
    className: 'notify_delete',
    icon:'🗑️'
});

export default function RecipeListPage(){
    const [recipeFilter, setRecipeFilter] = useState("");
    return(
            <>
            <Header/>
            <section className='app-body'>
                <div className='recipe-list-toolbar'>
                <AddNewRecipeButton/>
                <SearchBar onSubmit={(value)=>{setRecipeFilter(value)}}/>
                </div>
                <RecipeList notifyDelete={notify_delete} recipeListFilter={recipeFilter}/>
            </section>
            <Toaster />
            </>
        )
}