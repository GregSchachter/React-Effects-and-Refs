import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css"

function Timer() {
const [deckId, setDeckId] = useState(null)
const [drawn, setDrawn] = useState([])
const [cardsRemaining, setCardsRemaining] = useState(null)
const [isShuffling, setIsShuffling] = useState(false)
const [isDrawing, setIsDrawing] = useState(false)
const timerRef = useRef()
let cardsLeft = 52;

    useEffect(() => {
        async function newDeck() {
            const id = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeckId(id.data.deck_id)
            setCardsRemaining(52)
        }
        newDeck()

    },[]
)

async function draw() {
    if(cardsLeft>0){
    const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    cardsLeft = card.data.remaining
    setCardsRemaining(card.data.remaining)
    
    
    setDrawn(d => [...d, {
        code: card.data.cards[0].code,
        img: card.data.cards[0].image
    }])
}

if(cardsLeft === 0) {
    console.log('Here')
    stopTimer()
    alert('No Cards left')
    
}
 
}

function startTimer() {
    setIsDrawing(true)
    timerRef.current = setInterval(draw, 100)
    
}

function stopTimer() {
    clearInterval(timerRef.current)
    setIsDrawing(false)
}



async function shuffle() {
    setIsShuffling(true)
    const newId = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`) 
    setDeckId(newId.data.deck_id)
    setCardsRemaining(52)
    setDrawn([])
    setIsShuffling(false)

}

function drawButton(){
    if(cardsRemaining===0){
        return null;
    }
    else if(!isDrawing) {
      return <button onClick={startTimer}>Start Drawing</button>
    }
    
    else if (isDrawing){
        return <button onClick={stopTimer}>Stop Drawing</button>
    }
}

function shuffleButton(){
    if(cardsRemaining>0){
        return null;
    }

    else if(isShuffling || deckId===null){
        return null
    }
    else{
      return <button onClick={shuffle}>Shuffle</button>
    }
}

    return (
        <>
        {drawButton()}
        {shuffleButton()}

        <div className="cardArea">
        {drawn.map(c => (
            <Card key={c.code} code={c.code} img={c.img} />
        )
        )}
        </div>
       </>
    )
}

export default Timer