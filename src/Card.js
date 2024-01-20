import React, { useState, useEffect } from 'react';
import axios from 'axios';

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

const Card = ({poke}) => {
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


  return (
    <>
        <div key={poke.name}>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</div>
        <img src={pokePic} alt="image not available"/>
        <p>HP: {pokeHP}</p>
        <p>ATK: {pokeATK}</p>
        <p>DEF: {pokeDEF}</p>
        <p>SPA: {pokeSPA}</p>
        <p>SPD: {pokeSPD}</p>
        <p>SPE: {pokeSPE}</p>
        <ul>Abilities: {pokeAbility.map((ability, index) => (
          <li key={index}>
            {capitalizeWords(ability.ability.name)}
          </li>))}
        </ul>
        <ul>Typing: {pokeTypes.map((type, index) => (
          <li key={index}>
            {capitalizeWords(type.type.name)}
          </li>))}
        </ul>
    </>
  )
}

export default Card