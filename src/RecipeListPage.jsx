import Header from './Header.jsx'
import AddNewRecipeButton from './AddNewRecipeButton.jsx'
import RecipeList from './RecipeList.jsx'
import "./styles/RecipeListPage.css"

export default function RecipeListPage(){
    return(
            <>
            <Header/>
            <section className='recipe-list-body'>
                <AddNewRecipeButton/>
                <RecipeList/>
            </section>
            </>
        )
}