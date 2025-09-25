import React from 'react'
import logo from "../../public/logo.png"

function Logo(width = '22px') {
  return (
    <img src={logo} alt="logo" className='w-14 h-14' />
  )
}

export default Logo