import styled, { css } from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { useDrop } from '../contexts/DropContext';
import SessionTimer from '../components/SessionTimer';
import { CheckoutInput, CheckoutSelect } from '../ui/checkoutInput';
import { formatCurrency } from '../utils/helpers';
import { useEffect, useReducer, useRef, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import supabase from '../services/supabase';
import toast from 'react-hot-toast';
import { toastStyle } from '../utils/toastStyle';
import CheckoutLoader from '../components/CheckoutLoader';

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
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  width: 100%;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: hsl(var(--text-secondary));
  transition: color 0.3s ease;
  margin-bottom: 2rem;
  background: none;
  outline: none;
  border: none;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.3s ease-out;
  font-size: 1rem;

  &:hover {
    color: hsl(var(--text-primary));
  }
`;

const BackButtonText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SessionTimerContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  ${(props) => {
    if (props.$isExpired) {
      return css`
        border: 1px solid hsl(var(--warning));
        background-color: hsl(var(--warning) / 0.1);
      `;
    } else {
      return css`
        border: 1px solid hsl(var(--warning) / 0.5);
        background-color: hsl(var(--warning) / 0.05);
      `;
    }
  }}
`;

const ExpiredText = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: hsl(var(--warning));
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 748px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionHeader = styled.h2`
  font-family: var(--font-logo);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LocationData = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;

const MobileButton = styled.button`
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
  font-size: 1rem;
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const RightColumn = styled.div`
  height: auto;
  @media (min-width: 1024px) {
    position: sticky;
    top: 5rem;
  }
`;

const SummaryCard = styled.div`
  border: 1px solid hsl(var(--border));
  background-color: hsl(0 0% 3%);
  padding: 1.5rem;
`;

const SummaryCardHeader = styled.h2`
  font-family: var(--font-logo);
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const OrderItemsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 64rem;
  overflow-y: auto;
`;

const OrderItemsCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  width: 4rem;
  height: 5rem;
  background-color: hsl(var(--bg-secondary));
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OrderItemsDetails = styled.div`
  flex: 1;
`;

const OrderItemName = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
`;

const OrderItemPrice = styled.p`
  font-size: 0.85rem;
  color: hsl(var(--text-secondary));
`;

const OrderItemAmount = styled.p`
  font-size: 0.85rem;
`;

const Total = styled.div`
  border-top: 1px solid hsl(var(--border));
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const BillingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const BillingHeader = styled.span`
  color: hsl(var(--text-secondary));
  text-transform: uppercase;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-logo);
  font-size: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid hsl(var(--border));
`;

const PayButton = styled.button`
  background-color: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.3s ease-out;
  font-size: 1rem;
  width: 100%;
  font-size: 1rem;
  margin-top: 1.5rem;
  padding: 1rem 0;
  display: hidden;

  @media (min-width: 1024px) {
    display: block;
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

const PHASES = {
  FILLING_DETAILS: 'FILLING_DETAILS',
  PAYING: 'PAYING',
  SAVING_ORDER: 'SAVING_ORDER',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

const initialState = {
  phase: PHASES.FILLING_DETAILS,
  error: null,
};

// PHASES =

//

function reducer(state, event) {
  switch (state.phase) {
    case PHASES.FILLING_DETAILS:
      if (event.type === 'START_PAYMENT') {
        return { ...state, phase: PHASES.PAYING };
      }
      return state;

    case PHASES.PAYING:
      if (event.type === 'PAYMENT_SUCCESS') {
        return { ...state, phase: PHASES.SAVING_ORDER };
      }
      if (event.type === 'PAYMENT_FAILED') {
        return { ...state, phase: PHASES.FAILED, error: event.error };
      }
      if (event.type === 'PAYMENT_CANCELLED') {
        return { ...state, phase: PHASES.FILLING_DETAILS };
      }
      return state;

    case PHASES.SAVING_ORDER:
      if (event.type === 'ORDER_SAVED') {
        return { ...state, phase: PHASES.COMPLETED };
      }
      if (event.type === 'ORDER_SAVE_FAILED') {
        return { ...state, phase: PHASES.FAILED, error: event.error };
      }
      return state;

    case PHASES.FAILED:
      return state;

    default:
      return state;
  }
}

function Checkout() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cart, subtotal, clearCart } = useCart();
  const cartSnapshot = useRef(null);
  const navigate = useNavigate();
  const { isWarning, isExpired } = useDrop();
  const shippingFee = 1500;
  const total = subtotal + shippingFee;
  const totalInKobo = total * 100;

  const [reference] = useState(() => new Date().getTime().toString());

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    country: 'NG',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.address &&
    formData.phone &&
    formData.city &&
    formData.country;

  const config = {
    reference: reference,
    email: formData.email,
    amount: totalInKobo,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLICKEY,
  };

  const initializePayment = usePaystackPayment(config);

  function handlePayClick() {
    if (!isFormValid) return;
    dispatch({ type: 'START_PAYMENT' });
  }

  const hasPaymentBeingInitialized = useRef(false);

  useEffect(
    function () {
      if (state.phase !== PHASES.PAYING) return;

      if (hasPaymentBeingInitialized.current === true) return;
      initializePayment({
        onSuccess() {
          dispatch({ type: 'PAYMENT_SUCCESS' });
        },
        onClose() {
          dispatch({ type: 'PAYMENT_CANCELLED' });
        },
      });

      hasPaymentBeingInitialized.current = true;
    },
    [state.phase, initializePayment]
  );

  useEffect(
    function () {
      if (state.phase !== PHASES.SAVING_ORDER) return;

      async function saveOrder() {
        try {
          const { error } = await supabase.from('orders').insert([
            {
              customer_name: formData.fullName,
              customer_email: formData.email,
              customer_phone: formData.phone,
              customer_address: formData.address,
              cart,
              amount: totalInKobo,
              payment_reference: reference,
              status: 'paid',
            },
          ]);

          if (error) throw error;

          dispatch({ type: 'ORDER_SAVED' });
        } catch (err) {
          dispatch({ type: 'ORDER_SAVE_FAILED', error: err.message });
        }
      }

      saveOrder();
    },
    [state.phase, cart, formData, totalInKobo, reference]
  );

  useEffect(
    function () {
      if (state.phase !== PHASES.COMPLETED) return;

      cartSnapshot.current = cart;

      console.log(cartSnapshot.current);

      setTimeout(() => {
        navigate(`/order/${reference}`, {
          state: {
            cart: cartSnapshot.current,
            subtotal,
            shipping: shippingFee,
            total,
            shippingAddress: {
              fullName: formData.fullName,
              email: formData.email,
              address: formData.address,
              city: formData.city,
              country: formData.country,
            },
          },
        });
      }, 500);
    },
    [
      state.phase,
      clearCart,
      cart,
      formData,
      navigate,
      reference,
      subtotal,
      total,
    ]
  );

  useEffect(function () {
    if (state.phase !== PHASES.FAILED) return;

    toast.error(state.error || 'Something went wrong', toastStyle);
  });

  const systemIsBusy =
    state.phase === PHASES.PAYING || state.phase === PHASES.SAVING_ORDER;

  if (state.phase === PHASES.COMPLETED) return <CheckoutLoader />;

  if (cart.length === 0)
    return (
      <EmptyState>
        <EmptyStateText>Your cart is empty</EmptyStateText>
        <EmptyStateButton onClick={() => navigate('/')}>
          RETURN TO STORE
        </EmptyStateButton>
      </EmptyState>
    );

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        <ArrowLeft size={16} />
        <BackButtonText>Back to Store</BackButtonText>
      </BackButton>

      {(isWarning || isExpired) && (
        <SessionTimerContainer>
          <ExpiredText>
            {isExpired ? 'Session Expired' : 'Hurry! Session expires in'}
          </ExpiredText>
          {!isExpired && <SessionTimer />}
        </SessionTimerContainer>
      )}

      <LayoutGrid>
        <LeftColumn>
          <CheckoutForm>
            <section>
              <SectionHeader>
                <Lock size={16} strokeWidth={1.5} />
                SHIPPING DETAILS
              </SectionHeader>

              <SectionFormContainer>
                <CheckoutInput
                  type="text"
                  name="fullName"
                  placeholder="FULL NAME"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={systemIsBusy}
                />
                <CheckoutInput
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={systemIsBusy}
                />
                <CheckoutInput
                  type="text"
                  name="address"
                  placeholder="ADDRESS"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={systemIsBusy}
                />
                <CheckoutInput
                  type="tel"
                  name="phone"
                  placeholder="PHONE NUMBER"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={systemIsBusy}
                />

                <LocationData>
                  <CheckoutInput
                    type="text"
                    name="city"
                    placeholder="CITY"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={systemIsBusy}
                  />
                </LocationData>
                <CheckoutSelect
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={systemIsBusy}
                >
                  <option value="">SELECT COUNTRY</option>
                  <option value="NG">NIGERIA</option>
                  <option value="GH" disabled>
                    GHANA (COMING SOON)
                  </option>
                  <option value="UK" disabled>
                    UNITED KINGDOM (COMING SOON)
                  </option>
                  <option value="US" disabled>
                    UNITED STATES (COMING SOON)
                  </option>
                </CheckoutSelect>
              </SectionFormContainer>
            </section>

            <MobileButton
              onClick={handlePayClick}
              disabled={!isFormValid || systemIsBusy}
              type="button"
            >
              PAY NOW
            </MobileButton>
          </CheckoutForm>
        </LeftColumn>

        <RightColumn>
          <SummaryCard>
            <SummaryCardHeader>ORDER SUMMARY</SummaryCardHeader>

            <OrderItemsDisplay>
              {cart.map((item) => (
                <OrderItemsCard key={item.id}>
                  <ImageContainer>
                    <Image src={item.image} alt={item.name} />
                  </ImageContainer>
                  <OrderItemsDetails>
                    <OrderItemName>{item.name}</OrderItemName>
                    <OrderItemPrice>
                      {formatCurrency(item.price)} x {item.quantity}
                    </OrderItemPrice>
                  </OrderItemsDetails>
                  <OrderItemAmount>
                    {formatCurrency(item.price * item.quantity)}
                  </OrderItemAmount>
                </OrderItemsCard>
              ))}
            </OrderItemsDisplay>

            <Total>
              <BillingContainer>
                <BillingHeader>Subtotal</BillingHeader>
                <span>{formatCurrency(subtotal)}</span>
              </BillingContainer>
              <BillingContainer>
                <BillingHeader>SHIPPING</BillingHeader>
                <span>{formatCurrency(shippingFee)}</span>
              </BillingContainer>
              <TotalContainer>
                <span>TOTAL</span>
                <span>{formatCurrency(total)}</span>
              </TotalContainer>
            </Total>

            <PayButton
              onClick={handlePayClick}
              type="button"
              disabled={!isFormValid || systemIsBusy}
              $isDisabled={!isFormValid || systemIsBusy}
            >
              {state.phase === PHASES.PAYING
                ? 'PAYING...'
                : state.phase === PHASES.SAVING_ORDER
                  ? 'SAVING...'
                  : 'PAY NOW'}
            </PayButton>
          </SummaryCard>
        </RightColumn>
      </LayoutGrid>
    </Container>
  );
}

export default Checkout;
