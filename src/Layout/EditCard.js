import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm"

function EditCard({HomeNavBar}) {
const [deckName, setDeckName] = useState("")
const [card, setCard] = useState("")
const [back, setBack] = useState("")
const [front, setFront] = useState("")
const history = useHistory()
const { deckId } = useParams()
const { cardId } = useParams()

useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const response = readDeck(deckId)
      const deckFromAPI = await response
      setDeckName(deckFromAPI.name)
   
    }

    async function loadCard() {
        const response = readCard(cardId)
        const cardFromAPI = await response
        setCard(cardFromAPI)
        setFront(cardFromAPI.front)
        setBack(cardFromAPI.back)
    }
    loadDeck()
    loadCard()
    return () => abortController.abort();
  }, [deckId, cardId]);



const handleFrontChange = (event) => {
  if (front === undefined || front === null) {
    console.warn(`Warning: Input is changing an uncontrolled input of type ${event.type} to be controlled.`)
}
setFront(event.target.value)
} 
const handleBackChange = (event) => {
  if (back === undefined || back === null) {
    console.warn(`Warning: Input is changing an uncontrolled input of type ${event.type} to be controlled.`)
}
  setBack(event.target.value)
}

const submitHandler = (event) => {
  event.preventDefault()
  updateCard({
    ...card,
    front: front,
    back: back,
  }).then((updateCard) => history.push(`/decks/${updateCard.id}/view`))
}

return (
  <div>
    <p><HomeNavBar /> {deckName} / Edit Card {cardId}</p>
    <h1>Edit Card</h1>
    < CardForm submitHandler={submitHandler} front={front} back={back} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange}/>
  </div>
)

}
export default EditCard

