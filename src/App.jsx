import './App.css'
import ProductList from './ProductList.jsx';

function App() {

  return (
    <>
      <h1>Diet planner app</h1>
      <ProductList showSearchBar={true}/>
      <p>Nutritional data aquired from <a href="https://fdc.nal.usda.gov/">FoodData Central</a></p>
    </>
  )
}

export default App
