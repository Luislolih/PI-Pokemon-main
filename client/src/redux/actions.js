import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const POKEMON_ORDER = "POKEMON_ORDER";
export const GET_TYPES = "GET_TYPES";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const SET_PAGE = "SET_PAGE";

const URL = "http://localhost:3001";

export const getPokemons = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`${URL}/pokemons/`);
            const pokemons = apiData.data;
            dispatch({ type: GET_POKEMONS, payload: pokemons });
        } catch (error) {
            console.log(error);
            // Manejar el error aquí
        }
    };
};

export const getTypes = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`${URL}/types`);
            dispatch({ type: GET_TYPES, payload: apiData.data });
        } catch (error) {
            console.log(error);
            // Manejar el error aquí
        }
    };
};

export const getPokemon = (id) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`${URL}/pokemons/${id}`);
            const pokemon = apiData.data.results;
            dispatch({ type: GET_POKEMON, payload: pokemon });
        } catch (error) {
            console.log(error);
            // Manejar el error aquí
        }
    };
};

export const getPokemonName = (name) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(
                `${URL}/pokemons/name?name=${name}`
            );

            dispatch({ type: GET_POKEMON_NAME, payload: [apiData.data] });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error("Pokemon not found");
            } else {
                console.log(error);
                // Manejar otros errores aquí si es necesario
            }
        }
    };
};

export const orderPokemon = (option) => {
    return (dispatch) => {
        console.log("action", option);
        dispatch({ type: POKEMON_ORDER, payload: option });
    };
};

export const nextPage = () => {
    return {
        type: NEXT_PAGE,
    };
};
export const prevPage = () => {
    return {
        type: PREV_PAGE,
    };
};
export const setPage = (num) => {
    return {
        type: SET_PAGE,
        payload: num,
    };
};
