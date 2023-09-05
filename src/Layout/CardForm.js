import React from "react";

function CardForm({submitHandler, front, back, handleFrontChange, handleBackChange}) {
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
      <button type="button" onClick={() => history.push(`/decks/${deckId}/view`)}>Cancel</button>
      <button type="submit">Save</button>
    </form>
    </div>
    )
}

export default CardForm