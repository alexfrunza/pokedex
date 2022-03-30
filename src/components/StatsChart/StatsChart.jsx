import React from "react";
import "./StatsChart.css";
import { toTitleCase } from "shared/helpers";

export default function StatsChart({ stats }) {
    function renderColumn(points) {
        const filledBoxes = Math.ceil(points / 17);
        const boxes = [];

        // Add empty boxes to array
        for (let i = 1; i <= 15 - filledBoxes; i += 1) {
            boxes.push(<li key={i} className="empty-box" />);
        }

        // Add filled boxes to array
        for (let i = 15 - filledBoxes + 1; i <= 15; i += 1) {
            boxes.push(<li key={i} className="filled-box" />);
        }
        return boxes;
    }

    return (
        <div className="stats-chart">
            <p className="title"> Stats </p>
            {stats.map(({ base_stat: baseStat, stat: { name } }) => (
                <ul key={name}>
                    {renderColumn(baseStat)}
                    {toTitleCase(name.replaceAll("-", " "))}
                </ul>
            ))}
        </div>
    );
}
