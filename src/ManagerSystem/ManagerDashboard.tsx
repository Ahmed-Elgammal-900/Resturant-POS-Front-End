import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../Utils/Auth";
import { useEffect, useState } from "react";
import {
  faBriefcase,
  faBars,
  faXmark,
  faTrash,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const ManagerSystem = () => {
  const [optionsPage, setOptions] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);
  const [ordersCountItems, setOrdersCountItems] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const { Logout, deleteAccount }: any = useAuth();

  useEffect(() => {
    handleData();
  });

  const handleData = async () => {
    const response1 = await fetch(
      `${import.meta.env.VITE_API_URL}/orders/orders-count`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const [{ "count(DISTINCT order_id)": ordersCount }] =
      await response1.json();

    setOrdersCount(ordersCount);

    const response2 = await fetch(
      `${import.meta.env.VITE_API_URL}/orders/orders-items`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const [{ "count(name)": itemsCount }] = await response2.json();

    setOrdersCountItems(itemsCount);

    const response3 = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "GET",
      credentials: "include",
    });

    const { orders } = await response3.json();

    const totalRevenue = orders.reduce(
      (acc: number, { count, price }: any) => acc + count * price,
      0
    );

    setRevenue(totalRevenue);
  };
  const handleOverlay = () => {
    setOverlay((prev) => !prev);
  };
  const handleOptions = () => {
    setOptions((prev) => !prev);
    handleOverlay();
  };
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
      <div className="manager-info">
        <div className="block1">ordersCount: {ordersCount}</div>
        <div className="block2">ordersCountItems: {ordersCountItems}</div>
        <div className="block3">revenue: {revenue}</div>
      </div>
    </>
  );
};

export default ManagerSystem;
