import React from 'react'
import Card from './Card'

export default function PokemonList({pokemon}) {
  

  return (
    <div>
      {pokemon.map(poke => (
        <>
          <Card poke={poke}/>
        </>
      ))}
    </div>
  )
}
