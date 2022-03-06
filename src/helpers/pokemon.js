export function typeClass(type) {
    const colors = {
        Fire: "orange",
        Electric: "yellow",
        Grass: "green",
        Poison: "purple",
        Ghost: "dark-purple",
        Normal: "grey",
        Flying: "blue-grey",
        Water: "blue",
    };

    return `type-box type-box-${colors[type]}`;
}
