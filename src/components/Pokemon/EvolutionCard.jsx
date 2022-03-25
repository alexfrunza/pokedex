import React from "react";
import "./EvolutionCard.css";
import { typeClass, toTitleCase, formatId } from "shared/helpers.js";
import usePokemonFetch from "hooks/usePokemonFetch";
import { Link } from "react-router-dom";

export default function EvolutionCard({ pokemonName }) {
    const { data, loading } = usePokemonFetch(pokemonName);

    return !loading ? (
        <Link to={`/pokemons/${data.id}`}>
            <article className="stage">
                <img
                    src={data.sprites.other["official-artwork"].front_default}
                    alt="stage-1"
                />
                <h3>
                    {toTitleCase(data.name)} #{formatId(data.id)}
                </h3>
                {data.types.map(({ type: { name } }, index) => {
                    return (
                        <span key={index} className={typeClass(name)}>
                            {toTitleCase(name)}
                        </span>
                    );
                })}
            </article>
        </Link>
    ) : "";
}
