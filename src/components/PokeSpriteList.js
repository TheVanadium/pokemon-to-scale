import React, {useEffect} from "react";
import PokeSprite from "./PokeSprite";
import "./PokeSpriteList.css";
import PropTypes from "prop-types";

/**
 * Stores and displays the list of pokemon sprites, and handles their removal
 * @module PokeSpriteList
 * @param {*} prop
 * @param {Array} prop.pokemons The list of pokemon data
 * @param {Function} prop.setPokemons The function to set the pokemon data
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

    const [reload, setReload] = React.useState(false);

    /**
     * Calculates the total width of the list of pokemon, which is the sum
     * of their heights
     * @return {Number} The total width of the list of pokemon
     */
    function listWidth() {
        const heights = prop.pokemons.map((poke) => poke.height * 10);
        const totalWidth = heights.reduce((acc, curr) => acc + curr, 0);
        return totalWidth;
    }

    const defaultStyle = {
        justifyContent: "center",
        overflow: "hidden",
    };

    const scrollingStyleHorizontal = {
        justifyContent: "start",
        overflow: "scroll",
    };

    let currentStyleHorizontal =
        listWidth() > window.innerWidth ?
            scrollingStyleHorizontal : defaultStyle;

    window.onresize = () => {
        const oldStyle = currentStyleHorizontal;
        currentStyleHorizontal =
            listWidth() > window.innerWidth ?
                scrollingStyleHorizontal : defaultStyle;
        if (oldStyle !== currentStyleHorizontal) setReload(!reload);
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
        <div
            id="conga-wrapper"
            style={currentStyleHorizontal}
        >
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
