import React from "react";
import { Link } from "react-router-dom";
import AddCards from "./AddCards"

function AddCardsButton({deckId, deckName}) {

    return (
        <Link to={`/decks/${deckId}/cards/new`}>
        <button>Add Cards</button>
        </Link>
    )

}

export default AddCardsButton;