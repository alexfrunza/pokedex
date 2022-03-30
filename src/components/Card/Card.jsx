import "./Card.css";
import React from "react";
import "shared/pokemonTypes.css";
import { toTitleCase, typeClass, formatId } from "shared/helpers";
import { Link } from "react-router-dom";

// eslint-disable-next-line
function Card({ name, types, id, img }) {
    return (
        <div className="card">
            <Link to={`/pokemons/${id}`}>
                <img src={img} alt={toTitleCase(name)} />
            </Link>
            <div className="details">
                <p className="id"> #{formatId(id)} </p>
                <br />
                <h3 className="name"> {toTitleCase(name)} </h3>
                <div className="types">
                    {types.map(({ type: { name: typeName } }) => (
                        <span key={typeName} className={typeClass(typeName)}>
                            {toTitleCase(typeName)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;
