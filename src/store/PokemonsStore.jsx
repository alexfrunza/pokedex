import { createContext, useState } from "react";

export const PokemonsStore = createContext({});

export function PokemonsStoreProvider({ children }) {
    const [pokemons, setPokemons] = useState({});

    return (
        <PokemonsStore.Provider value={{ setPokemons, pokemons }}>
            {children}
        </PokemonsStore.Provider>
    );
}

export default PokemonsStore;
