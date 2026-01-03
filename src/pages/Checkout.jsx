import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const EmptyState = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

const EmptyStateText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  color: hsl(var(--text-secondary));
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
`;

const EmptyStateButton = styled.button`
  background-color: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.3s ease-out;
  font-size: 1rem;
  padding: 1.5rem 0.75rem;
  font-size: 1rem;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

function Checkout() {
  const { items } = useCart();
  const navigate = useNavigate();

  if (items.length === 0)
    return (
      <EmptyState>
        <EmptyStateText>Your cart is empty</EmptyStateText>
        <EmptyStateButton onClick={() => navigate('/')}>
          RETURN TO STORE
        </EmptyStateButton>
      </EmptyState>
    );

  return <div></div>;
}

export default Checkout;
