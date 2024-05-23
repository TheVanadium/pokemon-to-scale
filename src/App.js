import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PokeSpriteList from "./components/PokeSpriteList";
import PokemonSelector from "./components/PokemonSelector";
import axios from "axios";
import { toPokeAPIName } from "./name_conversion/pokename";

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
            if (input.className === "error") input.className = "";
            return;
        }
        input.className = "error";
    }

    return (
        <div className="app">
            <Header />
            <PokemonSelector submitName={submitClicked} />
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
