import React from "react";
import {useHistory} from "react-router-dom";

function CardForm({cancelButton, deckId, submitHandler, front, back, handleFrontChange, handleBackChange}) {
    const history = useHistory()
    return (
    <div>
<form onSubmit={submitHandler}>
      <div>
         <label className="label-text" htmlFor="front">Front</label>
          <textarea id="front" value={front} onChange={handleFrontChange} type="text" name="cardFront" />
      </div>
      <div>
          <label className="label-text" htmlFor="back">Back</label>
          <textarea id="back" value={back} rows="5" onChange={handleBackChange} type="text" name="cardBack" />
      </div>
      <button type="button" onClick={() => history.push(`/decks/${deckId}/view`)}>{cancelButton}</button>
      <button type="submit">Save</button>
    </form>
    </div>
    )
}

export default CardForm