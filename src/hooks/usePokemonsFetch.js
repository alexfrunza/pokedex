import { useState, useEffect, useRef, useContext } from "react";
import PokemonsStore from "store/PokemonsStore";

export default function usePokemonsFetch(page) {
    const cache = useRef({
        0: { next: "https://pokeapi.co/api/v2/pokemon?limit=12" },
    });
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const { pokemons } = useContext(PokemonsStore);

    useEffect(() => {
        let cancelRequest = false;

        const fetchData = async () => {
            if (cache.current[page]) {
                const data = cache.current[page];
                setData(data);
                setLoading(false);
            } else {
                try {
                    const response = await fetch(cache.current[page - 1].next);
                    const data = await response.json();
                    cache.current[page] = data;

                    const pokemonsArray = data.results;
                    const pokemonsRequests = pokemonsArray.map(({ url }) => {
                        const pokemonId = url.split("/").reverse()[2];
                        return (
                            pokemons[pokemonId] ||
                            fetch(url).then((res) => res.json())
                        );
                    });

                    const resultsPokemons = await Promise.all(pokemonsRequests);
                    resultsPokemons.forEach((pokemon) => {
                        const id = pokemon.id;
                        if (!pokemons[id]) {
                            pokemons.current[id] = pokemon;
                        }
                    });

                    setData(data);
                    setLoading(false);
                } catch (error) {
                    if (cancelRequest) return;
                    setError({ description: "Oops, there was an error!" });
                    setLoading(false);
                }
            }
        };

        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
        // eslint-disable-next-line
    }, [page]);

    return { data, loading, error };
}
