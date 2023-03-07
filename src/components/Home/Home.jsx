import "./Home.css";
import Top from "../Top/Top";
import Card from "../Card/Card";
import CardStack from "../CardStack/CardStack";
import { Link } from "react-router-dom";
import CreditCardsData from "../../assets/creditcards.json";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (!activeCard) {
      setActiveCard(CreditCardsData[0]);
    }
  }, []);

  const handleRemoveCard = (cardId) => {
    const storedCards = JSON.parse(localStorage.getItem("addedCards"));
    const updatedCards = storedCards.filter((card) => card.id !== cardId);

    localStorage.setItem("addedCards", JSON.stringify(updatedCards));

    if (activeCard && activeCard.id === cardId) {
      setActiveCard(CreditCardsData[0]);
    }
  };

  return (
    <div className="home">
      <Top title="E-WALLET" description="ACTIVE CARD" />
      <Card cardData={activeCard} />
      <button
        className="remove-btn"
        onClick={() => handleRemoveCard(activeCard.id)}
      >
        REMOVE CARD
      </button>
      <CardStack activeCard={activeCard} setActiveCard={setActiveCard} />
      <Link to="/addcard">
        <button className="home-btn">ADD A NEW CARD</button>
      </Link>
    </div>
  );
}
