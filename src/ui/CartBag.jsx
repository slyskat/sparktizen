import { ShoppingBag } from 'lucide-react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';

const CartButton = styled.button`
  background: none;
  border: none;
  outline: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: hsl(var(--text-primary));

  &:hover {
    color: hsl(var(--text-secondary));
    transition: color 0.3s ease;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: 1px;
  right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
  width: 20px;
  height: 20px;
`;

const CartLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: none;

  @media (min-width: 640px) {
    display: inline;
  }
`;

function CartBag() {
  const { setIsCartOpen, cartCount } = useCart();

  return (
    <CartButton
      onClick={() => setIsCartOpen((isCartOpen) => !isCartOpen)}
      aria-label="cart"
    >
      <ShoppingBag size={20} strokeWidth={1.5} />
      <CartLabel>Cart</CartLabel>
      {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
    </CartButton>
  );
}

export default CartBag;
