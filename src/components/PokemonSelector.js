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

    /**
     * Display suggestions.
     * @return {React.Component}
     */
    function suggestions() {
        if (!prop.showSuggestions) {
            return <div></div>;
        }
        if (prop.suggestions.length <= 0) {
            return (
                <div id="suggestions">
                    No suggestions found.
                </div>
            );
        }

        return (
            <div id="suggestions">
                Did you mean:&nbsp;
                {prop.suggestions.map((pokemon, index) => {
                    return (
                        <div
                            key={index}
                            className="suggestion"
                            onClick={() => {
                                document.getElementById("selector").value =
                                    pokemon;
                                document.getElementById("pokemon-btn").click();
                                prop.clearSuggestions();
                            }}
                        >
                            <span className="suggestion-name">{pokemon}</span>
                            <span className="comma">
                                {index < prop.suggestions.length - 1 ?
                                    ",\u00A0" :
                                    ""}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div id="pokemon-selector">
            <div id="search">
                <input
                    type="text"
                    id="selector"
                    onKeyDown={handleKeyPress}
                ></input>
                <button onClick={prop.submitName} id="pokemon-btn">
                    Add Pokémon
                </button>
            </div>
            {suggestions()}
        </div>
    );
};

export default PokemonSelector;
