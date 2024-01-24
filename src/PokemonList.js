import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PokeCard from './PokeCard'

export default function PokemonList({pokemon}) {
  

  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {pokemon.map(poke => (
          <>
            <Grid item xs={2} sm={4} md={4}>
              <PokeCard poke={poke}/>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  )
}
