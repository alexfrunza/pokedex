import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import Pokemons from "pages/Pokemons/Pokemons";
import Pokemon from "pages/Pokemons/Pokemon";
import Header from "components/Layout/Header";
import NotFoundPage from "pages/404/NotFoundPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Pokemons />} />
                <Route path="/pokemons" element={<Pokemons />} />
                <Route path="/pokemons/:id" element={<Pokemon />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
