import { useRecipes } from './hooks/useRecipes.js'
import SearchableRecipeList from './SearchableRecipeList.jsx'

import AddIcon from '@mui/icons-material/Add';

export default function RecipeSelectionList({selectedIds, onSelectRecipe}){
    const {recipesList, deleteRecipe} = useRecipes();

    return(
        <SearchableRecipeList 
            recipes={recipesList} 
            onItemClick={onSelectRecipe} 
            selectedIds={selectedIds}
        />
    )

}