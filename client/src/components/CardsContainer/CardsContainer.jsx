import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { Link } from "react-router-dom";
import Paginate from "../Paginate/Paginate";
import { useSelector } from "react-redux";

const CardsContainer = ({ pokemons }) => {
    const { numPage } = useSelector((state) => state);

    let desde = (numPage - 1) * 12;
    let hasta = numPage * 12;

    let viewPokemons = pokemons.slice(desde, hasta);
    let cantPages = Math.ceil(pokemons.length / 12);

    return (
        <div>
            <div className={style.container}>
                {viewPokemons &&
                    viewPokemons.map((pokemon) => {
                        return (
                            <Link key={pokemon.id} to={`/detail/${pokemon.id}`}>
                                <Card
                                    id={pokemon.id}
                                    key={pokemon.id}
                                    image={pokemon.image}
                                    name={pokemon.name}
                                    type={pokemon.type}
                                />
                            </Link>
                        );
                    })}
                ;
            </div>
            <Paginate cantPages={cantPages} />
        </div>
    );
};
export default CardsContainer;
