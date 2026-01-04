import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useLocalStorage('cart', []);

  function addItemToCart(newItem) {
    setCart((items) => {
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
    setCart((items) => items.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeItemFromCart(id);
      return;
    }
    setCart((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cart,
        setCart,
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
