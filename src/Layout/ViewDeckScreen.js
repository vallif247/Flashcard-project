import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { Link, useParams } from "react-router-dom";
import DeleteDeckHandler from "./DeleteDeckHandler";
import DeleteCardHandler from "./DeleteCardHandler";
import AddCardsButton from "./AddCardsButton";

function DeckScreen({HomeNavBar}) {
    const [cards, setCards] = useState([])
    const [ deck, setDeck] = useState({})
    const [currentDeck, setCurrentDeck] = useState([])
    const { deckId } = useParams()

    useEffect(() => {
        const abortController = new AbortController();
        
        async function loadCards() {
            const response = readDeck(deckId)
            const deckFromAPI = await response
            setDeck(deckFromAPI)
            setCards(deckFromAPI.cards)
        }
        loadCards();
        return () => abortController.abort();
      }, [deckId]);

useEffect(() => {
 
    setCurrentDeck([]);
    const abortController = new AbortController();
    async function loadCurrentDeck() {
      readDeck(deckId).then(setCurrentDeck)
    }
    loadCurrentDeck();
    return () => abortController.abort();
  }, [deckId]);

  
    return (
        <div>
            <p><HomeNavBar /> {currentDeck.name} / View</p>
            <div className="border p-4 h-100 d-flex flex-column">
                <h2>
                    {currentDeck.name}
                </h2>
                <h4>
                    {currentDeck.description}
                </h4>
                <Link to={`/decks/${currentDeck.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/decks/${currentDeck.id}/study`}>
                    <button>Study</button>
                </Link>
                <AddCardsButton deckName = {currentDeck.name} deckId = {currentDeck.id} />
                <DeleteDeckHandler deckId = {currentDeck.id}/>
            </div>
            <br />
            <div>
                <h1>Cards</h1>
            {
        cards.map((card, index) => (
            <div key={index} className="border p-4 h-100 d-flex flex-column">
                <h3>Card {index+1} of {cards.length}</h3>
                <div className="row">
                    <h2>{card.name}</h2>
                    <div className="col">
                        <h4>{card.front}</h4>
                    </div>
                    <div className="col">
                        <h4>{card.back}</h4>
                    </div>
                    <button>
                    <Link to={`/decks/${currentDeck.id}/cards/${card.id}/edit`}>
                        Edit
                    </Link>
                    </button>
                    <DeleteCardHandler cardId={card.id} cards={cards} setCards={setCards} />
                </div>
            </div>
        ))}
            </div>
        </div>
    )

}

export default DeckScreen