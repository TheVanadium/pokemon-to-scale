import React from "react";
import PokeSprite from "./PokeSprite";
import "./PokeSpriteList.css";

/**
 * Stores and displays the list of pokemon sprites
 * @module PokeSpriteList
 * @param {*} prop
 * @return {React.Component}
 */
const PokeSpriteList = (prop) => {
    PokeSpriteList.propTypes = {
        pokemons: Array,
        setPokemons: Function,
    };

    return (
        <div id="conga-wrapper">
            {prop.pokemons.map((pokemon, index) => (
                <PokeSprite
                    key={index}
                    pokeData={pokemon}
                    selfTerminate={() => {
                        prop.setPokemons(
                            prop.pokemons.filter((_, i) => i != index),
                        );
                    }}
                />
            ))}
        </div>
    );
};

export default PokeSpriteList;
