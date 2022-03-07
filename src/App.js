import "./App.css";
import { toTitleCase } from "shared/helpers.js";
import { mockData } from "data/data.js";
import Card from "components/Card";
import { useState } from "react";

function App() {
    const [search, setSearch] = useState("");

    function modifySearch(event) {
        setSearch(event.target.value);
    }

    function renderPokemons() {
        const pokemonsData = mockData.reduce((previousValue, currentValue) => {
            const {
                id,
                name,
                types,
                sprites: {
                    other: {
                        official_artwork: { front_default: img },
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

        return pokemonsData ? (
            pokemonsData
        ) : (
            <h3 className="warning"> No pokemon data! </h3>
        );
    }

    return (
        <div className="App">
            <header>
                <h1> Pokédex </h1>
                <input
                    className="search-bar"
                    placeholder="Search pokemon name, number or type..."
                    onChange={modifySearch}
                />
            </header>
            <div className="container">
                <section id="gallery">{renderPokemons()}</section>
            </div>
        </div>
    );
}

export default App;
