import React from 'react'
const today = new Date();

const Footer = () => {
  return (
    <footer className='Footer'>
    <p>Copyright &copy; {today.getFullYear()}</p>
</footer>
  )
}

export default Footer