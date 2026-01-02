import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { X } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: hsl(var(--bg-primary) / 0.8);
  backdrop-filter: blur(4px);
  transition: opacity 300ms ease-out;

  ${(props) => {
    if (props.$isOpen) {
      return css`
        opacity: 100%;
      `;
    } else {
      return css`
        opacity: 0;
        pointer-events: none;
      `;
    }
  }}
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  max-width: 30rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--bg-primary));
  transition: transform 0.3s ease-in-out;

  ${(props) => {
    if (props.$isOpen) {
      return css`
        transform: translateX(0);
      `;
    } else {
      return css`
        transform: translateX(100%);
      `;
    }
  }}
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid hsl(var(--border));
  padding: 1rem;
`;

const Title = styled.h2`
  font-family: 'Anton', sans-serif;
  font-size: 2rem;
  color: hsl(var(--text-primary));
`;

const CloseButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: hsl(var(--text-primary));
  cursor: pointer;
`;

function CartModal() {
  const { isCartOpen, setIsCartOpen } = useCart();

  return createPortal(
    <Overlay $isOpen={isCartOpen} onClick={() => setIsCartOpen(false)}>
      <Modal $isOpen={isCartOpen}>
        <Header>
          <Title>YOUR CART</Title>
          <CloseButton>
            <X size={24} strokeWidth={1.5} />
          </CloseButton>
        </Header>
      </Modal>
    </Overlay>,
    document.getElementById('cart-portal')
  );
}

export default CartModal;
