import React from "react";
import "./PokeSprite.css";
import { toEnglishName } from "../name_conversion/pokename";

/**
 * The sprite of a pokemon
 * @module PokeSprite
 * @param {Object} pokeData The data of the pokemon
 * @param {function} selfTerminate The deletion function
 *
 * @return {React.Component} The sprite of a pokemon
 */
export default function PokeSprite( { pokeData, selfTerminate } ) {
    PokeSprite.propTypes = {
        pokeData: Object,
        pokeData: {
            name: String,
            height: Number,
            sprites: Object,
            front_default: String,
        },
        selfTerminate: Function,
    };
    const pokeStyle = {
        height: pokeData.height * 10 + "px",
    };

    return (
        <div className="poke-sprite" onClick={selfTerminate}>
            <p className="sprite-info">
                {toEnglishName(pokeData.name)}
                <br />
                {pokeData.height / 10}m
            </p>
            <img
                className="poke-img"
                src={pokeData.sprites.front_default}
                alt={pokeData.name}
                style={pokeStyle}
            />
        </div>
    );
}
