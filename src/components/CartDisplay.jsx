import { Minus, Plus, Trash2 } from 'lucide-react';
import styled from 'styled-components';
import QuantityButton from '../ui/QuantityButton';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/helpers';

const ItemContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  background-color: hsl(var(--bg-secondary));
  overflow-y: hidden;
  flex-shrink: 0;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 120px;
  background: hsl(var(--bg-secondary));
  flex-shrink: 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CartItemDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartItemLabel = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  color: hsl(var(--text-primary));
  letter-spacing: 0.05em;
  font-size: 1rem;
`;

const CartItemPrice = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: hsl(var(--text-secondary));
  margin: 0.25rem;
`;

const QuantityActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityCount = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  width: 2rem;
  text-align: center;
  color: hsl(var(--text-primary));
`;

const DeleteItemButton = styled.button`
  padding: 0.25rem;
  color: hsl(var(--text-secondary));

  &:hover {
    color: hsl(0 80% 50%);
  }
`;

function CartDisplay({ item }) {
  const { removeItemFromCart, updateQuantity } = useCart();
  return (
    <ItemContainer>
      <Thumbnail>
        <StyledImage src={item.image} alt={item.name} />
      </Thumbnail>

      <CartItemDetailsContainer>
        <div>
          <CartItemLabel>{item.name}</CartItemLabel>
          <CartItemPrice>{formatCurrency(item.price)}</CartItemPrice>
        </div>

        <QuantityActionContainer>
          <QuantityControls>
            <QuantityButton
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              label="Decrease Quantity"
            >
              <Minus size={12} />
            </QuantityButton>
            <QuantityCount>{item.quantity}</QuantityCount>
            <QuantityButton
              label="Increase Quantity"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={12} />
            </QuantityButton>
          </QuantityControls>
          <DeleteItemButton
            onClick={() => removeItemFromCart(item.id)}
            aria-label="Remove item from cart"
          >
            <Trash2 size={14} />
          </DeleteItemButton>
        </QuantityActionContainer>
      </CartItemDetailsContainer>
    </ItemContainer>
  );
}

export default CartDisplay;
