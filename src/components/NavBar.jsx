import styled from 'styled-components';

const NAV = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  background: var(--background);
  opacity: 0.8;
  --webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid var(--border);
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
  color: var(--foreground);
`;

function NavBar() {
  return (
    <NAV>
      <Container>
        <FlexContainer>
          <Logo href="/">SPARKTIZEN</Logo>
        </FlexContainer>
      </Container>
    </NAV>
  );
}

export default NavBar;
