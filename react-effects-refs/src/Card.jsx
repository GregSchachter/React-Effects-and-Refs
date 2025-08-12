import { useState } from "react"
import "./Card.css"

function Card({code, img}){
    const [{angle, randomX, randomY}] = useState({
     angle: Math.random() * 60 - 30,
     randomX: Math.random() * 40 - 20,
     randomY: Math.random() * 40 - 20})

    let transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`


return (
    <>
        <img className='card' src={img} alt={code} style={{transform}}></img>
    </>
)
}
export default Card