import React, { useState } from "react";
import pokeballRed from "images/pokeball-red.png";
import pokeballBlue from "images/pokeball-blue.png";
import "./Description.css";

export default function Description({ flavorTextEntries }) {
    const [descriptionVersion, setDescriptionVersion] = useState("sword");

    function pokemonDescription() {
        const swordShieldDesc = flavorTextEntries.filter(
            (item) =>
                descriptionVersion === item.version.name &&
                item.language.name === "en"
        );
        return swordShieldDesc.length
            ? swordShieldDesc[0].flavor_text
            : flavorTextEntries[0].flavor_text;
    }

    function classButton(buttonName) {
        return buttonName === descriptionVersion
            ? `${descriptionVersion}-active`
            : "not-active";
    }

    return (
        <article className="description">
            <p className="description">{pokemonDescription()}</p>
            <div className="version">
                <p> Versions </p>
                <button
                    onClick={() => setDescriptionVersion("sword")}
                    className={classButton("sword")}
                >
                    <img src={pokeballBlue} alt="Pokeball blue" />
                </button>
                <button
                    onClick={() => setDescriptionVersion("shield")}
                    className={classButton("shield")}
                >
                    <img src={pokeballRed} alt="Pokeball red" />
                </button>
            </div>
        </article>
    );
}
