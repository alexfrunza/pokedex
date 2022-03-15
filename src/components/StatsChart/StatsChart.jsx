import React from "react";
import "./StatsChart.css";
import { toTitleCase } from "shared/helpers.js";
import { nanoid } from "nanoid";

export default function StatsChart({ stats }) {
    function renderColumn(points) {
        const filledBoxes = Math.ceil(points / 17);
        const boxes = [];

        // Add empty boxes to array
        for (let i = 1; i <= 15 - filledBoxes; i++) {
            boxes.push(<li key={nanoid()} className="empty-box"></li>);
        }

        // Add filled boxes to array
        for (let i = 1; i <= filledBoxes; i++) {
            boxes.push(<li key={nanoid()} className="filled-box"></li>);
        }
        return boxes;
    }

    return (
        <div className="stats-chart">
            <p className='title'> Stats </p>
            {stats.map(({ base_stat, stat: { name } }) => {
                return (
                    <ul key={nanoid()}>
                        {renderColumn(base_stat)}
                        {toTitleCase(name.replaceAll("-", " "))}
                    </ul>
                );
            })}
        </div>
    );
}
