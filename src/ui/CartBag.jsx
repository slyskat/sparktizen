import { ShoppingBag } from 'lucide-react';
import styled from 'styled-components';

const CartButton = styled.button`
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
  top: 1;
  right: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: hidden;

  @media (min-width: 640px) {
    display: inline;
  }
`;

function CartBag() {
  return (
    <CartButton>
      <ShoppingBag size={20} strokeWidth={1.5} />
      <CartLabel>Cart</CartLabel>
    </CartButton>
  );
}

export default CartBag;
