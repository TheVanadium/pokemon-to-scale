import React from "react";
import "./PokemonSelector.css";

/**
 * The search bar for adding pokemon.
 * @module PokemonSelector
 * @param {*} prop
 * @return {React.Component}
 */
const PokemonSelector = (prop) => {
    // trigger button click event on enter key press
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            document.getElementById("pokemon-btn").click();
        }
    };

    return (
        <div id="pokemon-selector">
            <input
                type="text"
                id="selector"
                onKeyDown={handleKeyPress}
            ></input>
            <button onClick={prop.submitName} id="pokemon-btn">
                Add Pokémon
            </button>
        </div>
    );
};

export default PokemonSelector;
