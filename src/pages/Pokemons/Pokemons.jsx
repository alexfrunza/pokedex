import "./Pokemons.css";
import Card from "components/Card/Card";
import Loader from "components/Loader/Loader";
import NotFoundPage from "pages/404/NotFoundPage";
import React, { useState, useCallback, useEffect, useRef } from "react";
import usePokemonsFetch from "hooks/usePokemonsFetch";

export default function Pokemons() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const { data, loading, error } = usePokemonsFetch(page, 12);
    const loader = useRef(null);

    function modifySearch(event) {
        setSearch(event.target.value);
    }

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
        // eslint-disable-next-line
    }, [handleObserver]);

    const pokemonsData = data.reduce((previousValue, currentValue) => {
        const {
            id,
            name,
            types,
            sprites: {
                other: {
                    "official-artwork": { front_default: img },
                },
            },
        } = currentValue;
        if (
            id === parseInt(search, 10) ||
            name.startsWith(search.toLowerCase()) ||
            types.some((entry) =>
                entry.type.name.startsWith(search.toLowerCase())
            )
        ) {
            return previousValue.concat(
                <Card key={id} name={name} id={id} types={types} img={img} />
            );
        }
        return previousValue;
    }, []);

    function renderPokemons() {
        return pokemonsData.length > 0 || loading ? (
            pokemonsData
        ) : (
            <h3 className="warning"> No pokemon data! </h3>
        );
    }

    function loaderIfRenderMore() {
        if (loading) return <Loader />;
        return "";
    }

    return (
        <div>
            {error.ok ? (
                <NotFoundPage />
            ) : (
                <div className="pokemons-section">
                    <div className="container">
                        <input
                            className="search-bar"
                            placeholder="Search pokemon name, number or type..."
                            value={search}
                            onChange={modifySearch}
                        />

                        <section id="gallery">{renderPokemons()}</section>
                        {loaderIfRenderMore()}
                    </div>
                </div>
            )}
            <div ref={loader} />
        </div>
    );
}
