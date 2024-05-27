/**
 * Converts an english pokemon name to a pokeapi name
 * @param {string} englishName The english name of the pokemon
 * @return {string} The pokeapi name of the pokemon
 */
function toPokeAPIName(englishName) {
    if (englishName.toLowerCase() === "flabébé") return "flabebe";
    if (englishName.toLowerCase() === "nidoran♀") return "nidoran-f";
    if (englishName.toLowerCase() === "nidoran♂") return "nidoran-m";
    const words = englishName.split(" ");
    if (words.length === 1) return words[0].replace("'", "").toLowerCase();
    if (englishName.toLowerCase() === "type: null") return "type-null";
    switch (words[0].toLowerCase()) {
        // species-specific cases
        case "mr.":
            if (words[1].toLowerCase() === "mime") return "mr-mime";
            return "mr-rime";
        case "mime":
            return "mime-jr";
        case "tapu":
            return "tapu-" + words[1].toLowerCase();
        case "nidoran":
            if (words[1] === "♀") return "nidoran-f";
            return "nidoran-m";

        // form-specific cases
        case "mega":
            if (words[2] === "X" || words[2] === "Y") {
                return (
                    words[1].toLowerCase() + "-mega-" + words[2].toLowerCase()
                );
            }
            return words[1].toLowerCase() + "-mega";
        case "gigantamax":
            return words[1].toLowerCase() + "-gmax";
        case "alolan":
            return words[1].toLowerCase() + "-alola";
        case "hisuian":
            return words[1].toLowerCase() + "-hisui";
        case "galarian":
            return words[1].toLowerCase() + "-galar";
        default:
            return words.join("-").toLowerCase();
    }
}

/**
 * Converts a pokeapi name to an english name
 * @param {string} pokeAPIName The pokeapi name of the pokemon
 * @return {string} The english name of the pokemon
 */
function toEnglishName(pokeAPIName) {
    if (pokeAPIName.toLowerCase() === "flabebe") return "Flabébé";
    const words = pokeAPIName.split("-");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    switch (words[0]) {
        case "Farfetchd":
            return "Farfetch'd";
        case "Sirfetchd":
            return "Sirfetch'd";
        case "Flabebe":
            return "Flabébé";
    }
    if (words.length === 1) return words[0];
    switch (words[1]) {
        // pokemon-specific cases
        case "Mime":
        case "Rime":
            return "Mr. " + words[1];
        case "Jr":
            return "Mime Jr.";
        case "Null":
            return "Type: Null";
        case "M":
            return "Nidoran♂";
        case "F":
            return "Nidoran♀";
        case "O":
            return words[0] + "-o";
        case "Oh":
            return "Ho-Oh";
        case "Z":
            return "Porygon-Z";

        case "Mega":
            if (words[2] === "X" || words[2] === "Y") {
                return "Mega " + words[0] + " " + words[2];
            }
            return "Mega " + words[0];
        case "Gmax":
            return "Gigantamax " + words[0];
        case "Alola":
            return "Alolan " + words[0];
        case "Hisui":
            return "Hisuian " + words[0];
        case "Galar":
            return "Galarian " + words[0];
        default:
            return words.join(" ");
    }
}

export { toPokeAPIName, toEnglishName };
