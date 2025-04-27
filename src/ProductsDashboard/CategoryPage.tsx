import { useEffect, useState } from "react";

const CategoryPage = ({ category, products }: any) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = products.filter(
      ({ category: category2 }: any) => category2 === category
    );
    setItems(items);
  }, [products, category]);
  return (
    <div className="grid-layout">
      {items.map(({ name, price }) => (
        <div className="block">
          <div className="name">{name}</div>
          <div className="price">{price}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
