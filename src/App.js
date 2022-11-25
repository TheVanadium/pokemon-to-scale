import React, { useState, useEffect }from 'react';
import Header from './components/Header';
import PokeSprite from './components/PokeSprite'
import PokemonSelector from './components/PokemonSelector'
import axios from 'axios'


function App() {

  const [pokemonData, setPokemonData] = useState()
  const [pokemons, setPokemons] = useState([])
  const [fullPokeList, setFullPokeList] = useState([]);
  var firstLoaded = false;

  useEffect(()=>{
    if (firstLoaded) return;
    firstLoaded = true;
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=2000").then(res => 
      res.data.results.map(pokemon => {
        setFullPokeList(oldPokeList => [...oldPokeList, pokemon.name]); 
      }))
    loadPokeData("vaporeon")
  }, [])

  useEffect(()=>{
    if (pokemonData) setPokemons(oldPokeList => [...oldPokeList, pokemonData])
  }, [pokemonData])

  function loadPokeData(pokeName) {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokeName).then(res => setPokemonData(prevPokeData => res.data))
  }

  function submitClicked() {
    let input = document.getElementById('selector')
    if (fullPokeList.includes(input.value)){
      loadPokeData(input.value)
    }
    input.value=''
  }
  
  // array splicing not causing a rerender so we need to figure out a different way to delete pokemon onclick
  function selfTerminate(index){
    setPokemons(oldMons=>{
      let left = oldMons.slice(0, index)
      let right = oldMons.slice(index+1)
      return [...left, ...right]
    })
  }

  return (
    <div className="App">
      <Header />
      <PokemonSelector submitName={submitClicked}/>
      <div id="conga-wrapper">
        {
          pokemons.map((pokemon, index) => <PokeSprite pokeData={pokemon} selfTerminate={() => {selfTerminate(index)}}/>)
        }
      </div>
    </div>
  );
}

export default App;