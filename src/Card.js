import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({poke}) => {
  const [loading,setLoading] = useState(true)
  const [pokePic, setPokePic] = useState("")
  
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(poke.url, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPokePic(res.data.sprites.other["official-artwork"].front_default)
      

    })

    return () => cancel()
  },[])


  return (
    <>
        <div key={poke.name}>{poke.name}</div>
        <img src={pokePic} alt="image not available"/>
    </>
  )
}

export default Card