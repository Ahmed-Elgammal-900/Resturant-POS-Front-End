import { useCart } from "../Utils/Cart";
import * as photos from "../ProductsImages";

const CartItem = ({ name, price, count }: any) => {
  const { increaseCount, decreaseCount }: any = useCart();
  return (
    <div className="item-frame">
      <div className="top">
        <div className="image">
          <img
            src={photos[name.replace(/\s+/g, "") as keyof typeof photos]}
            alt="image"
          />
        </div>
        <header>
          <h3>{name}</h3>
          <p>price: {price} EGP</p>
        </header>
      </div>

      <div className="count-buttons">
        <button onClick={() => increaseCount(name)}>+</button>
        <p>{count}</p>
        <button onClick={() => decreaseCount(name, count)}>_</button>
      </div>
    </div>
  );
};

export default CartItem;
