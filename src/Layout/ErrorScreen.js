import React from "react";
import AddCardsButton from "./AddCardsButton";

function ErrorScreen({deck, cards}) {

    if (cards.length === 2) {
        
        return (
            <div>
                <h1>{deck.name}: Study</h1>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are 2 cards in this deck.</p>
                <AddCardsButton deckName = {deck.name} deckId = {deck.id} />            
            </div>
        )
    } else if (cards.length === 1) {
        return (
            <div>
                <h1>{deck.name}: Study</h1>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There is 1 card in this deck.</p>
                <AddCardsButton deckName = {deck.name} deckId = {deck.id} />
            </div>
        )
    } else {
        return (
            <div>
            <h1>{deck.name}: Study</h1>
            <h3>Not enough cards.</h3>
            <p>You need at least 3 cards to study. There are no cards in this deck.</p>
            <AddCardsButton deckName = {deck.name} deckId = {deck.id} />
        </div>
        )
    }


}

export default ErrorScreen;