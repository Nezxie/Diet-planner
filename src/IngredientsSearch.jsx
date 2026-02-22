import './styles/IngredientsSearch.css'
import SearchBar from "./SearchBar.jsx"
import ProductList from './ProductList.jsx'

export default function IngredientsSearch({foodList, onSelectProduct, onIngredientSearch}){
    return(
        <div className="ingredients-search">
                <SearchBar onSubmit={onIngredientSearch}/>
                {foodList&&<ProductList foodList={foodList} onSelectProduct={onSelectProduct}/>}
                </div>
    )
}