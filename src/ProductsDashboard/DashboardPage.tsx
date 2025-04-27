import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Dashboard.css";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import CategoryPage from "./CategoryPage";

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
  return (
    <>
      <div className="header">
        <div className="title-dashboard">
          <div className="icon-dashboard">
            <FontAwesomeIcon icon={faBriefcase} color="#C8161D" size={"xl"} />
          </div>
          <h2>SmartPOS</h2>
        </div>
        <div className="dashboard-buttons">
          <button>
            <FontAwesomeIcon icon={faBagShopping} />
          </button>

          <button>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
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
              element={<CategoryPage category={category} products={products} />}
            />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default DashboardPage;
