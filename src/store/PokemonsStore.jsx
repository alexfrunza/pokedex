import { createContext, useState, useRef } from "react";

export const PokemonsStore = createContext({});

export function PokemonsStoreProvider({ children }) {
    const pokemons = useRef([]);
    // const [pokemons, setPokemons] = useState([]);

    return (
        <PokemonsStore.Provider value={{ pokemons }}>
            {children}
        </PokemonsStore.Provider>
    );
}

export default PokemonsStore;
