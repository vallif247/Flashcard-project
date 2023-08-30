import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";

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



const handleFrontChange = (event) => setFront(event.target.value)
const handleBackChange = (event) => setBack(event.target.value)

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
    <form onSubmit={submitHandler}>
      <div>
         <label className="label-text" htmlFor="editFront">Front</label>
          <textarea id="editFront" value={front} onChange={handleFrontChange} type="text" name="cardFront" />
      </div>
      <div>
          <label className="label-text" htmlFor="editBack">Back</label>
          <textarea id="editBack" value={back} rows="5" onChange={handleBackChange} type="text" name="cardBack" />
      </div>
      <button type="button" onClick={() => history.push(`/decks/${deckId}/view`)}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  </div>
)

}

export default EditCard