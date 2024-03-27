import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import PokeSpriteList from "./components/PokeSpriteList";
import PokemonSelector from "./components/PokemonSelector";
import axios from "axios";

/**
 * The main app component
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
        const processedName = processPokemonName(input.value);
        if (fullPokeList.includes(processedName)) {
            loadPokeData(processedName);
            input.value = "";
            if (input.className === "error") input.className = "";
            return;
        }
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
