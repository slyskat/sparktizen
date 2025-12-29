import styled from 'styled-components';
import Header from '../components/Header';
import ProductDisplay from '../components/ProductDisplay';
import Footer from '../components/Footer';
import { useDrop } from '../contexts/DropContext';

const StyledContainer = styled.div`
  position: relative;
`;

function Landing() {
  const { isUnlocked } = useDrop();
  return (
    <StyledContainer>
      <Header />
      <ProductDisplay />
      {!isUnlocked && <Footer />}
    </StyledContainer>
  );
}

export default Landing;
