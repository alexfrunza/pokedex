import { createContext, useRef } from "react";

export const PokemonsStore = createContext({});

export function PokemonsStoreProvider({ children }) {
    const pokemons = useRef([]);

    return (
        <PokemonsStore.Provider value={{ pokemons }}>
            {children}
        </PokemonsStore.Provider>
    );
}

export default PokemonsStore;
