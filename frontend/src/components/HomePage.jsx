import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer />
      
    </div>
    
  )
}

export default HomePage
