import styled from 'styled-components';
import { useDrop } from '../contexts/DropContext';
import SessionTimer from './SessionTimer';
import CartBag from '../ui/CartBag';

const NAV = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  background: hsl(var(--bg-background));
  opacity: 0.8;
  --webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid hsl(var(--border));
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding-left: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
`;

const Logo = styled.a`
  font-family: 'Anton', sans-serif;
  color: hsl(var(--text-primary));
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const TimerContainer = styled.div`
  display: hidden;

  @media (min-width: 748px) {
    display: block;
  }
`;

function NavBar() {
  const { isUnlocked } = useDrop();
  return (
    <NAV>
      <Container>
        <FlexContainer>
          <Logo href="/">SPARKTIZEN</Logo>

          {isUnlocked && (
            <RightSection>
              <TimerContainer>
                <SessionTimer />
              </TimerContainer>
              <CartBag />
            </RightSection>
          )}
        </FlexContainer>
      </Container>
    </NAV>
  );
}

export default NavBar;
