import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faBriefcase,
  faRightToBracket,
  faSpinner,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Dashboard.css";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import { useCart } from "../Utils/Cart";
import CartItem from "./CartItem";
import Checkout from "./checkout";
import { useAuth } from "../Utils/Auth";

const DashboardPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartPage, setCart] = useState(false);
  const [optionsPage, setOptions] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [chekout, setCheckout] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      `${import.meta.env.VITE_API_URL}/menu-items/categories`,
      { credentials: "include" }
    );
    const categories = await data.json();
    const state = categories.map(({ category }: any) => category);
    setCategories(state);

    const productsData = await fetch(
      `${import.meta.env.VITE_API_URL}/menu-items`,
      { credentials: "include" }
    );

    const products = await productsData.json();
    setProducts(products);
  };
  const [firstCategory] = categories;
  const activateCart = () => {
    setCart((prev) => !prev);
    handleOverlay();
  };

  const handleOptions = () => {
    setOptions((prev) => !prev);
    handleOverlay();
  };

  const handleOverlay = () => {
    setOverlay((prev) => !prev);
  };

  const handleCheckout = (status = true) => {
    setCheckout(status);
  };
  const { cart }: any = useCart();
  const { Logout, deleteAccount }: any = useAuth();
  return (
    <>
      <div className={cartPage ? "cart active" : "cart"}>
        <button type="button" onClick={activateCart} className="close-cart">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1>cart</h1>
        <div className="items">
          {cart.map((product: object) => (
            <CartItem {...product} />
          ))}
        </div>
        <div className="total">
          Total:
          <span>
            {cart.reduce(
              (acc: number, { count, price }: any) => acc + price * count,
              0
            )}{" "}
            EGP
          </span>
        </div>
        <button
          className="payment"
          onClick={() => handleCheckout(true)}
          disabled={
            cart.reduce(
              (acc: number, { count, price }: any) => acc + price * count,
              0
            ) === 0
          }
        >
          Payment
        </button>
      </div>
      <Checkout isActive={chekout} setCheckout={handleCheckout} />
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
      <div className={overlay ? "overlay active" : "overlay"}></div>
      <div className="header">
        <div className="title-dashboard">
          <div className="icon-dashboard">
            <FontAwesomeIcon icon={faBriefcase} color="#C8161D" size={"xl"} />
          </div>
          <h2>SmartPOS</h2>
        </div>
        <div className="dashboard-buttons">
          <button type="button" onClick={activateCart}>
            <FontAwesomeIcon icon={faBagShopping} />
          </button>

          <button type="button" onClick={handleOptions}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {!(products.length === 0 || categories.length === 0) ? (
        <>
          <div className="links">
            {categories.map((category) => (
              <NavLink
                to={`/dashboard/${category}`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {category}
              </NavLink>
            ))}
          </div>

          <div className="pages">
            <Routes>
              {categories.map((category) => (
                <Route
                  path={category}
                  element={
                    <CategoryPage category={category} products={products} />
                  }
                />
              ))}
              <Route path="/" element={<Navigate to={firstCategory} />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
