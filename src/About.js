import React from 'react'
import aboutimage from './images/kidsimage.jpg'

const About = () => {
  return (
    <main className='About'>
      <h2>About</h2>
      <p style={{marginTop:"1rem", fontSize:"15px"}} >Hi, I am Mohamed Thouseef
         lets make world happy together... </p><br/><br/>
         <img src={aboutimage} alt="author" style={{ width:"350px" ,height:"350px"}}/>
    </main>
    
  )
}

export default About