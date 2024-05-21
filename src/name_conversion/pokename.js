/**
 * Converts an english pokemon name to a pokeapi name
 * @param {string} englishName The english name of the pokemon
 * @return {string} The pokeapi name of the pokemon
 */
function toPokeAPIName(englishName) {
    const words = englishName.split(" ");
    switch (words[0].toLowerCase()) {
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
            return words[0].toLowerCase();
    }
}

/**
 * Converts a pokeapi name to an english name
 * @param {string} pokeAPIName The pokeapi name of the pokemon
 * @return {string} The english name of the pokemon
 */
function toEnglishName(pokeAPIName) {
    const words = pokeAPIName.split("-");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    switch (words[1]) {
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
            return words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
}

export { toPokeAPIName, toEnglishName };
