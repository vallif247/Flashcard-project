import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createCard, readDeck } from "../utils/api"
import "./style.css"

function AddCards({HomeNavBar}) {
    const [cardFront, setCardFront] = useState("")
    const [cardBack, setCardBack] = useState("")
    const [deckName, setDeckName] = useState("")
    const history = useHistory()
    const {deckId} = useParams()


    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
          const response = readDeck(deckId)
          const deckFromAPI = await response
          setDeckName(deckFromAPI.name)
        
        }
        loadDeck();
        return () => abortController.abort();
      }, [deckId]);
   
    const handleFrontChange = (event) => {
        setCardFront(event.target.value)
    }

    const handleBackChange = (event) => {
        setCardBack(event.target.value)
    }
    const submitHandler = (event) => {
        event.preventDefault()
        createCard( deckId, {
            front: cardFront,
            back: cardBack,
    })
    setCardFront("")
    setCardBack("")
    event.target.reset()
    }
    
    return (
        <div>
        <p><HomeNavBar /> <span>{deckName} </span><span>/ Add Card</span></p>
        <h1><span>{deckName}</span> : <span>Add Card</span></h1>
            <form id="addCardForm" onSubmit={submitHandler}>
                <div>
                    <label className="label-text" htmlFor="cardFront">Front</label>
                    <textarea id="cardFront" onChange={handleFrontChange} type="text" name="cardFront" />
                </div>
                <div>
                    <label className="label-text" htmlFor="cardBack">Back</label>
                    <textarea id="cardBack" onChange={handleBackChange} type="text" name="cardBack" />
                </div>
                <button type="button" onClick={() => history.push(`/decks/${deckId}/view`)}>Done</button>
                <button type="submit">Save</button>
            </form>
            </div>
    )
}

export default AddCards