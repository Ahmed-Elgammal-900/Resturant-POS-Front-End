import { useEffect, useState } from "react";
import * as photos from "../ProductsImages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { useCart } from "../Utils/Cart";

const CategoryPage = ({ category, products }: any) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = products.filter(
      ({ category: category2 }: any) => category2 === category
    );
    setItems(items);
  }, [products.length, category]);
  const { addToCart, cart }: any = useCart();
  return (
    <div className="grid-layout">
      {items.map(({ name, price }: any) => {
        const inCart = cart.find(({ name: cartName }: any) => cartName == name);
        return (
          <div
            className="block"
            onClick={() => addToCart({ name: name, price: price })}
          >
            <img
              src={photos[name.replace(/\s+/g, "") as keyof typeof photos]}
              alt="image"
            />
            <div className="info-frame">
              <div className="info">
                <div className="name">{name}</div>
                <div className="price">{price} EGP</div>
              </div>
              <button type="button" className="add-to-cart">
                {inCart ? (
                  inCart.count
                ) : (
                  <FontAwesomeIcon icon={faCartShopping} />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPage;
