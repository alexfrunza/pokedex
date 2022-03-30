import React, { createContext, useRef } from "react";

export const PokemonsStore = createContext({});

export function PokemonsStoreProvider({ children }) {
    const pokemons = useRef([]);

    return (
        // TODO
        // eslint-disable-next-line
        <PokemonsStore.Provider value={{ pokemons }}>
            {children}
        </PokemonsStore.Provider>
    );
}

export default PokemonsStore;
