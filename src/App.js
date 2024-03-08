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
    let processedName = processPokemonName(input.value)
    if (fullPokeList.includes(processedName)){
      loadPokeData(processedName)
      input.value=''
      if (input.className === "error") input.className = ""
      return
    }
    input.className = "error"
  }
  
  // converts complex names like "Mega Charizard X" to "charizard-mega-x" so the api can handle it
  function processPokemonName(pokemonName) {
    pokemonName = pokemonName.toLowerCase()
    let words = pokemonName.split(' ')    
    // 3 possibilities
    // 1 word, such as "vaporeon"
    // 2 words, such as "gigantamax flapple"
    // 3 words, such as "mega charizard x"
    switch (words[0]) {
      case "gigantamax": words[0] = "gmax"; break
      case "alolan": words[0] = "alola"; break
    }

    switch (words.length) {
      case 1: return words[0]
      case 2: return words[1] + "-" + words[0]
      case 3: return words[1] + "-mega-" + words[2]
      // unprocessable names
      default: return pokemonName
    }
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