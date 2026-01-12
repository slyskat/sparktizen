import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useLocalStorage('cart', []);

  const addItemToCart = useCallback(
    (newItem) => {
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
    },
    [setCart]
  );

  const removeItemFromCart = useCallback(
    (id) => {
      setCart((items) => items.filter((item) => item.id !== id));
    },
    [setCart]
  );

  const updateQuantity = useCallback(
    (id, quantity) => {
      if (quantity <= 0) {
        removeItemFromCart(id);
        return;
      }
      setCart((items) =>
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    },
    [setCart, removeItemFromCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cart,
      removeItemFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      subtotal,
    }),
    [
      isCartOpen,
      cart,
      addItemToCart,
      removeItemFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      subtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a cart provider');
  }
  return context;
}

export { CartProvider, useCart };
