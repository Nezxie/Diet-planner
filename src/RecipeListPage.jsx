import Header from './Header.jsx'
import AddNewRecipeButton from './AddNewRecipeButton.jsx'
import RecipeList from './RecipeList.jsx'

export default function RecipeListPage(){
    return(
            <>
            <Header/>
            <AddNewRecipeButton/>
            <RecipeList/>
            </>
        )
}