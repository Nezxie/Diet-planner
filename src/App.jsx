import './styles/App.css'
import Recipe from './Recipe.jsx';

function makeNewRecipeId(){
  let recipeList = JSON.parse(localStorage.getItem("recipes"))||{};
  return Object.keys(recipeList).length;
}
function App() {

  return (
    <>
      <h1>Diet planner app</h1>
      <Recipe recipeId={makeNewRecipeId()}/>
    </>
  )
}

export default App
