import React, {useEffect} from "react";
import PokeSprite from "./PokeSprite";
import "./PokeSpriteList.css";
import PropTypes from "prop-types";

/**
 * Stores and displays the list of pokemon sprites
 * @module PokeSpriteList
 * @param {*} prop
 * @return {React.Component}
 */
const PokeSpriteList = (prop) => {
    PokeSpriteList.propTypes = {
        pokemons: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.oneOf([null]),
        ]),
        setPokemons: PropTypes.func,
        pokemonData: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.oneOf([null]),
        ]),
        setPokemonData: PropTypes.func,
    };

    useEffect(() => {
        if (prop.pokemonData) {
            prop.setPokemons((oldPokeList) => [
                ...oldPokeList,
                prop.pokemonData,
            ]);
        }
    }, [prop.pokemonData]);

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
