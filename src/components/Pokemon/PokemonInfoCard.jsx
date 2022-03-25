import React from "react";
import { toTitleCase } from "shared/helpers.js";

export default function PokemonInfoCard({ title, content }) {
    function formatContent() {
        console.log(content);
        if (title === "Height") return `${Number.parseFloat(content) / 10} m`;
        else if (title === "Weight")
            return `${Number.parseFloat(content) / 10} kg`;
        else if (title === "Shape" || title === "Habitat")
            return toTitleCase(content);
    }

    return (
        <div className="pokemon-info">
            <p className="pokemon-info-header">{title}</p>
            <p className="pokemon-info-content">{formatContent()}</p>
        </div>
    );
}
