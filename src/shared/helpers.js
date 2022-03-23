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
    return `type-box type-box-${type}`;
}

export function formatId(id) {
    return id.toString().padStart(3, "0");
}
