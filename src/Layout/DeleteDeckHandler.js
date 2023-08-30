import React from "react";
import { deleteDeck } from "../utils/api/index";
import { useHistory } from "react-router-dom";


function DeleteDeckHandler({deckId, decks, handleSetDeck}) {
    const history = useHistory()
    const clickHandler = () => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(deckId)
            if (decks) {
                handleSetDeck(decks.filter((deck) => deckId !== deck.id))
            } else {
                history.push("/")
            }
        } 
        }
        return (
            <button type="button" onClick={clickHandler}>Delete</button>
            
        )
}


export default DeleteDeckHandler