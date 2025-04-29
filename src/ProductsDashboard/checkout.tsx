import {
  faCreditCard,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "../css/Checkout.css";
import visa from "../CardsLogo/Visa_Brandmark_Blue_RGB_2021.png";
import mastercard from "../CardsLogo/ma_symbol.svg";
import { useCart } from "../Utils/Cart";

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
  const [inputs, setInputs] = useState({ expiration: "", cvv: 0 });
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

  const {
    isLoading,
    responseMassege,
    customerNumber,
    removeResponse,
    payment,
  }: any = useCart();

  const handleCheckoutPage = () => {
    setCheckout(false);
    removeResponse();
    setValid(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const allFilled = Object.values(inputs).every((value: any) => value.trim() !== "" || 0);

  return (
    <>
      <div className={isActive ? "checkout active" : "checkout"}>
        <div className="close-frame">
          <button onClick={handleCheckoutPage} className="close">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2 style={{ display: responseMassege !== "" ? "none" : "block" }}>
          Payment
        </h2>
        {responseMassege == "" &&
          (isLoading ? (
            <div className="spinner">
              <FontAwesomeIcon icon={faSpinner} spinPulse />
            </div>
          ) : (
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
                <input
                  type="month"
                  name="expiration"
                  id="expire"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="cvv">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  maxLength={3}
                  onChange={handleInputChange}
                  placeholder="eg. 123"
                  required
                />
              </div>
              <button type="button" disabled={allFilled && validCard} onClick={payment}>
                Pay
              </button>
            </div>
          ))}
        {responseMassege !== "" ? (
          <div className="order-info">
            <h1>Number</h1>
            <h2>{customerNumber}</h2>
            <p>{responseMassege}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Checkout;
