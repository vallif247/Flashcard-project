import React from "react";
import { Link, Route } from "react-router-dom";
import CreateDeckScreen from "./CreateDeckScreen"

function CreateDeckButton() {

    return (
        <button>
        <Link to={"/decks/new"}>Create Deck</Link>
        </button>
    )
}

export default CreateDeckButton