import "./Card.css";
import "shared/pokemonTypes.css";
import { toTitleCase, typeClass, formatId } from "shared/helpers.js";
import { Link } from "react-router-dom";

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
                    {types.map(({ type: { name } }, index) => {
                        return (
                            <span
                                key={index}
                                className={typeClass(name)}
                            >
                                {toTitleCase(name)}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Card;
