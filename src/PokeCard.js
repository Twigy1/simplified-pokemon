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
  const [textColor, setTextColor] = useState('black')
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

  
  const wordColor = (str) => {
    switch (str) {
      case "Bug":
        return setTextColor('#90C12C');
      case "Dark":
        return setTextColor('#5A5366');
      case "Dragon":
        return setTextColor('#0A6DC4');;
      case "Electric":
        return setTextColor('#F3D23B');;
      case "Fairy":
        return setTextColor('#EC8FE6');;
      case "Fighting":
        return setTextColor('#CE4069');;
      case "Fire":
        return setTextColor('#FF9C54');;
      case "Flying":
        return setTextColor('#8FA8DD');;
      case "Ghost":
        return setTextColor('#5269AC');;
      case "Grass":
        return setTextColor('#63BB5B');;
      case "Ground":
        return setTextColor('#D97746');;
      case "Ice":
        return setTextColor('#74CEC0');;
      case "Normal":
        return setTextColor('#9099A1');;
      case "Poison":
        return setTextColor('#AB6AC8');;
      case "Psychic":
        return setTextColor('#F97176');;
      case "Rock":
        return setTextColor('#C7B78B');;
      case "Steel":
        return setTextColor('#5A8EA1');;
      case "Water":
        return setTextColor('#4D90D5');;
      default:
        return setTextColor('black');;
    }
  }

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
  },[poke.url])

  const basePath = "./icons/"

  

  return (
    <>
      <Card sx={{ maxWidth: 345, color: textColor }}>
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
            <div>
              <p key={index} style={{marginRight: '10px'}}>
                {capitalizeWords(type.type.name)}
              </p>
              <img src = {require(basePath + type.type.name + ".png")} key={index} height={50} width={50}/>
            </div>
          ))}
        </Typography>
        </CardContent>
      </Card>  
    </>
  )
}

export default PokemonCard