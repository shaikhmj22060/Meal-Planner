import React from 'react'
import Nav from '../Components/Nav'

const Home = () => {
  return (
    <div className='h-full w-full'>
    <div className='h-screen w-full bg-neutral-300/35 '>
        <Nav />
    </div>
    <div className='h-screen bg-fuchsia-300'></div>
    </div>
  )
}

export default Home