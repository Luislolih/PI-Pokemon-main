import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(getPokemonName(searchText));
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={style.searchBar}>
            <input
                className={style.searchInput}
                type="text"
                placeholder="Buscar Pokémon..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default SearchBar;
