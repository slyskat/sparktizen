import styled from 'styled-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

const Container = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const ErrorContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border: 1px solid hsl(var(--text-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
`;

const Title = styled.h1`
  font-family: var(--font-logo);
  font-size: 2.25rem;
  letter-spacing: -0.025em;
  margin-bottom: 0.75rem;

  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.75rem;
  color: hsl(var(--text-secondary));
  text-transform: uppercase;
  letter-spacing: 0.3em;
`;

const ErrorMessage = styled(Subtitle)`
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
`;

const OrderCard = styled.div`
  border: 1px solid hsl(var(--border));
  background-color: hsl(0 0% 3%);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const SectionLabel = styled.h2`
  font-family: monospace;
  font-size: 0.75rem;
  color: hsl(var(--text-secondary));
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
`;

const ItemsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ItemImageWrapper = styled.div`
  width: 3rem;
  height: 3.5rem;
  background-color: hsl(var(--bg-secondary));
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemName = styled.p`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ItemQty = styled.p`
  font-size: 10px;
  color: #71717a;
`;

const PriceText = styled.p`
  font-size: 0.875rem;
`;

const Divider = styled.div`
  height: 1px;
  background-color: hsl(var(--border));
  margin: 1.5rem 0;
`;

const AddressBlock = styled.div`
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  p {
    color: hsl(var(--text-primary));
    line-height: 1.4;
  }

  .primary {
    color: hsl(var(--text-secondary));
  }
`;

const TotalsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: hsl(var(--text-secondary));
  letter-spacing: 0.05em;
`;

const GrandTotalRow = styled(TotalRow)`
  font-family: var(--font-logo);
  font-size: 1.25rem;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  border-top: 1px solid hsl(var(--border));
`;

const EmailNotice = styled.div`
  background-color: hsl(var(--bg-secondary) / 0.5);
  padding: 1rem;
  text-align: center;

  p {
    font-size: 10px;
    color: hsl(var(--text-secondary));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const StyledButton = styled.button`
  background-color: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.02em;
  transition: all 0.3s ease-out;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    background: white;
    color: black;
  }
`;

function OrderReceipt() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const orderData = location.state;

  useEffect(
    function () {
      clearCart();
    },
    [clearCart]
  );

  if (!orderData) {
    return (
      <ErrorContainer>
        <ErrorMessage>Order not found</ErrorMessage>
        <StyledButton onClick={() => navigate('/')}>
          RETURN TO STORE
        </StyledButton>
      </ErrorContainer>
    );
  }

  const { cart, subtotal, shipping, total, shippingAddress } = orderData;

  return (
    <Container>
      <HeaderSection>
        <IconWrapper>
          <CheckCircle size={32} strokeWidth={1} />
        </IconWrapper>

        <Title>ORDER CONFIRMED</Title>
        <Subtitle>ORDER #{id}</Subtitle>
      </HeaderSection>

      <OrderCard>
        <Section>
          <SectionLabel>Items Purchased</SectionLabel>
          <ItemsGrid>
            {cart.map((item) => (
              <ItemRow key={item.id}>
                <ItemInfo>
                  <ItemImageWrapper>
                    <img src={item.image} alt={item.name} />
                  </ItemImageWrapper>
                  <div>
                    <ItemName>{item.name}</ItemName>
                    <ItemQty>Qty: {item.quantity}</ItemQty>
                  </div>
                </ItemInfo>
                <PriceText>
                  {formatCurrency(item.price * item.quantity)}
                </PriceText>
              </ItemRow>
            ))}
          </ItemsGrid>
        </Section>

        <Divider />

        <Section>
          <SectionLabel>Shipping To</SectionLabel>
          <AddressBlock>
            <p className="primary">{shippingAddress.fullName}</p>
            <p>{shippingAddress.address}</p>
            <p>{shippingAddress.city}</p>
            <p>{shippingAddress.country}</p>
          </AddressBlock>
        </Section>

        <Divider />

        <TotalsSection>
          <TotalRow>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </TotalRow>
          <TotalRow>
            <span>Shipping</span>
            <span>{formatCurrency(shipping)}</span>
          </TotalRow>
          <GrandTotalRow>
            <span>TOTAL PAID</span>
            <span>{formatCurrency(total)}</span>
          </GrandTotalRow>
        </TotalsSection>

        <EmailNotice>
          <p>A confirmation has been sent to {shippingAddress.email}</p>
        </EmailNotice>
      </OrderCard>

      <Footer>
        <StyledButton onClick={() => navigate('/')}>
          RETURN TO STORE
        </StyledButton>
      </Footer>
    </Container>
  );
}

export default OrderReceipt;
