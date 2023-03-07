import "./CardStack.css";
import Card from "../Card/Card";
import CreditCards from "../../assets/creditcards.json";

export default function CardStack({ activeCard, setActiveCard }) {
  const nonActiveCards = CreditCards.filter((card) => {
    return card?.id !== activeCard?.id && card?.id !== 5;
  });

  const storedCards = JSON.parse(localStorage.getItem("addedCards"));

  const nonActiveCardsWithStoredCards = [
    ...nonActiveCards,
    ...(Array.isArray(storedCards) ? storedCards : []),
  ];

  return (
    <div className="cardStack">
      <div className="cardStack-container" style={{ color: "#FFFFFF" }}>
        {nonActiveCardsWithStoredCards.map((card, key) => (
          <Card key={key} cardData={card} onClick={() => setActiveCard(card)} />
        ))}
      </div>
    </div>
  );
}
