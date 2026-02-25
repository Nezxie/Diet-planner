import { NavLink } from "react-router";
import './styles/Header.css'
export default function Header(){
    return(
        <>
    <nav>
        <NavLink to="/">Diet planner app</NavLink>
        <NavLink to="/recipe-list">Recipes list</NavLink>
        <NavLink to="/preferences">Preferences</NavLink>
    </nav>
          </>
    )
    }