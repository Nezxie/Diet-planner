import { NavLink } from "react-router";
import AddNewRecipeButton from './AddNewRecipeButton.jsx'
import './styles/Header.css'
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header(){
    return(
        <>
    <nav>
        <NavLink to="/">Diet planner app</NavLink>
        <NavLink to="/recipe-list">Recipes list</NavLink>
        <AddNewRecipeButton/>
        <NavLink to="/preferences" className="preferences" aria-label="preferences"><SettingsIcon/></NavLink>
    </nav>
          </>
    )
    }