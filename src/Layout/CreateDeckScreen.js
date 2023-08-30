import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import "./style.css"

function CreateDeckScreen({HomeNavBar}) {
    const [deckName, setDeckName] = useState("")
    const [deckDescription, setDeckDescription] = useState("")
    const history = useHistory()

    const handleNameChange = (event) => {
        setDeckName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDeckDescription(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        createDeck({
            name: deckName,
            description: deckDescription,
    }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
    }

    return (
        <div>
            <p><HomeNavBar /> Create Deck</p>
            <h1>Create Deck</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label className="label-text" htmlFor="deckName">Name</label>
                    <input id="deckName" onChange={handleNameChange} type="text" name="deckName" />
                </div>
                <div>
                    <label className="label-text" htmlFor="description">Description</label>
                    <textarea id="description" onChange={handleDescriptionChange} type="text" name="description" />
                </div>
                <button type="button" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeckScreen
