import { useState, useEffect, useContext } from "react";
import PokemonsStore from "store/PokemonsStore";

export default function usePokemonFetch(id) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    const { pokemons } = useContext(PokemonsStore);

    useEffect(() => {
        let cancelRequest = false;
        if (!id) return;

        const fetchData = async () => {
            if (
                pokemons.current[id] &&
                pokemons.current[id].flavorTextEntries
            ) {
                const data = pokemons.current[id];
                setData(data);
                setLoading(false);
            } else {
                try {
                    const urls = [
                        `https://pokeapi.co/api/v2/pokemon/${id}`,
                        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
                    ];

                    const requests = urls.map((url) => {
                        return fetch(url).then((res) => res.json());
                    });

                    const responses = await Promise.all(requests);

                    const data = {
                        ...responses[0],
                        flavorTextEntries: responses[1].flavor_text_entries,
                    };

                    pokemons.current[id] = data;
                    setData(data);
                    setLoading(false);
                } catch (error) {
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
    }, [id]);

    return { data, loading, error };
}
