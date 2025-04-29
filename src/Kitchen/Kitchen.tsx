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

const Kitchen = () => {
  const [optionsPage, setOptions] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [ordersShow, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "GET",
        credentials: "include",
      });

      const { orders, ordersIDs } = await response.json();
      const ordersState = ordersIDs.map(({ order_id: main }: any) =>
        orders.filter(({ order_id }: any) => order_id == main)
      );
      console.log(JSON.stringify(ordersState, null, 2));
      const final = ordersState.map((array: any, i: number) => [
        ...array,
        ordersIDs[i],
      ]);
      setOrders(final);
    } catch (error) {
      console.error;
    }
  };

  const finishOrder = async (orderID: string, orderIndex: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        body: JSON.stringify({ orderID: orderID }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);
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
      <div className="orders-content">
        {ordersShow.map((array: any, orderIndex: number) => (
          <div className="invoice">
            <h2>{orderIndex + 1}</h2>
            <div className="orderinfo">
              {array.map(({ name, count }: any) => (
                <>
                  <p className="name">{name}</p>
                  <p className="count">{count}</p>
                </>
              ))}
            </div>
            <button
              type="button"
              onClick={() => finishOrder(array[array.length - 1], orderIndex)}
            >
              Done
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Kitchen;
