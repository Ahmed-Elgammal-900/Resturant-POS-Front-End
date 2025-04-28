import { faCreditCard, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "../css/Checkout.css";
import visa from "../CardsLogo/Visa_Brandmark_Blue_RGB_2021.png";
import mastercard from "../CardsLogo/ma_symbol.svg";

type CardType = "visa" | "mastercard" | "inValid";

interface LogosType {
  visa: string;
  mastercard: string;
}

const Logos: LogosType = {
  visa: visa,
  mastercard: mastercard,
};

const Checkout = ({ isActive, setCheckout }: any) => {
  const [card, setCard] = useState<CardType>("inValid");
  const [validCard, setValid] = useState(false);
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    // Remove all non-digit characters
    let value = target.value.replace(/\D/g, "");

    // Limit to 16 digits
    value = value.slice(0, 16);

    // Format with space every 4 digits
    value = value.replace(/(.{4})(?=.)/g, "$1 ");

    const pureValue = value.replace(/\s/g, "");

    const isVisa = value.startsWith("4") && pureValue.length <= 16;

    const isMasterCard =
      (parseInt(value.slice(0, 2)) >= 51 &&
        parseInt(value.slice(0, 2)) <= 55) ||
      (parseInt(value.slice(0, 4)) >= 2221 &&
        parseInt(value.slice(0, 4)) <= 2720);

    if (isVisa) {
      setCard("visa");
      setValid(true);
    } else if (isMasterCard) {
      setCard("mastercard");
      setValid(true);
    } else {
      setCard("inValid");
      setValid(false);
    }
    // Update input value
    target.value = value;
  };

  return (
    <>
      <div className={isActive ? "checkout active" : "checkout"}>
        <div className="close-frame">
          <button onClick={() => setCheckout(false)} className="close">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2>Payment</h2>

        <div className="card-inputs">
          <div className="card-number">
            <label htmlFor="card-number">Card</label>
            <div className="input">
              <input
                type="text"
                name="card-number"
                id="card-number"
                onInput={handleInput}
                placeholder="eg. 1234-xxxx-xxxx-xxxx"
              />
              <span style={{ display: "inline-flex" }}>
                {validCard ? (
                  <img
                    src={Logos[card as keyof LogosType]}
                    alt="logo"
                    width={card === "visa" ? "40px" : "30px"}
                  />
                ) : (
                  <FontAwesomeIcon icon={faCreditCard} />
                )}
              </span>
            </div>
          </div>
          <div className="expire">
            <label htmlFor="expire">Expiration</label>
            <input type="month" name="expire" id="expire" required />
          </div>
          <div className="cvv">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              maxLength={3}
              placeholder="eg. 123"
              required
            />
          </div>
          <button type="button" disabled={!validCard}>
            Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
