import React, { useState, useContext } from "react";
import StatusChart from "components/StatsChart/StatsChart";
import PokemonsStore from "store/PokemonsStore";
import "./Pokemon.css";
import "shared/pokemonTypes.css";
import { useParams } from "react-router-dom";
import { description, stats } from "data/data.js";
import NotFoundPage from "pages/404/NotFoundPage";
import { toTitleCase, typeClass, formatId } from "shared/helpers.js";
import pokeballBlue from "images/pokeball-blue.png";
import pokeballRed from "images/pokeball-red.png";
import female from "images/femenine.png";
import male from "images/mars.png";
import rightArrow from "images/right-arrow.png";
import EvolutionCard from "components/Card/EvolutionCard";

function Pokemon() {
    const params = useParams();
    const [descriptionVersionX, setDescriptionVersionX] = useState(true);
    const { pokemons } = useContext(PokemonsStore);

    const pokemon = pokemons.filter(({ id, name }) => {
        return id === +params.id || name === params.id;
    })[0];

    return pokemon ? (
        <div className="container">
            <header>
                <h2>
                    {toTitleCase(pokemon.name)}
                    <span> #{formatId(pokemon.id)} </span>
                </h2>
            </header>
            <main className="pokemon">
                <section>
                    <img
                        src={
                            pokemon.sprites.other["official-artwork"]
                                .front_default
                        }
                        alt={toTitleCase(pokemon.name)}
                    />
                </section>
                <section>
                    <article className="description">
                        <p className="description">
                            {description[+descriptionVersionX]}
                        </p>
                        <div className="version">
                            <p> Versions </p>
                            <button
                                onClick={() => setDescriptionVersionX(true)}
                                className={
                                    descriptionVersionX
                                        ? "active-x"
                                        : "not-active"
                                }
                            >
                                <img src={pokeballBlue} alt="Pokeball blue" />
                            </button>
                            <button
                                onClick={() => setDescriptionVersionX(false)}
                                className={
                                    descriptionVersionX
                                        ? "not-active"
                                        : "active-y"
                                }
                            >
                                <img src={pokeballRed} alt="Pokeball red" />
                            </button>
                        </div>
                    </article>
                    <article className="general-information">
                        <div className="pokemon-info">
                            <p className="pokemon-info-header">Height</p>
                            <p className="pokemon-info-content">2'04''</p>
                        </div>
                        <div className="pokemon-info">
                            <p className="pokemon-info-header">Category</p>
                            <p className="pokemon-info-content">Seed</p>
                        </div>
                        <div className="pokemon-info">
                            <p className="pokemon-info-header">Weight</p>
                            <p className="pokemon-info-content">15.2lbs</p>
                        </div>
                        <div className="pokemon-info">
                            <p className="pokemon-info-header">Abilities</p>
                            <p className="pokemon-info-content">Overgrow</p>
                        </div>
                        <div className="pokemon-info">
                            <p className="pokemon-info-header">Gender</p>
                            <p className="pokemon-info-content">
                                <img src={male} alt="Male" />
                                <img src={female} alt="Female" />
                            </p>
                        </div>
                    </article>
                    <article className="types">
                        <p className="types-header">Type</p>
                        {pokemon.types.map(({ type: { name } }, index) => {
                            return (
                                <span
                                    key={index}
                                    className={typeClass(toTitleCase(name))}
                                >
                                    {toTitleCase(name)}
                                </span>
                            );
                        })}
                    </article>
                </section>
            </main>
            <StatusChart stats={stats} />
            <section className="evolution">
                <p className="evolution-header">Evolutions</p>
                <EvolutionCard pokemon={pokemon} />
                <img
                    style={{ alignSelf: "center" }}
                    src={rightArrow}
                    alt="arrow"
                />
                <EvolutionCard pokemon={pokemon} />
                <img
                    style={{ alignSelf: "center" }}
                    src={rightArrow}
                    alt="arrow"
                />
                <EvolutionCard pokemon={pokemon} />
            </section>
        </div>
    ) : (
        <NotFoundPage />
    );
}

export default Pokemon;
