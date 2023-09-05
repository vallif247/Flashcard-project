import React from "react";
import { deleteCard } from "../utils/api/index";
import { useHistory } from "react-router-dom";

function DeleteCardHandler({cardId, cards, setCards}) {
    const deleteCards = cards
    const history = useHistory()
        const clickHandler = () => {
            if (window.confirm("Delete this card? You will not be able to recover it.")) {
            deleteCard(cardId)
            
        } if (deleteCards) {
            setCards(deleteCards.filter((card) => cardId !== card.id))
        } else {
            history.push("/")
        }}

        return (
            <button type="button" onClick={clickHandler}>Delete</button>
            
        )
}

export default DeleteCardHandler
