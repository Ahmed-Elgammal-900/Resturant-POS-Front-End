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
  const [categories, setCategories] = useState([
    "starters",
    "desserts",
    "main course",
    "drinks",
    "breakfast",
  ]);
  const [products, setProducts] = useState([
    { name: "Tomato Soup", price: 65, category: "starters" },
    { name: "Garlic Bread", price: 50, category: "starters" },
    { name: "Chicken Wings", price: 70, category: "starters" },
    { name: "Spring Rolls", price: 60, category: "starters" },
    { name: "Caesar Salad", price: 55, category: "starters" },
    { name: "Bruschetta", price: 75, category: "starters" },
    { name: "Chocolate Cake", price: 80, category: "desserts" },
    { name: "Ice Cream Sundae", price: 40, category: "desserts" },
    { name: "Cheesecake", price: 60, category: "desserts" },
    { name: "Apple Pie", price: 80, category: "desserts" },
    { name: "Tiramisu", price: 85, category: "desserts" },
    { name: "Brownie with Ice Cream", price: 90, category: "desserts" },
    { name: "Grilled Chicken", price: 200, category: "main course" },
    { name: "Spaghetti Carbonara", price: 180, category: "main course" },
    { name: "Margherita Pizza", price: 220, category: "main course" },
    { name: "Beef Burger", price: 150, category: "main course" },
    { name: "BBQ Ribs", price: 300, category: "main course" },
    { name: "Vegetable Stir Fry", price: 120, category: "main course" },
    { name: "Mint Lemonade", price: 60, category: "drinks" },
    { name: "Mango Lassi", price: 90, category: "drinks" },
    { name: "Strawberry Mojito", price: 75, category: "drinks" },
    { name: "Coconut Water with Lime", price: 90, category: "drinks" },
    { name: "Date Milkshake", price: 100, category: "drinks" },
    { name: "Virgin Piña Colada", price: 110, category: "drinks" },
    { name: "Shakshuka", price: 60, category: "breakfast" },
    { name: "Ful Medames", price: 50, category: "breakfast" },
    { name: "Waffles with Fruit", price: 60, category: "breakfast" },
    { name: "Omelette with Veggies", price: 65, category: "breakfast" },
    { name: "French Toast", price: 75, category: "breakfast" },
    { name: "Pancakes with Maple Syrup", price: 80, category: "breakfast" },
  ]);
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
          disabled={cart.reduce(
            (acc: number, { count, price }: any) => acc + price * count,
            0
          ) === 0}
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
