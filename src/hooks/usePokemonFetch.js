import { useState, useEffect, useContext } from "react";
import PokemonsStore from "store/PokemonsStore";

export default function usePokemonFetch(id) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    const { pokemons } = useContext(PokemonsStore);

    useEffect(() => {
        let cancelRequest = false;
        if (!id) return undefined;

        const fetchData = async () => {
            if (
                pokemons.current[id] &&
                pokemons.current[id].flavorTextEntries
            ) {
                const newData = pokemons.current[id];
                setData(newData);
                setLoading(false);
            } else {
                try {
                    const urls = [
                        `https://pokeapi.co/api/v2/pokemon/${id}`,
                        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
                    ];

                    const requests = urls.map((url) =>
                        fetch(url).then((res) => res.json())
                    );

                    const responses = await Promise.all(requests);

                    const evolutionChain = await fetch(
                        responses[1].evolution_chain.url
                    ).then((res) => res.json());

                    const newData = {
                        ...responses[0],
                        flavorTextEntries: responses[1].flavor_text_entries,
                        habitat: responses[1].habitat.name,
                        shape: responses[1].shape.name,
                        chain: [evolutionChain.chain],
                    };

                    pokemons.current[id] = data;
                    setData(newData);
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
    }, [id]);

    return { data, loading, error };
}
