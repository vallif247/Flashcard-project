import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import DeleteDeckHandler from "./DeleteDeckHandler";
import { listDecks } from "../utils/api/index";

function DeckList() {
    const history = useHistory()
    const [decks, setDecks] = useState([])

    const handleSetDeck = (newDecks) => {
        setDecks(newDecks)
    }

useEffect(() => {
  setDecks([]);
  const abortController = new AbortController();
  async function loadDecks() {
    listDecks().then(setDecks)
  }
  loadDecks();
  return () => abortController.abort();
}, []);


    return (
        <div>
        {
        decks.map((deck) => (
            
                <div key={deck.id} className="border p-4 h-100 d-flex flex-column">
                    <h2>
                        {deck.name}
                    </h2>
                    <h6>{deck.cards.length} cards</h6>
                    <h4>
                        {deck.description}
                    </h4>
                    <Link to={`/decks/${deck.id}/view`}>
                        View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        Study
                    </Link>
                    <DeleteDeckHandler decks = {decks} handleSetDeck = {handleSetDeck} deckId={deck.id}/>
                </div>
            
       ))} </div>
        

)
}

export default DeckList