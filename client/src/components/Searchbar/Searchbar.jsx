import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName, getPokemons } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const handleSearch = async () => {
        try {
            setErrorMessage("");
            await dispatch(getPokemonName(searchText));
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleKeyUp = (event) => {
        if (searchText === "") {
            setErrorMessage("");
            dispatch(getPokemons());
        }
    };

    useEffect(() => {
        if (searchText === "") {
            setErrorMessage("");
        }
    }, [searchText]);

    return (
        <div className={style.searchBar}>
            <input
                className={style.searchInput}
                type="text"
                placeholder="Search Pokemon..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyPress={handleKeyPress}
                onKeyUp={handleKeyUp}
            />
            {errorMessage && <p className={style.errorfound}>{errorMessage}</p>}
        </div>
    );
};

export default SearchBar;
