import React from "react";
import usePokemonFetch from "hooks/usePokemonFetch";
import StatusChart from "components/StatsChart/StatsChart";
import "./Pokemon.css";
import "shared/pokemonTypes.css";
import { useParams } from "react-router-dom";
import NotFoundPage from "pages/404/NotFoundPage";
import { toTitleCase, typeClass, formatId } from "shared/helpers";
import PokemonInfoCard from "components/Pokemon/PokemonInfoCard";
import EvolutionChain from "components/Pokemon/EvolutionChain";
import Description from "components/Pokemon/Description";
import Loader from "components/Loader/Loader";

function Pokemon() {
    const params = useParams();
    const { data, loading, error } = usePokemonFetch(params.id);

    function renderPokemonPage() {
        if (!loading && !error.ok) {
            return (
                <div className="container">
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
                                <PokemonInfoCard
                                    title="Habitat"
                                    content={data.habitat}
                                />
                                <PokemonInfoCard
                                    title="Weight"
                                    content={data.weight}
                                />
                                <PokemonInfoCard
                                    title="Shape"
                                    content={data.shape}
                                />
                            </article>
                            <article className="types">
                                <p className="types-header">Type</p>
                                {data.types.map(({ type: { name } }) => (
                                    <span
                                        key={name}
                                        className={typeClass(name)}
                                    >
                                        {toTitleCase(name)}
                                    </span>
                                ))}
                            </article>
                        </section>
                    </main>
                    <StatusChart stats={data.stats} />
                    <EvolutionChain chain={data.chain} />
                </div>
            );
        }
        if (!loading && error.ok) return <NotFoundPage />;
        return (
            <div className="container container-loader">
                <Loader />
            </div>
        );
    }

    return renderPokemonPage();
}

export default Pokemon;
