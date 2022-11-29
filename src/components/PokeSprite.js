import React from 'react'

export default function PokeSprite( {pokeData, selfTerminate} ) {
    const pokeStyle = {
        height: pokeData.height*10 + "px",
    }

    return (
        <div className="poke-sprite" onClick={selfTerminate}>
            <img className="poke-img" src={pokeData.sprites.front_default} alt={pokeData.name} style={pokeStyle}/>
        </div>
    )
}