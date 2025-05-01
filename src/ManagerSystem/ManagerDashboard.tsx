import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../Utils/Auth";
import { useEffect, useState } from "react";
import {
  faBriefcase,
  faBars,
  faXmark,
  faTrash,
  faRightToBracket,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "../css/manager.css";

const ManagerSystem = () => {
  const [optionsPage, setOptions] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);
  const [ordersCountItems, setOrdersCountItems] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const { Logout, deleteAccount }: any = useAuth();

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [ordersCountItems]);

  const handleData = async () => {
    try {
      const urls = [
        `${import.meta.env.VITE_API_URL}/orders/orders-count`,
        `${import.meta.env.VITE_API_URL}/orders/orders-items`,
        `${import.meta.env.VITE_API_URL}/orders/finished-orders`,
      ];
      const responses = await Promise.all(
        urls.map((url) => fetch(url, { method: "GET", credentials: "include" }))
      );
      const [
        [{ "count(DISTINCT order_id)": ordersCount }],
        [{ "count(name)": itemsCount }],
        { orders },
      ] = await Promise.all(responses.map((res) => res.json()));

      setOrdersCount(ordersCount);

      setOrdersCountItems(itemsCount);

      const totalRevenue = orders.reduce(
        (acc: number, { count, price }: any) => acc + count * price,
        0
      );

      setRevenue(totalRevenue);
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
      {!isLoading ? (
        <div className="manager-info">
          <div className="block1">
            <h3>Orders</h3>
            <p>{ordersCount.toLocaleString()}</p>
          </div>
          <div className="block2">
            <div className="nested-block1">
              <h3>Items</h3>
              <p>{ordersCountItems.toLocaleString()}</p>
            </div>
            <div className="nested-block2">
              <h3>Revenue</h3>
              <p>{revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-spinner">
          <FontAwesomeIcon icon={faSpinner} pulse />
        </div>
      )}
    </>
  );
};

export default ManagerSystem;
