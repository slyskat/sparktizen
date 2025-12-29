import styled, { css } from 'styled-components';
import { useDrop } from '../contexts/DropContext';
import { Lock } from 'lucide-react';

const Container = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  background-color: hsl(var(--bg-secondary));
  overflow: hidden;
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

  /* ${(props) =>
    props.$shouldShow &&
    css`
      ${Container}:hover & {
        opacity: 1;
      }
    `} */

  ${Container}:hover && {
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
function ProductCard({ product }) {
  const { isUnlocked } = useDrop();
  const isAvailable = isUnlocked && product.status === 'AVAILABLE';
  const status = !isUnlocked ? 'LOCKED' : product.status;
  const isLocked = status === 'LOCKED';
  return (
    <Container $isAvailable={isAvailable}>
      <ProductImage src={product.image} alt={product.name} $status={status} />
      <BottomGradient>
        <ProductName>{product.name}</ProductName>
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
    </Container>
  );
}

export default ProductCard;
