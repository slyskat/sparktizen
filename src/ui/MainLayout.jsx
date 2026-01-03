import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import NavBar from '../components/NavBar';
import { grain } from '../styles/Animations';
import CartModal from '../components/CartModal';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: hsl(var(--bg-primary));
`;

const BGNoise = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: transparent
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
    repeat;
  opacity: var(--grain-opacity);
  pointer-events: none;
  animation: ${grain} 8s steps(10) infinite;
  z-index: 50;
`;

const Main = styled.main`
  position: relative;
  z-index: 10;
  padding-top: 3.5rem;
  overflow: hidden;
`;

function MainLayout() {
  return (
    <Container>
      <BGNoise />
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      <CartModal />
    </Container>
  );
}

export default MainLayout;
