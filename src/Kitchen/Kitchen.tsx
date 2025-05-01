import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBars,
  faXmark,
  faTrash,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "../Utils/Auth";
import "../css/Kitchen.css";

const Kitchen = () => {
  const [optionsPage, setOptions] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [ordersShow, setOrders] = useState<any>([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "GET",
        credentials: "include",
      });

      const { orderIDs, orders } = await response.json();
      const ordersState = orderIDs.map(({ order_id: main }: any) =>
        orders.filter(({ order_id }: any) => order_id == main)
      );

      const final = ordersState.map((array: any, i: number) => [
        ...array,
        array[0].number,
        orderIDs[i],
      ]);

      setOrders(final);
    } catch (error) {
      console.error;
    }
  };

  const finishOrder = async (orderID: string, orderIndex: number) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/orders/finishOrder`, {
        method: "POST",
        body: JSON.stringify(orderID),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setOrders((prev: any) =>
        prev.filter((_: any, index: number) => index !== orderIndex)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleOverlay = () => {
    setOverlay((prev) => !prev);
  };
  const handleOptions = () => {
    setOptions((prev) => !prev);
    handleOverlay();
  };

  const colors = ["green", "blue", "red"];

  const shuffle = (arr: any) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const shuffledColors = shuffle(colors);
  const { Logout, deleteAccount }: any = useAuth();
  return (
    <>
      <div className={overlay ? "overlay active" : "overlay"}></div>
      <div className={optionsPage ? "options active" : "options"}>
        <button type="button" onClick={handleOptions} className="close-options">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1>options</h1>
        <div className="options-button">
          <button type="button" onClick={Logout}>
            Logout
            <FontAwesomeIcon icon={faRightToBracket} />
          </button>
          <button type="button" onClick={deleteAccount}>
            Delete
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <div className="header">
        <div className="title-dashboard">
          <div className="icon-dashboard">
            <FontAwesomeIcon icon={faBriefcase} color="#C8161D" size={"xl"} />
          </div>
          <h2>SmartPOS</h2>
        </div>
        <div className="dashboard-buttons">
          <button type="button" onClick={handleOptions}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {ordersShow.length !== 0 ? (
        <div className="orders-content">
          {ordersShow.map((array: any, orderIndex: number) => (
            <div className="invoice">
              <h2
                style={{
                  backgroundColor:
                    shuffledColors[orderIndex % shuffledColors.length],
                }}
              >
                No.{orderIndex + 1}
              </h2>
              <div className="invoice-info">
                <h3>
                  customer number:<span>{array[array.length - 2]}</span>
                </h3>
                <div className="fields">
                  <h4>
                    name<span>count</span>
                  </h4>
                </div>
                <div className="order-info-text">
                  {array.map(({ name, count }: any) => (
                    <div className="order-invoice-info">
                      <p className="name">{name}</p>
                      <p
                        className="count"
                        style={{
                          display: "inline-block",
                          marginRight: count >= 10 ? "10px" : "20px",
                        }}
                      >
                        {count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => finishOrder(array[array.length - 1], orderIndex)}
                className="finish-order"
              >
                Done
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders-massege">
          <p>No Orders To Make</p>
        </div>
      )}
    </>
  );
};

export default Kitchen;
