import React from "react";
import StatusChart from "components/StatsChart/StatsChart";
import { stats } from "data/data.js";
import "./Pokemon.css";
import { useParams } from "react-router-dom";
import { mockData, description } from "data/data.js";
import NotFoundPage from "pages/404/NotFoundPage";
import { toTitleCase } from "shared/helpers.js";
import { useState } from "react";
import pokeballBlue from "images/pokeball-blue.png";
import pokeballRed from "images/pokeball-red.png";

function Pokemon() {
    const params = useParams();
    const [descriptionVersionX, setDescriptionVersionX] = useState(true);
    const pokemon = mockData.filter(({ id, name }) => {
        return id === +params.id || name === params.id;
    })[0];

    return pokemon ? (
        <div className="container">
            <header>
                <h2>
                    {toTitleCase(pokemon.name)}
                    <span> #{pokemon.id.toString().padStart(3, "0")} </span>
                </h2>
            </header>
            <main className="pokemon">
                <section>
                    <img
                        src={
                            pokemon.sprites.other.official_artwork.front_default
                        }
                        alt={toTitleCase(pokemon.name)}
                    />
                    <StatusChart stats={stats} />
                </section>
                <section>
                    <p className="description">
                        {description[+descriptionVersionX]}
                    </p>
                    <div className="version">
                        <p> Version </p>
                        <button
                            onClick={() => setDescriptionVersionX(true)}
                            className={
                                descriptionVersionX ? "active-x" : "not-active"
                            }
                        >
                            <img src={pokeballBlue} alt="Pokeball blue" />
                        </button>
                        <button
                            onClick={() => setDescriptionVersionX(false)}
                            className={
                                descriptionVersionX ? "not-active" : "active-y"
                            }
                        >
                            <img src={pokeballRed} alt="Pokeball red" />
                        </button>
                    </div>
                </section>
            </main>
        </div>
    ) : (
        <NotFoundPage />
    );
}

export default Pokemon;
