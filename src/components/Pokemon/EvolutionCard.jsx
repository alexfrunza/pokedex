import React from "react";
import "./EvolutionCard.css";
import { typeClass, toTitleCase, formatId } from "shared/helpers.js";
import { Link } from "react-router-dom";

export default function EvolutionCard({ pokemon }) {
    return (
        <Link to={`/pokemons/${pokemon.id}`}>
            <article className="stage">
                <img
                    src={
                        pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt="stage-1"
                />
                <h3>
                    {toTitleCase(pokemon.name)} #{formatId(pokemon.id)}
                </h3>
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
        </Link>
    );
}
