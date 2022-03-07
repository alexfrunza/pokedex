export function toTitleCase(string) {
    return string
        .split(" ")
        .map((word) => {
            if (word === "") return "";
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
}

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
