import { createContext, useContext, useEffect, useState } from "react";

const cartContext: any = createContext([]);

export const useCart = () => useContext(cartContext);

export const Cart = ({ children }: any) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : []; // Default to empty array if no saved cart
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return []; // Return empty array in case of an error
    }
  });
  const [resultMassege, setMassege] = useState("");
  //   useEffect(() => {
  //     if (localStorage.getItem("cart")) {
  //       const cartStored: any = localStorage.getItem("cart");
  //       setCart(JSON.parse(cartStored));
  //     }
  //   }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [isLoading, setLoading] = useState(false);
  const [responseMassege, setResponse] = useState("");

  const addToCart = ({ name, price }: any) => {
    const exist = cart.some(({ name: name1 }: any) => name1 === name);
    if (exist) {
      setCart((prev: any) =>
        prev.map((product: any) =>
          product.name === name
            ? { ...product, count: product.count + 1 }
            : product
        )
      );
    } else {
      setCart((prev: any) => [...prev, { name: name, price: price, count: 1 }]);
    }
  };

  const increaseCount = (name: string) => {
    setCart((prev: any) =>
      prev.map((product: any) =>
        product.name === name
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  const decreaseCount = (name: string, count: number) => {
    if (count === 1) {
      setCart(cart.filter(({ name: name1 }: any) => name1 !== name));
    }
    setCart((prev: any) =>
      prev.map((product: any) =>
        product.name === name
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  };

  const [customerNumber, setNumber] = useState(0);

  const payment = () => {
    setLoading(true);
    const customerNumber = Math.ceil(Math.random() * 100);
    setNumber(customerNumber);
    cart.forEach((product: any) => delete product.price);

    const body = { data: cart, customerNumber: customerNumber };
    sendOrder(body);
  };

  const removeResponse = () => {
    setResponse("");
  };

  const sendOrder = async (body: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        body: JSON.stringify(body),
        credentials: "include",
      });

      const result = await response.json();
      setCart([]);
      setResponse(JSON.parse(result));
      setLoading(false);
    } catch (error) {
      setMassege("Failed");
      console.error(error);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cart: cart,
        resultMassege: resultMassege,
        addToCart: addToCart,
        increaseCount: increaseCount,
        decreaseCount: decreaseCount,
        payment: payment,
        isLoading: isLoading,
        responseMassege: responseMassege,
        customerNumber: customerNumber,
        removeResponse: removeResponse,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
