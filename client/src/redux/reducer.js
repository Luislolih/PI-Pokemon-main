import {
    GET_POKEMONS,
    GET_POKEMON_NAME,
    POKEMON_ORDER,
    NEXT_PAGE,
    PREV_PAGE,
    SET_PAGE,
} from "./actions";

const initialState = {
    numPage: 1,
    pokemons: [],
    filteredPokemons: [],
    activeType: "",
    types: [],
};
let historyData = [];

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_PAGE:
            historyData = {
                ...state,
                numPage: state.numPage + 1,
                type: NEXT_PAGE,
            };

            return {
                ...state,
                numPage: state.numPage + 1,
            };
        case PREV_PAGE:
            historyData = {
                ...state,
                numPage: state.numPage - 1,
                type: PREV_PAGE,
            };

            return {
                ...state,
                numPage: state.numPage - 1,
            };
        case SET_PAGE:
            historyData = {
                ...state,
                numPage: action.payload,
                type: SET_PAGE,
            };

            return {
                ...state,
                numPage: action.payload,
            };
        case GET_POKEMONS:
            historyData = {
                ...state,
                pokemons: action.payload,
                type: GET_POKEMONS,
            };
            sessionStorage.setItem("historyData", JSON.stringify(historyData));
            return { ...state, pokemons: action.payload };
        case GET_POKEMON_NAME:
            return { ...initialState, pokemons: action.payload };
        case POKEMON_ORDER:
            let dataOrder = [];
            if (action.payload === "ASC") {
                dataOrder = state.pokemons?.slice().sort((a, b) => a.id - b.id);
            } else if (action.payload === "DESC") {
                dataOrder = state.pokemons?.slice().sort((a, b) => b.id - a.id);
            } else if (action.payload === "A_Z") {
                dataOrder = state.pokemons
                    ?.slice()
                    .sort((a, b) => a.name.localeCompare(b.name));
            } else if (action.payload === "Z_A") {
                dataOrder = state.pokemons
                    ?.slice()
                    .sort((a, b) => b.name.localeCompare(a.name));
            } else if (action.payload === "ATTACK_MENOS") {
                dataOrder = dataOrder.concat(
                    state.pokemons?.sort((a, b) => {
                        return a.attack - b.attack;
                    })
                );
            } else if (action.payload === "ATTACK_MAS") {
                dataOrder = dataOrder.concat(
                    state.pokemons?.sort((a, b) => {
                        return b.attack - a.attack;
                    })
                );
            }
            historyData = {
                ...state,
                pokemons: dataOrder,
                type: POKEMON_ORDER,
            };

            sessionStorage.setItem("historyData", JSON.stringify(historyData));
            return { ...state, pokemons: dataOrder };

        default:
            historyData = { ...state, type: GET_POKEMONS };
            sessionStorage.setItem("historyData", JSON.stringify(historyData));
            return { ...state };
    }
};

export default rootReducer;
