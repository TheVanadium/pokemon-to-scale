import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PokeSpriteList from "./components/PokeSpriteList";
import PokemonSelector from "./components/PokemonSelector";
import axios from "axios";
import levenshtein from "js-levenshtein";
import { toPokeAPIName, toEnglishName } from "./name_conversion/pokename";

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
                    toEnglishName(pokemon.name),
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
        const processedName = toPokeAPIName(input.value);
        if (fullPokeList.includes(processedName)) {
            loadPokeData(processedName);
            input.value = "";
            if (input.className === "error") {
                input.className = "";
                clearSuggestions();
            }
            return;
        }
        generateSuggestions(input.value);
        input.className = "error";
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
