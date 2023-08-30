import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, useHistory } from "react-router-dom";
import ErrorScreen from "./ErrorScreen";

function StudyCards({HomeNavBar}) {
    const { deckId } = useParams()
    const [cards, setCards] = useState([])
    const [deck, setDeck] = useState({})
    const [currentCard, setCurrentCard] = useState({})
    const [currentSide, setCurrentSide] = useState("")
    const [cardCounter, setCardCounter] = useState(0) 
    const [pointer, setPointer] = useState(0)
    const history = useHistory()

    
    useEffect(() => {
        const abortController = new AbortController();
        
        async function loadCards() {
            const response = readDeck(deckId)
            const deckFromAPI = await response
            setDeck(deckFromAPI)
            setCards(deckFromAPI.cards)
          if (deckFromAPI.cards[0]) {
            setCurrentCard(deckFromAPI.cards[0])
            setCurrentSide(deckFromAPI.cards[0].front)
            setCardCounter(1)
          }
        }
        loadCards();
        return () => abortController.abort();
      }, [deckId]);
      

      const nextHandler = () => {
            
        if (cardCounter <= cards.length) {
            setPointer(pointer+1)
            setCurrentCard(cards[pointer+1])  
            setCardCounter(cardCounter+1)
            setCurrentSide(cards[pointer].front)
        }
      

        if ((currentCard === cards[cards.length-1]) && (currentSide === currentCard.back)) {{
            if (window.confirm("Restart cards? Click 'cancel' to return to home page.")) {
                setPointer(0)
                setCardCounter(1)
                setCurrentCard(cards[0])
                setCurrentSide(cards[0].front)
            } else {
                history.push("/")
            }
        }
        }
        
        }

    
const flipHandler = () => {
    if (currentSide === currentCard.front) {
        setCurrentSide(`${currentCard.back}`)
    } else {
        setCurrentSide(`${currentCard.front}`)
    }
    }

    return(
    <div>
        <p><HomeNavBar /> {deck.name} / Study</p>
        <h1><span>{deck.name}</span><span>: Study</span></h1>
        <div>
            { cards.length<3 
               ? <ErrorScreen deck={deck} cards={cards}/> :
               currentSide === currentCard.back ?
                <div key={pointer} className="border p-4 h-100 d-flex flex-column">
                    <h3>Card {cardCounter} of {cards.length}</h3>
                    <h2>{currentCard.name}</h2>
                
                    <h4>{currentSide}</h4>

                    <button onClick={() => flipHandler()}>Flip</button>
                
                    <button onClick={() => nextHandler()}>Next</button>
                
                
                </div> :
                <div>
                
                <div key={pointer} className="border p-4 h-100 d-flex flex-column">
                    <h3>Card {cardCounter} of {cards.length}</h3>
                    <h2>{currentCard.name}</h2>
                    
                    <h4>{currentSide}</h4>
    
                    <button onClick={() => flipHandler()}>Flip</button>
                </div>
                </div>

            }
        </div>
    </div>
)

}

export default StudyCards