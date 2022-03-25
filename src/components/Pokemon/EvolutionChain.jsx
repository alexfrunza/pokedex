import React from "react";
import rightArrow from "images/right-arrow.png";
import EvolutionCard from "components/Pokemon/EvolutionCard";

export default function EvolutionChain({ chain }) {
    const arrow = (
        <img style={{ alignSelf: "center" }} src={rightArrow} alt="arrow" />
    );

    function makeEvolutionChain(chainLink, index=0) {
        const arr = [];
        arr.push(<EvolutionCard pokemonName={chainLink[0].species.name} />);
        if (chainLink[0].evolves_to.length) {
            arr.push(arrow);
            arr.push(...makeEvolutionChain(chainLink[0].evolves_to));
        }
        return arr;
    }

    return (
        <section className="evolution">
            <p className="evolution-header">Evolutions</p>
            {makeEvolutionChain(chain)}
        </section>
    );
}
