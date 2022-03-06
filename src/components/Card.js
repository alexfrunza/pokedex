import "components/Card.css";
import { typeClass } from "helpers/pokemon.js";

function Card({ name, type, id, img }) {
    const alt = `An image with ${name}`;

    return (
        <div className="card">
            <img src={img} alt={alt} />
            <div className="details">
                <p className="id"> #{id.toString().padStart(3, "0")} </p>
                <br />
                <h3 className="name"> {name} </h3>
                <div className="types">
                    {type.map((type, index) => {
                        return (
                            <span key={index} className={typeClass(type)}>
                                {type}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Card;
