import React from "react";
import "./Loader.css";
import "animate.css";
import loaderPng from "images/loader.png";

export default function Loader() {
    return (
        <img
            src={loaderPng}
            alt="loader"
            className="o-pokeball c-loader u-pulse"
        ></img>
    );
}
