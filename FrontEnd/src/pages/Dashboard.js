import React from 'react'
import '../assets/css/style.bundle.css'
import Logo from '../assets/images/logo/logo-fav.png'

function Dashbarod(props) {

  return (
    <div className='Dashborad'>
      <h1>Hello, {props.mydata.Fullname}</h1>
    </div>

  )
}

export default Dashbarod