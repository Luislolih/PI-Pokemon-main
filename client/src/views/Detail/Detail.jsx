import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getPokemon } from '../../redux/actions';
import styles from './Detail.module.css' // importar los estilos desde el archivo Detail.module.css

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const regexUUID = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;

  // Recuperar la información del Pokémon desde el almacenamiento local
  const storedPokemon = localStorage.getItem(id);
  const initialPokemon = storedPokemon ? JSON.parse(storedPokemon) : null;

  const pokemon = useSelector((state) => {
    if (regexUUID.test(id)) {
      return state.pokemons.find(p => p.id === id);
    } else {
      return state.pokemons.find(p => p.id === parseInt(id));
    }
  }) || initialPokemon; // Utilizar la información del almacenamiento local como valor inicial del estado si está disponible

  useEffect(() => {
    // Guardar la información del Pokémon en el almacenamiento local
    localStorage.setItem(id, JSON.stringify(pokemon));
    dispatch(getPokemon(id));
  }, [dispatch, id, pokemon]);

  if (!pokemon) {
    // Si no se encuentra el pokemon, muestra un mensaje de error o redirecciona a otra página
    return <div>Pokemon no encontrado.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{pokemon.name}</h1>
      <img className={styles.image} src={pokemon.image} alt={'Avatar de Pokemon'} />
      <div className={styles.stats}>
        <p className={styles.valorContent}>HP: <div className={styles.valor}>{pokemon.hp}</div></p>
        <p className={styles.valorContent}>Attack: <div className={styles.valor}>{pokemon.attack}</div></p>
        <p className={styles.valorContent}>Defense: <div className={styles.valor}>{pokemon.defense}</div></p>
        <p className={styles.valorContent}>Speed: <div className={styles.valor}>{pokemon.speed}</div></p>
        <p className={styles.valorContent}>Height: <div className={styles.valor}>{pokemon.height}</div></p>
        <p className={styles.valorContent}>Weight: <div className={styles.valor}>{pokemon.weight}</div></p>
        <p className={styles.valorContent}>Type: <div className={styles.valor}>{pokemon.type.join(', ')}</div></p>
      </div>
    </div>
  );
};

export default Detail;
