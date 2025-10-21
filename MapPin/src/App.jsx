import React, { useState } from 'react'
import Map from './Map'
import Home from './Home'

const App = () => {

const [start,setStart]=useState(false)

  return (
    <>
    {
     !start ? <Home setStart={setStart}/>:
    <Map /> }
    </>
  )
}

export default App