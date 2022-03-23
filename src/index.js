import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import Pokemons from "pages/Pokemons/Pokemons";
import Pokemon from "pages/Pokemons/Pokemon";
import Header from "components/Layout/Header";
import NotFoundPage from "pages/404/NotFoundPage";
import { PokemonsStoreProvider } from "store/PokemonsStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <PokemonsStoreProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    {["/", "/pokemons"].map((path) => (
                        <Route key={path} path={path} element={<Pokemons />} />
                    ))}
                    <Route path="/pokemons/:id" element={<Pokemon />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </PokemonsStoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
