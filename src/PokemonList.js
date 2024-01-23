import React from 'react'
import PokeCard from './PokeCard'

export default function PokemonList({pokemon}) {
  

  return (
    <div>
      {pokemon.map(poke => (
        <>
          <center>
            <PokeCard poke={poke}/>
          </center>
        </>
      ))}
    </div>
  )
}
