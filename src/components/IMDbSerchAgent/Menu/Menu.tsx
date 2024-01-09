import { NavLink } from "react-router-dom";
// import './menu.css'

export default function Menu() {
    return (
        <nav className="menu">
            <NavLink className="menu-item" to="/ra-redux-toolkit-ts/">К поиску</NavLink>
            <NavLink className="menu-item" to="/ra-redux-toolkit-ts/favorite">Избранное</NavLink>
            {/* <NavLink className="menu-item" to="/film-card/:id">Тут будет фильм</NavLink> */}
        </nav>
    );
}