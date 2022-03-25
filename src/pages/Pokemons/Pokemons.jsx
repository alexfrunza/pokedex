import "./Pokemons.css";
import Card from "components/Card/Card";
import Loader from "components/Loader/Loader";
import NotFoundPage from "pages/404/NotFoundPage";
import { useState, useContext } from "react";
import usePokemonsFetch from "hooks/usePokemonsFetch.js";
import PokemonsStore from "store/PokemonsStore";

export default function Pokemons() {
    const [search, setSearch] = useState("");
    const [page] = useState(1);
    const { loading, error } = usePokemonsFetch(1);
    const { pokemons } = useContext(PokemonsStore);

    function modifySearch(event) {
        setSearch(event.target.value);
    }

    function renderPokemons() {
        const offset = 12;

        const pokemonsData = pokemons.current
            .slice(1, offset * page + 1)
            .reduce((previousValue, currentValue) => {
                const {
                    id,
                    name,
                    types,
                    sprites: {
                        other: {
                            "official-artwork": { front_default: img },
                        },
                    },
                } = currentValue;
                if (
                    id === parseInt(search, 10) ||
                    name.startsWith(search.toLowerCase()) ||
                    types.some((entry) =>
                        entry.type.name.startsWith(search.toLowerCase())
                    )
                )
                    return previousValue.concat(
                        <Card
                            key={id}
                            name={name}
                            id={id}
                            types={types}
                            img={img}
                        />
                    );
                return previousValue;
            }, []);

        return pokemonsData.length > 0 ? (
            pokemonsData
        ) : (
            <h3 className="warning"> No pokemon data! </h3>
        );
    }

    return loading ? (
        <div className="container container-loader">
            <Loader />
        </div>
    ) : error.ok ? (
        <NotFoundPage />
    ) : (
        <div className="pokemons-section">
            <div className="container">
                <input
                    className="search-bar"
                    placeholder="Search pokemon name, number or type..."
                    value={search}
                    onChange={modifySearch}
                />

                <section id="gallery">{renderPokemons()}</section>
            </div>
        </div>
    );
}
