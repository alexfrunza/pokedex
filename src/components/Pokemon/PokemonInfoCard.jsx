import React from "react";
import { toTitleCase } from "shared/helpers";

export default function PokemonInfoCard({ title, content }) {
    function formatContent() {
        if (title === "Height") return `${Number.parseFloat(content) / 10} m`;
        if (title === "Weight") return `${Number.parseFloat(content) / 10} kg`;
        if (title === "Shape" || title === "Habitat") {
            return toTitleCase(content);
        }
        return "";
    }

    return (
        <div className="pokemon-info">
            <p className="pokemon-info-header">{title}</p>
            <p className="pokemon-info-content">{formatContent()}</p>
        </div>
    );
}
