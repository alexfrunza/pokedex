import React, { useState } from "react";
import usePokemonFetch from "hooks/usePokemonFetch";
import StatusChart from "components/StatsChart/StatsChart";
import "./Pokemon.css";
import "shared/pokemonTypes.css";
import { useParams } from "react-router-dom";
import NotFoundPage from "pages/404/NotFoundPage";
import { toTitleCase, typeClass, formatId } from "shared/helpers.js";
import rightArrow from "images/right-arrow.png";
import EvolutionCard from "components/Pokemon/EvolutionCard";
import PokemonInfoCard from "components/Pokemon/PokemonInfoCard";
import Description from "components/Pokemon/Description";
import Loader from "components/Loader/Loader";

function Pokemon() {
    const params = useParams();
    const { data, loading, error } = usePokemonFetch(params.id);

    function renderPokemonPage() {
        return (
            <div>
                <header>
                    <h2>
                        {toTitleCase(data.name)}
                        <span> #{formatId(data.id)} </span>
                    </h2>
                </header>
                <main className="pokemon">
                    <section>
                        <img
                            src={
                                data.sprites.other["official-artwork"]
                                    .front_default
                            }
                            alt={toTitleCase(data.name)}
                        />
                    </section>
                    <section>
                        <Description
                            flavorTextEntries={data.flavorTextEntries}
                        />
                        <article className="general-information">
                            <PokemonInfoCard
                                title="Height"
                                content={data.height}
                            />
                            <PokemonInfoCard title="Category" content="" />
                            <PokemonInfoCard title="Weight" content="" />
                            <PokemonInfoCard title="Abilities" content="" />
                        </article>
                        <article className="types">
                            <p className="types-header">Type</p>
                            {data.types.map(({ type: { name } }, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={typeClass(name)}
                                    >
                                        {toTitleCase(name)}
                                    </span>
                                );
                            })}
                        </article>
                    </section>
                </main>
                <StatusChart stats={data.stats} />
                <section className="evolution">
                    <p className="evolution-header">Evolutions</p>
                    <EvolutionCard pokemon={data} />
                    <img
                        style={{ alignSelf: "center" }}
                        src={rightArrow}
                        alt="arrow"
                    />
                    <EvolutionCard pokemon={data} />
                    <img
                        style={{ alignSelf: "center" }}
                        src={rightArrow}
                        alt="arrow"
                    />
                    <EvolutionCard pokemon={data} />
                </section>
            </div>
        );
    }

    return loading ? (
        <div className="container container-loader">
            <Loader />
        </div>
    ) : error.ok ? (
        <NotFoundPage />
    ) : (
        <div className="container">{renderPokemonPage()}</div>
    );
}

export default Pokemon;
