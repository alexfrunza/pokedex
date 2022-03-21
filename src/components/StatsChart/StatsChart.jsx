import React, { useEffect, useState } from "react";
import "./StatsChart.css";
import { toTitleCase } from "shared/helpers.js";
import { nanoid } from "nanoid";

export default function StatsChart({ stats }) {
    const [columns, setColumns] = useState([]);

    function generateBoxes() {
        const boxes = [];
        for (let i = 0; i < 15; i++) {
            boxes.push({ id: nanoid() });
        }
        return boxes;
    }

    function colorBoxes(boxes, points) {
        const filledBoxes = Math.ceil(points / 17);

        return boxes.map((box, index) => {
            return {
                ...box,
                className:
                    index < 15 - filledBoxes ? "empty-box" : "filled-box",
            };
        });
    }

    useEffect(() => {
        setColumns(
            stats.map(({ stat: { name } }) => {
                return {
                    name,
                    boxes: generateBoxes(),
                };
            })
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setColumns(
            stats.map(({ base_stat, stat: { name } }, index) => {
                return {
                    name,
                    boxes: colorBoxes(columns[index].boxes, base_stat),
                };
            })
        );
        // eslint-disable-next-line
    }, [stats]);

    function renderColumnElements(boxes) {
        return boxes.map(({ id, className }) => {
            return <li key={id} className={className}></li>;
        });
    }

    return (
        <div className="stats-chart">
            <p className="title"> Stats </p>
            {columns.map(({ name, boxes }) => {
                return (
                    <ul key={`${name}`}>
                        {renderColumnElements(boxes)}
                        {toTitleCase(name.replaceAll("-", " "))}
                    </ul>
                );
            })}
        </div>
    );
}
