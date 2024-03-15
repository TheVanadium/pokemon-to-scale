import React from "react";
import "./PokeSprite.css";

/**
 * The sprite of a pokemon
 * @module PokeSprite
 * @param {Object} pokeData The data of the pokemon
 * @param {function} selfTerminate The deletion function
 *
 * @return {React.Component} The sprite of a pokemon
 */
export default function PokeSprite( {pokeData, selfTerminate} ) {
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
        height: pokeData.height*10 + "px",
    };

    /**
     * Reformats pokemon name from API to be more readable
     * @param {string} name
     * @return {string} The reformatted name
     */
    const pokeName = (name) => {
        if (name.endsWith("-mega")) {
            return "Mega " + name.charAt(0).toUpperCase() + name.slice(1, -5);
        } else if (name.endsWith("-alola")) {
            return "Alolan " + name.charAt(0).toUpperCase() + name.slice(1, -6);
        } else if (name.endsWith("-galar")) {
            return (
                "Galarian " + name.charAt(0).toUpperCase() + name.slice(1, -6)
            );
        } else if (name.endsWith("-gmax")) {
            return (
                "Gigantamax " + name.charAt(0).toUpperCase() + name.slice(1, -5)
            );
        } else if (name.endsWith("-mega-x")) {
            return (
                "Mega " +
                name.charAt(0).toUpperCase() +
                name.slice(1, -7) +
                " X"
            );
        } else if (name.endsWith("-mega-y")) {
            return (
                "Mega " +
                name.charAt(0).toUpperCase() +
                name.slice(1, -7) +
                " Y"
            );
        } else {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    };

    return (
        <div className="poke-sprite" onClick={selfTerminate}>
            <p className="sprite-info">
                {pokeName(pokeData.name)}
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
