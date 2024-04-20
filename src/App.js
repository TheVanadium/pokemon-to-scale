import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import PokeSpriteList from "./components/PokeSpriteList";
import PokemonSelector from "./components/PokemonSelector";
import axios from "axios";
import levenshtein from "js-levenshtein";

/**
 * The main app component
 * Loads the data from the API and handles the input, passing it to the
 * PokeSpriteList component. Pass triggers when the submit button (from
 * PokemonSelector component) is clicked.
 * @module App
 * @return {React.Component} The main app component
 */
function App() {
    const [pokemonData, setPokemonData] = useState();
    const [pokemons, setPokemons] = useState([]);
    const [fullPokeList, setFullPokeList] = useState([]);
    const [commonPokeList, setCommonPokeList] = useState([]);

    /**
     * Pokemon name suggestions that are similar to the input, should the input
     * not be a valid pokemon name
     * @type {string[]}
     */
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    let firstLoaded = false;

    useEffect(() => {
        if (firstLoaded) return;
        firstLoaded = true;
        axios.get("https://pokeapi.co/api/v2/pokemon/?limit=2000").then((res) =>
            res.data.results.map((pokemon) => {
                setFullPokeList((oldPokeList) => [
                    ...oldPokeList,
                    pokemon.name,
                ]);
                setCommonPokeList((oldPokeList) => [
                    ...oldPokeList,
                    unprocessPokemonName(pokemon.name),
                ]);
            }),
        );
        loadPokeData("vaporeon");
    }, []);

    /**
     * Loads the data for a pokemon into the pokemonData state
     * @param {string} pokeName The name of the pokemon to load
     * @return {void}
     */
    function loadPokeData(pokeName) {
        axios
            .get("https://pokeapi.co/api/v2/pokemon/" + pokeName)
            .then((res) => setPokemonData((prevPokeData) => res.data));
    }

    /**
     * Handles the submit button being clicked
     * Processes the input and loads the pokemon data
     * @return {void}
     */
    function submitClicked() {
        const input = document.getElementById("selector");
        const processedName = processPokemonName(input.value);
        if (fullPokeList.includes(processedName)) {
            loadPokeData(processedName);
            input.value = "";
            if (input.className === "error") input.className = "";
            return;
        }
        generateSuggestions(input.value);
        input.className = "error";
    }

    /**
     * Processes a pokemon name to be used in the API
     * @param {string} pokemonName The name of the pokemon to process
     * @return {string} The processed name
     *
     * @example
     * processPokemonName("Mega Charizard X") // returns "charizard-mega-x"
     * processPokemonName("Gigantamax Flapple") // returns "flapple-gmax"
     * processPokemonName("Alolan Raichu") // returns "raichu-alola"
     */
    function processPokemonName(pokemonName) {
        pokemonName = pokemonName.toLowerCase();
        const words = pokemonName.split(" ");
        switch (words[0]) {
        case "gigantamax":
            words[0] = "gmax";
            break;
        case "alolan":
            words[0] = "alola";
            break;
        }

        switch (words.length) {
        case 1:
            return words[0];
        case 2:
            return words[1] + "-" + words[0];
        case 3:
            return words[1] + "-mega-" + words[2];
            // unprocessable names
        default:
            return pokemonName;
        }
    }

    /**
     * Un-processes pokemon names, aka converting names to common names
     * @param {string} pokemonName The name of the pokemon to unprocess
     * @return {string} The unprocessed name
     *
     * @example
     * unprocessPokemonName("charizard-mega-x") // returns "Mega Charizard X"
     * unprocessPokemonName("flapple-gmax") // returns "Gigantamax Flapple"
     * unprocessPokemonName("raichu-alola") // returns "Alolan Raichu"
     */
    function unprocessPokemonName(pokemonName) {
        const words = pokemonName.split("-");
        switch (words[0]) {
        case "gmax":
            words[0] = "Gigantamax";
            break;
        case "alola":
            words[0] = "Alolan";
            break;
        }

        for (let i = 1; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }

        switch (words.length) {
        case 1:
            return words[0];
        case 2:
            return words[1] + " " + words[0];
        case 3:
            return words[1] + " " + words[2];
        default:
            return pokemonName;
        }
    }

    /**
     * Generates a list of suggestions based on the input to find the closest
     * matching pokemon name
     * Updates the suggestions state
     * Uses the levenshtein distance algorithm to find pokemon with edit
     * distance less than or equal to 2 or half the length of the input,
     * whichever is smaller (I don't like how it recommends "mew" for "saw",
     * so I added this half length thing to prevent that)
     *
     * @param {string} inputName The input to generate suggestions for
     * @return {void}
     */
    function generateSuggestions(inputName) {
        const lowerName = inputName.toLowerCase();
        const newSuggestions = [];
        const MAX_DISTANCE = Math.min(
            Math.floor(lowerName.length / 2),
            2,
        );
        for (let i = 0; i < commonPokeList.length; i++) {
            if (levenshtein(lowerName, commonPokeList[i]) <= MAX_DISTANCE) {
                newSuggestions.push(fullPokeList[i]);
            }
        }

        setSuggestions(newSuggestions);
        setShowSuggestions(true);
    }

    /**
     * Clears suggestions
     * Called from the PokemonSelector component when a suggestion is clicked
     * @return {void}
     * @see PokemonSelector
     */
    function clearSuggestions() {
        setSuggestions([]);
        setShowSuggestions(false);
    }

    return (
        <div className="app">
            <Header />
            <PokemonSelector
                submitName={submitClicked}
                suggestions={suggestions}
                clearSuggestions={clearSuggestions}
                showSuggestions={showSuggestions}
            />
            <PokeSpriteList
                pokemons={pokemons}
                setPokemons={setPokemons}
                pokemonData={pokemonData}
                setPokemonData={setPokemonData}
            ></PokeSpriteList>
        </div>
    );
}

export default App;
