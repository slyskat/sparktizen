import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { X } from 'lucide-react';
import CartDisplay from './CartDisplay';
import { useDrop } from '../contexts/DropContext';
import SessionTimer from './SessionTimer';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';
import { useEffect, useRef } from 'react';

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

  display: flex;
  flex-direction: column;

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
  }};
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
  font-family: var(--font-logo);
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

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 1rem;
`;

const StyledFooter = styled.footer`
  padding: 1rem;
  background-color: hsl(var(--border));
  border-top: 1px solid hsl(var(--border));
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SessionStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border: 1px solid hsl(var(--border));

  ${(props) => {
    if (props.$isWarning) {
      return css`
        border: 1px solid hsl(0 80% 50% /0.5);
        background: hsl(0 80% 50% / 0.1);
      `;
    } else {
      return css`
        border: 1px solid hsl(var(--border));
      `;
    }
  }}
`;

const SessionText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--text-secondary));
`;

const SubtotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubtotalHeader = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--text-secondary));
`;

const Subtotal = styled.span`
  font-family: 'Anton', sans-serif;
  font-size: 2rem;
  color: hsl(var(--text-primary));
`;

const CheckoutButton = styled.button`
  background-color: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.3s ease-out;
  font-size: 1rem;

  width: 100%;
  padding: 1rem 0;
  &:hover {
    background-color: hsl(var(--text-primary) / 0.9);
  }

  &:active {
    transform: scaleY(0.98);
  }

  ${(props) => {
    if (props.$isDisabled) {
      return css`
        opacity: 0.5;
        cursor: not-allowed;
      `;
    }
  }}
`;

function CartModal() {
  const { isCartOpen, setIsCartOpen, cart, getSubtotal } = useCart();
  const { isWarning } = useDrop();
  const isDisabled = cart.length === 0;
  const navigate = useNavigate();
  const modalRef = useRef(null);

  function proceedToCheckoout() {
    setIsCartOpen(false);

    navigate('/checkout');
  }

  useEffect(
    function () {
      const focusableContent = modalRef.current?.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])'
      );

      const modalElement = modalRef.current;

      if (focusableContent.length === 0) return;

      const firstElement = focusableContent[0];
      const lastElement = focusableContent[focusableContent.length - 1];

      firstElement.focus();

      function handleTabKey(e) {
        if (e.key !== 'Tab') {
          return;
        }

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }

      modalRef.current?.addEventListener('keydown', handleTabKey);

      return () => {
        modalElement.removeEventListener('keydown', handleTabKey);
      };
    },
    [isCartOpen]
  );

  return createPortal(
    <Overlay
      $isOpen={isCartOpen}
      onClick={() => setIsCartOpen(false)}
      aria-modal="true"
      role="dialog"
    >
      <Modal
        $isOpen={isCartOpen}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex="-1"
      >
        <Header>
          <Title>YOUR CART</Title>
          <CloseButton
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            <X size={24} strokeWidth={1.5} />
          </CloseButton>
        </Header>

        <CartItems>
          {cart?.map((item) => (
            <CartDisplay key={item.id} item={item} />
          ))}
        </CartItems>

        <StyledFooter>
          <SessionStatus $isWarning={isWarning}>
            <SessionText>Session expires in</SessionText>
            <SessionTimer />
          </SessionStatus>

          <SubtotalWrapper>
            <SubtotalHeader>Subtotal</SubtotalHeader>
            <Subtotal>{formatCurrency(getSubtotal())}</Subtotal>
          </SubtotalWrapper>

          <CheckoutButton $isDisabled={isDisabled} onClick={proceedToCheckoout}>
            Proceed to checkout
          </CheckoutButton>
        </StyledFooter>
      </Modal>
    </Overlay>,
    document.getElementById('cart-portal')
  );
}

export default CartModal;
