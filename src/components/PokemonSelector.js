import React from 'react';
import './PokemonSelector.css'

const PokemonSelector = (prop) => {

    return (
        <div id="pokemonSelector">
            <input type="text" id="selector"></input>
            <button onClick={prop.submitName}>Add Pokemon</button>
        </div>
    )
}

export default PokemonSelector;