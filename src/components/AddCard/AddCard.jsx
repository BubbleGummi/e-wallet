import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Top from "../Top/Top";
import Card from "../Card/Card";
import "./AddCard.scss";
import CreditCardsData from "../../assets/creditcards.json";

export default function AddCard() {
  const navigate = useNavigate();
  const cardData = CreditCardsData[4];
  const [addedCard, setAddedCard] = useState({
    id: "",
    cardNumber: "",
    cardHolderName: "",
    valid: "",
    ccv: "",
    vendor: "",
  });
  function handleClick() {
    const CardData = CreditCardsData.find(
      (card) => card.vendor.toLowerCase() === addedCard.vendor.toLowerCase()
    );
    //checks if all the fields are filled 
    if (
      addedCard.cardNumber === "" ||
      addedCard.cardHolderName === "" ||
      addedCard.valid === "" ||
      addedCard.ccv === ""
    ) 
    {
      alert("Please fill in all fields.");
      return;
    }
    const newCard = {
      ...addedCard,
      id: CardData.id,
      color: CardData.color,
      logo: CardData.logo,
      chip: CardData.chip,
      vendor: CardData.vendor,
    };

    setAddedCard(newCard);
    const storedCards = localStorage.getItem("addedCards");
    const updatedCards = storedCards
      ? [...JSON.parse(storedCards), newCard]
      : [newCard];
    localStorage.setItem("addedCards", JSON.stringify(updatedCards));
    setAddedCard(updatedCards);
  }

  useEffect(() => {
    if (addedCard.id !== "") {
      navigate("/");
    }
  }, [addedCard.id, navigate]);

  function handleKeyDown(event) {
    const value = event.target.value;
    if (
      value.length >= 16 && event.key !== "Backspace" && event.key !== "Delete") 
      {
      event.preventDefault();
      }
    }

  function handleKeyDownCcv(event) {
    const value = event.target.value;
    if (
      value.length >= 3 && event.key !== "Backspace" && event.key !== "Delete") 
    {
      event.preventDefault();
    }
  }

  return (
    <div className="addCard">
      <Top
        title="ADD A NEW BANK CARD"
        description="NEW CARD"
      />
      <Card cardData={cardData} />
      <form className="input-container">
        <label>CARD NUMBER</label>
          <input className="input-long" placeholder="XXXX XXXX XXXX XXXX" type="number"
            maxLength={16} required 
            value={addedCard.cardNumber || ''}
            onKeyDown={handleKeyDown} onChange={(event) => {
              setAddedCard({ ...addedCard, cardNumber: event.target.value });
            }}
          />
        <label>CARDHOLDER NAME</label>
          <input
            className="input-long" placeholder="FIRSTNAME LASTNAME" type="text"
            required 
            value={addedCard.cardHolderName || ''} onChange={(event) => {
              setAddedCard({
                ...addedCard,
                cardHolderName: event.target.value.toUpperCase(),
              });
            }}
          />
      </form>

      <form className="input-container-second">
        <div>
          <label>VALID THRU</label>
          <input className="input-short" type="text" placeholder="MM/YY"
            required
            value={addedCard.valid || ''}
            style={{ width: "80%" }}
            onChange={(event) => {
              const input = event.target.value.replace(/[^0-9]/g, "").slice(0, 4);
              const year = input.slice(0, 2);
              const month = input.slice(2, 4);
              const formatted = `${year}/${month}`;
              setAddedCard(prevState => ({ ...prevState, valid: formatted }));
            }}
          />
        </div>
        <div>
          <label>CCV</label>
            <input className="input-short" placeholder="CCV" type="number" max={999}
              required
              value={addedCard.ccv || ''} style={{ width: "100%" }} onKeyDown={handleKeyDownCcv} onChange={(event) => {
                setAddedCard({ ...addedCard, ccv: event.target.value });
              }}
            />
        </div>
      </form>

      <form className="input-container-third">
        <label>VENDOR</label>
          <select
            className="input-long"
            required
            value={addedCard.vendor || ''} onChange={(event) => {
              const value = event.target.value;
              setAddedCard(prevState => ({ ...prevState, vendor: value }));
            }}
          >
          <option value="">Choose a vendor...</option>
          <option value="Bitcoin inc">Bitcoin inc</option>
          <option value="Ninja bank">Ninja bank</option>
          <option value="Block chain inc">Block chan inc</option>
          <option value="Evil corp">Evil corp</option>
        </select>
      </form>
      <button className="addCard-btn" onClick={handleClick}>
        ADD CARD
      </button>
    </div>
  );
}

