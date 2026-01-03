import styled, { css } from 'styled-components';
import { useDrop } from '../contexts/DropContext';
import { Lock, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { getOptimizedImageUrl } from '../services/apiProducts';

const Container = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  background-color: hsl(var(--bg-secondary));
  overflow: hidden;
  border: 1px solid #262626;
  cursor: ${(props) => (props.$isAvailable ? 'pointer' : 'not-allowed')};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;

  ${(props) => {
    if (props.$status === 'LOCKED') {
      return css`
        filter: grayscale(100%);
        opacity: 0.4;

        ${Container}:hover & {
          opacity: 0.3;
        }
      `;
    }

    if (props.$status === 'SOLD_OUT') {
      return css`
        filter: grayscale(100%);
        opacity: 0.5;
      `;
    }

    if (props.$status === 'AVAILABLE') {
      return css`
        filter: grayscale(0%);
        opacity: 1;

        ${Container}:hover & {
          transform: scale(1.05);
        }
      `;
    }
  }}
`;

const BottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: linear-gradient(
    to top,
    hsl(var(--bg-background) / 0.8),
    transparent
  );
  pointer-events: none;
`;

const ProductName = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: hsl(var(--text-secondary));
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const CenterOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: hsla(var(--bg-background) / 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Container}:hover & {
    opacity: 1;
  }
`;

const LockIconContainer = styled.div`
  margin-bottom: 0.75rem;
  color: hsl(var(--text-primary));
`;

const LockText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  line-height: 1rem;
  color: hsl(var(--text-primary));
  letter-spacing: 0.25em;
  text-transform: uppercase;
`;

const CornerIconContainer = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  opacity: 0.4;
  pointer-events: none;
  color: hsl(var(--text-primary));
`;

const ProductPrice = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  line-height: 1rem;
  color: hsl(var(--text-primary));
  margin-top: 0.25rem;
`;

const SoldOutOverlayContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SoldOutOverlay = styled.div`
  background-color: hsla(var(--bg-background) / 0.7);
  position: absolute;
  inset: 0;
`;

const SoldOutContainer = styled.div`
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  background-color: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
  padding: 0.5rem 1.5rem;
`;

const SoldOutText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
`;

const AddButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 300ms ease-out;
  z-index: 10;

  ${Container}:hover & {
    transform: translateY(0);
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  background: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
  border: none;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: all 200ms ease-out;

  &:hover {
    opacity: 0.9;
    letter-spacing: 0.25em;
  }

  &:active {
    transform: scale(0.98);
  }
`;

function ProductCard({ product, important }) {
  const { isUnlocked } = useDrop();
  const { addItemToCart } = useCart();
  const isAvailable = isUnlocked && product.status === 'AVAILABLE';
  const status = !isUnlocked ? 'LOCKED' : product.status;
  const isLocked = !isUnlocked || product.status === 'LOCKED';
  const isSoldOut = product.status === 'SOLD_OUT';

  return (
    <Container $isAvailable={isAvailable}>
      <ProductImage
        src={getOptimizedImageUrl(product.image, 400)}
        alt={product.name}
        $status={status}
        loading={important ? 'eager' : 'lazy'}
      />
      <BottomGradient>
        <ProductName>{product.name}</ProductName>
        {isAvailable && <ProductPrice>₦{product.price}</ProductPrice>}
      </BottomGradient>

      {isLocked && (
        <CenterOverlay>
          <LockIconContainer>
            <Lock size={32} strokeWidth={1.5} />
          </LockIconContainer>
          <LockText>Locked</LockText>
        </CenterOverlay>
      )}

      {isLocked && (
        <CornerIconContainer>
          <Lock size={14} />
        </CornerIconContainer>
      )}

      {isSoldOut && (
        <SoldOutOverlayContainer>
          <SoldOutOverlay />
          <SoldOutContainer>
            <SoldOutText>Sold Out</SoldOutText>
          </SoldOutContainer>
        </SoldOutOverlayContainer>
      )}

      {isAvailable && (
        <AddButtonContainer>
          <AddButton onClick={() => addItemToCart(product)}>
            <ShoppingBag size={14} strokeWidth={1.5} />
            ADD TO CART
          </AddButton>
        </AddButtonContainer>
      )}
    </Container>
  );
}

export default ProductCard;
