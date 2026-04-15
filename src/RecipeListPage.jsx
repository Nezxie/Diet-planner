import Header from './Header.jsx'
import AddNewRecipeButton from './AddNewRecipeButton.jsx'
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
    return(
            <>
            <Header/>
            <section className='recipe-list-body'>
                <AddNewRecipeButton/>
                <RecipeList notifyDelete={notify_delete}/>
            </section>
            <Toaster />
            </>
        )
}