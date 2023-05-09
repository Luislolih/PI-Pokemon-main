import { Link, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "./logoprincipal.png";
import SearchBar from "../../components/Searchbar/Searchbar";

const NavBar = () => {
    const location = useLocation();
    const showSearchBar = location.pathname === "/home";

    return (
        <nav className={style.navBar}>
            <div className={style.logo}>
                <Link to="/">
                    <img src={logo} alt="Pokemon logo" />
                </Link>
            </div>
            {showSearchBar && (
                <div className={style.searchBarContainer}>
                    <SearchBar />
                </div>
            )}
            <div className={style["menuContainer"]}>
                <ul className={style.menu}>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <div className={style["menuContainerDivider"]}></div>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
