import React from 'react'
import './PokeSprite.css'

export default function PokeSprite( {pokeData, selfTerminate} ) {
    const pokeStyle = {
        height: pokeData.height*10 + "px",
    }

    return (
        <div className="poke-sprite" onClick={selfTerminate}>
            <p className="sprite-info">{pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}
            <br />{pokeData.height/10}m</p>
            <img className="poke-img" src={pokeData.sprites.front_default} alt={pokeData.name} style={pokeStyle}/>
        </div>
    )
}