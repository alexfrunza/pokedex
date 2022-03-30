import { useState, useEffect, useContext } from "react";
import PokemonsStore from "store/PokemonsStore";

export default function usePokemonsFetch(page, offset) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const { pokemons } = useContext(PokemonsStore);

    function verifyCache() {
        for (let i = offset * (page - 1) + 1; i <= page * offset; i += 1) {
            if (!pokemons[i]) return false;
        }
        return true;
    }

    useEffect(() => {
        let cancelRequest = false;
        if (!page) return undefined;
        setLoading(true);

        const fetchData = async () => {
            if (verifyCache()) {
                const newData = pokemons.current.slice(1, page * offset);
                setData(newData);
                setLoading(false);
            } else {
                try {
                    const urls = [];
                    for (
                        let i = offset * (page - 1) + 1;
                        i <= page * offset;
                        i += 1
                    ) {
                        urls.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
                    }

                    const pokemonsRequests = urls.map((url) => {
                        const pokemonId = url.split("/").reverse()[2];
                        return (
                            pokemons[pokemonId] ||
                            fetch(url).then((res) => res.json())
                        );
                    });

                    const resultsPokemons = await Promise.all(pokemonsRequests);
                    resultsPokemons.forEach((pokemon) => {
                        const { id } = pokemon;
                        if (!pokemons[id]) {
                            pokemons.current[id] = pokemon;
                        }
                    });

                    setData(pokemons.current.slice(1, page * offset + 1));
                    setLoading(false);
                } catch (fetchError) {
                    if (cancelRequest) return;
                    setError({
                        description: "Oops, there was an error!",
                        ok: true,
                    });
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
