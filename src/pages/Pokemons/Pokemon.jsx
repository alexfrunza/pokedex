import React from "react";
import StatusChart from "components/StatsChart/StatsChart";
import { stats } from "data/data.js";
import "./Pokemon.css";

function Pokemon() {
    return (
        <div>
            <StatusChart stats={stats} />
            This is a pokemon!
        </div>
    );
}

export default Pokemon;
