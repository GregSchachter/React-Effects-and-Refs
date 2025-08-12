import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css"

function Deck() {
const [deckId, setDeckId] = useState(null)
const [drawn, setDrawn] = useState([])
const [cardsRemaining, setCardsRemaining] = useState(null)
const [isShuffling, setIsShuffling] = useState(false)

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
    if(cardsRemaining){
    const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    setCardsRemaining(card.data.remaining)
    setDrawn(d => [...d, {
        code: card.data.cards[0].code,
        img: card.data.cards[0].image
    }])
}

else {
    alert('No Cards left')
}}

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
    else{
      return <button onClick={draw}>Gimme A Card!</button>
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

export default Deck