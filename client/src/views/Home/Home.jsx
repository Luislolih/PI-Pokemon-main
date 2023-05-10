import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import { orderPokemon } from "../../redux/actions";
import styles from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();
    const [types, setTypes] = useState([]);
    const pokemons = useSelector((state) => state.pokemons);

    const [selectedType, setSelectedType] = useState("");
    const [selectedOrigin, setSelectedOrigin] = useState("");
    const filteredPokemons = pokemons
        .filter((pokemon) => {
            if (selectedOrigin === "creados") {
                return pokemon.hasOwnProperty("createdAt");
            } else if (selectedOrigin === "existentes") {
                return !pokemon.hasOwnProperty("createdAt");
            } else {
                return true;
            }
        })
        .filter((pokemon) => {
            if (selectedType) {
                return pokemon.type.includes(selectedType);
            } else {
                return true;
            }
        });

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/type")
            .then((response) => response.json())
            .then((data) => setTypes(data.results))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.filterSortBar}>
                <div className={styles.filterContainer}>
                    <span className={styles.filterLabel}>Filters:</span>
                    <div className={styles.filterSelectors}>
                        <select
                            onChange={(e) => setSelectedType(e.target.value)}
                            value={selectedType}
                        >
                            <option value="">All types</option>
                            {types.map((type) => (
                                <option
                                    className={styles.typeName}
                                    key={type.name}
                                    value={type.name}
                                >
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={(e) => setSelectedOrigin(e.target.value)}
                            value={selectedOrigin}
                        >
                            <option value="">All origins</option>

                            <option value="creados">Created</option>
                            <option value="existentes">Originals</option>
                        </select>
                    </div>
                </div>
                <div className={styles.sortContainer}>
                    <span className={styles.sortLabel}>Order:</span>
                    <div className={styles.sortSelectors}>
                        <select
                            onChange={(e) =>
                                dispatch(orderPokemon(e.target.value))
                            }
                        >
                            <option value="ASC">Default</option>
                            <option value="A_Z">(A-Z)</option>
                            <option value="Z_A">(Z-A)</option>
                            <option value="ATTACK_MAS">Attack (+ to -)</option>
                            <option value="ATTACK_MENOS">
                                Attack (- to +)
                            </option>
                            <option value="ASC">First to Last</option>
                            <option value="DESC">Last to First</option>
                        </select>
                    </div>
                </div>
            </div>
            <CardsContainer
                pokemons={
                    selectedOrigin === ""
                        ? filteredPokemons
                        : filteredPokemons.filter((pokemon) =>
                              selectedOrigin === "creados"
                                  ? pokemon.hasOwnProperty("createdAt")
                                  : !pokemon.hasOwnProperty("createdAt")
                          )
                }
            />
        </div>
    );
};

export default Home;
