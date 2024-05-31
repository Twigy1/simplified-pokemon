import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Box from '@mui/material/Box';

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

const removeHyphen = (str) => {
  return str.replace(/-/g, " ")
}

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
      case "bug":
        return setTextColor('#90C12C');
      case "dark":
        return setTextColor('#5A5366');
      case "dragon":
        return setTextColor('#0A6DC4');;
      case "electric":
        return setTextColor('#F3D23B');;
      case "fairy":
        return setTextColor('#EC8FE6');;
      case "fighting":
        return setTextColor('#CE4069');;
      case "fire":
        return setTextColor('#FF9C54');;
      case "flying":
        return setTextColor('#8FA8DD');;
      case "ghost":
        return setTextColor('#5269AC');;
      case "grass":
        return setTextColor('#63BB5B');;
      case "ground":
        return setTextColor('#D97746');;
      case "ice":
        return setTextColor('#74CEC0');;
      case "normal":
        return setTextColor('#9099A1');;
      case "poison":
        return setTextColor('#AB6AC8');;
      case "psychic":
        return setTextColor('#F97176');;
      case "rock":
        return setTextColor('#C7B78B');;
      case "steel":
        return setTextColor('#5A8EA1');;
      case "water":
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
      wordColor(res.data.types[0].type.name)
    })



    return () => cancel()
  },[poke.url])

  const basePath = "./icons/"

  

  return (
    <>
      <Card sx={{ maxWidth: 345, minHeight: 850, color: textColor }}>
        <Typography gutterBottom variant="h5" component="div">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</Typography>
          <CardMedia
          sx={{ height: 320 }}
          image= {pokePic}
          title="pokemon"
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table  sx = {{color: textColor}} size='small'>
            <TableRow>
              <TableCell sx = {{width: 70}}>HP : {pokeHP} </TableCell>
              <TableCell>
                <Box sx={{
                  width: 150 * (pokeHP/255),
                  height: 20,
                  borderRadius: 1,
                  bgcolor: '#69DC12'}}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx = {{width: 70}}>ATK : {pokeATK} </TableCell>
              <TableCell>
                <Box sx={{
                  width: 150 * (pokeATK/255),
                  height: 20,
                  borderRadius: 1,
                  bgcolor: '#FF9C54'}}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx = {{width: 70}}>DEF : {pokeDEF} </TableCell>
              <TableCell>
                <Box sx={{
                  width: 150 * (pokeDEF/255),
                  height: 20,
                  borderRadius: 1,
                  bgcolor: '#F3D23B'}}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx = {{width: 70}}>SPA : {pokeSPA} </TableCell>
              <TableCell>
                <Box sx={{
                  width: 150 * (pokeSPA/255),
                  height: 20,
                  borderRadius: 1,
                  bgcolor: '#4D90D5'}}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx = {{width: 70}}>SPD : {pokeSPD} </TableCell>
              <TableCell>
                <Box sx={{
                  width: 150 * (pokeSPD/255),
                  height: 20,
                  borderRadius: 1,
                  bgcolor: '#AB6AC8'}}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx = {{width: 70}}>SPE : {pokeSPE} </TableCell>
              <TableCell>
                <Box sx={{
                  width: 150 * (pokeSPE/255),
                  height: 20,
                  borderRadius: 1,
                  bgcolor: '#5A8EA1'}}
                />
              </TableCell>
            </TableRow>
            </Table>
          </TableContainer>
          <Typography margin={'0px'} gap={'5px'} variant="body2" color={textColor} align='left'>
            <p style={{marginRight: '0px'}}>Abilities:</p>
            {pokeAbility.map((ability, index) => (
              <p key={index} style={{marginRight: '0px'}}>
                {capitalizeWords(removeHyphen(ability.ability.name))}
              </p>))}
          </Typography>
          <Typography variant="body2" color={textColor} display = 'flex'>
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