import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import NavBar from '../components/NavBar';
import CartModal from '../components/CartModal';
import { useCart } from '../contexts/CartContext';
import { BackgroundNoise } from './BackgroundNoise';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: hsl(var(--bg-primary));
`;

const Main = styled.main`
  position: relative;
  z-index: 10;
  padding-top: 3.5rem;
  overflow: hidden;
`;

function MainLayout() {
  const { isCartOpen } = useCart();
  return (
    <Container>
      <BackgroundNoise />
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      {isCartOpen && <CartModal />}
    </Container>
  );
}

export default MainLayout;
