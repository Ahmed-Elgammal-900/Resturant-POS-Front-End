import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Dashboard.css";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import CategoryPage from "./CategoryPage";

const DashboardPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
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

  if (products.length === 0 || categories.length === 0) {
    return <h1>"loading"</h1>;
  }
  const [firstCategory] = categories;
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
          <Route path="/dashboard" element={<Navigate to={firstCategory} />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardPage;
