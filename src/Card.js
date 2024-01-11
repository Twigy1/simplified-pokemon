import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({poke}) => {
    let pokePicture = "";

     axios.get(poke.url).then(res => {
         pokePicture = res.data.sprites.other["official-artwork"].front_default
     })

  return (
    <>
        <div key={poke.name}>{poke.name}</div>
        <img src={pokePicture}/>
    </>
  )
}

export default Card