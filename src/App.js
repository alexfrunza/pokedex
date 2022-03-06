import "./App.css";
import dataMock from "data/data.js";
import Card from "components/Card";
import { useState, useEffect } from "react";

function App() {
    const [search, setSearch] = useState("");
    const [pokemonsData, setPokemonsData] = useState(dataMock);

    function modifySearch(event) {
        setSearch(event.target.value);
    }

    function toTitleCase(string) {
        return string
            .split(" ")
            .map((word) => {
                return word[0].toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");
    }

    useEffect(() => {
        if (search === "") {
            setPokemonsData(dataMock);
        } else {
            setPokemonsData(
                dataMock.filter(({ id, name, type }) => {
                    return (
                        id === parseInt(search) ||
                        name.startsWith(toTitleCase(search)) ||
                        type.includes(toTitleCase(search))
                    );
                })
            );
        }
    }, [search]);

    function renderPokemons() {
        if (pokemonsData.length !== 0) {
            return pokemonsData.map(({ id, name, type, img }) => {
                return (
                    <Card key={id} name={name} id={id} type={type} img={img} />
                );
            });
        }
        return <h3 className="warning"> No pokemon data! </h3>;
    }

    return (
        <div className="App">
            <header>
                <h1> Pokédex </h1>
                <input
                    className="search-bar"
                    placeHolder="Search pokemon name, number or type..."
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
