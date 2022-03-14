import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header>
            <Link to="/pokemons">
                <h1> Pokédex </h1>
            </Link>
        </header>
    );
}
