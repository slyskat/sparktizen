import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState([]);

  function AddItemToCart(newItem) {
    setItems((items) => [...items, newItem]);
  }

  return (
    <CartContext.Provider
      value={{ isCartOpen, setIsCartOpen, AddItemToCart, items, setItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a cart provider');
  }
  return context;
}

export { CartProvider, useCart };
