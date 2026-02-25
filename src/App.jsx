import './styles/App.css'
import Recipe from './Recipe.jsx';
import RecipeList from './RecipeList.jsx'
import {makeNewRecipeId} from './utils/recipeStorage.js'

function App() {

  return (
    <>
      <h1>Diet planner app</h1>
      <RecipeList/>
      <Recipe recipeId={makeNewRecipeId()}/>
    </>
  )
}

export default App
