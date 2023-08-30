import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from "./DeckList";
import DeckScreen from "./ViewDeckScreen";
import StudyCards from "./Study";
import { Switch, Route, NavLink } from "react-router-dom"
import CreateDeckScreen from "./CreateDeckScreen";
import AddCards from "./AddCards";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";

function Layout() {

  const HomeNavBar = () => {
    return (
      <NavLink to="/">Home /</NavLink>
    )
  }
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <CreateDeckScreen HomeNavBar={HomeNavBar}/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCards HomeNavBar={HomeNavBar}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck HomeNavBar={HomeNavBar} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard HomeNavBar={HomeNavBar}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyCards HomeNavBar={HomeNavBar}/>
          </Route>
          <Route path="/decks/:deckId">
            <DeckScreen HomeNavBar={HomeNavBar}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
