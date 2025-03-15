import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './compo/Navbar'
import Footer from './compo/Footer'
import Feat from './compo/Feat'
import PostList from './cont/PostList'


import GameList from './compo/GameList';
import GameForm from './compo/GameForm';
import GameDetails from './compo/GameDetails';
import Cart from './compo/Cart';


function App() {

  return (
    <>
      <Navbar/>
      <GameList/>
      <Feat/>
      <Footer/>
    </>
  )
}

export default App
