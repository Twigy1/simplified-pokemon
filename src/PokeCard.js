import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { TableBody, TableRow } from '@mui/material';

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

const PokemonCard = ({poke}) => {
  const [fileName, setFileName] = useState('')
  const [loading,setLoading] = useState(true)
  const [pokePic, setPokePic] = useState("")
  const [pokeHP, setPokeHP] = useState()
  const [pokeATK, setPokeATK] = useState()
  const [pokeDEF, setPokeDEF] = useState()
  const [pokeSPA, setPokeSPA] = useState()
  const [pokeSPD, setPokeSPD] = useState()
  const [pokeSPE, setPokeSPE] = useState()
  const [pokeAbility, setPokeAbility] = useState([])
  const [pokeTypes, setPokeTypes] = useState([])
  
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(poke.url, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPokePic(res.data.sprites.other["official-artwork"].front_default)
      setPokeHP(res.data.stats[0].base_stat)
      setPokeATK(res.data.stats[1].base_stat)
      setPokeDEF(res.data.stats[2].base_stat)
      setPokeSPA(res.data.stats[3].base_stat)
      setPokeSPD(res.data.stats[4].base_stat)
      setPokeSPE(res.data.stats[5].base_stat)
      setPokeAbility(res.data.abilities)
      setPokeTypes(res.data.types)

    })

    return () => cancel()
  },[])

  

  const basePath = './icons/'

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
      <Typography gutterBottom variant="h5" component="div">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</Typography>
        <CardMedia
        sx={{ height: 320 }}
        image= {pokePic}
        title="pokemon"
      />
        <CardContent>
        <Typography variant="body2" color="text.secondary">HP: {pokeHP}</Typography>
        <Typography variant="body2" color="text.secondary">ATK: {pokeATK}</Typography>
        <Typography variant="body2" color="text.secondary">DEF: {pokeDEF}</Typography>
        <Typography variant="body2" color="text.secondary">SPA: {pokeSPA}</Typography>
        <Typography variant="body2" color="text.secondary">SPD: {pokeSPD}</Typography>
        <Typography variant="body2" color="text.secondary">SPE: {pokeSPE}</Typography>
        <Typography variant="body2" color="text.secondary" display = 'flex' align='right'>
          <p style={{marginRight: '10px'}}>Abilities:</p>
          {pokeAbility.map((ability, index) => (
            <p key={index} style={{marginRight: '10px'}}>
              {capitalizeWords(ability.ability.name)}
            </p>))}
        </Typography>
        <Typography variant="body2" color="text.secondary" display = 'flex'>
          <p style={{marginRight: '10px'}}>Typing:</p> 
          {pokeTypes.map((type, index) => (
            <p key={index} style={{marginRight: '10px'}}>
              {capitalizeWords(type.type.name)}
              <img src = {basePath + type.type.name + ".png"}/>
            </p>
          ))}
        </Typography>
        </CardContent>
      </Card>  
    </>
  )
}

export default PokemonCard