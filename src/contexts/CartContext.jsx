import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState([]);

  function addItemToCart(newItem) {
    setItems((items) => {
      const existingItem = items.find((item) => item.id === newItem.id);
      if (existingItem) {
        return items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...newItem, quantity: 1 }];
    });
  }

  function removeItemFromCart(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeItemFromCart(id);
      return;
    }
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setItems([]);
  }

  function getCartCount() {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  function getSubtotal() {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        items,
        setItems,
        removeItemFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getSubtotal,
      }}
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
