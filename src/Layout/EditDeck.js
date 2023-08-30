import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import "./style.css"

function EditDeck({HomeNavBar}) {
const [deckName, setDeckName] = useState("")
const [description, setDescription] = useState("")
const history = useHistory()
const { deckId } = useParams()

useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const response = readDeck(deckId)
      const deckFromAPI = await response
      setDeckName(deckFromAPI.name)
      setDescription(deckFromAPI.description)
    
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

const handleNameChange = (event) => setDeckName(event.target.value)
const handleDescriptionChange = (event) => setDescription(event.target.value)

const submitHandler = (event) => {
  event.preventDefault()
  updateDeck({
    id: deckId,
    name: deckName,
    description: description,
  }).then((updateDeck) => history.push(`/decks/${updateDeck.id}/view`))
}

return (
  <div>
    <p><HomeNavBar /> {deckName} / Edit Deck</p>
    <h1>Edit Deck</h1>
    <form onSubmit={submitHandler}>
      <div>
         <label className="label-text" htmlFor="editName">Name</label>
          <textarea id="editName" value={deckName} onChange={handleNameChange} type="text" name="cardFront" />
      </div>
      <div>
          <label className="label-text" htmlFor="editDescription">Description</label>
          <textarea id="editDescription" value={description} rows="5" onChange={handleDescriptionChange} type="text" name="cardBack" />
      </div>
      <button type="button" onClick={() => history.push(`/decks/${deckId}/view`)}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  </div>
)

}

export default EditDeck