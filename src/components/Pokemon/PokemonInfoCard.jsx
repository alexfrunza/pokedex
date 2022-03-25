import React from "react";

export default function PokemonInfoCard({title, content}) {

    function renderContent() {

    }
    return (
        <div className="pokemon-info">
            <p className="pokemon-info-header">{title}</p>
            <p className="pokemon-info-content">{content}</p>
        </div>
    );
}
