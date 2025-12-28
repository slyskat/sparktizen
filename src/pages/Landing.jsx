import styled from 'styled-components';
import Header from '../components/Header';
import ProductDisplay from '../components/ProductDisplay';
import Footer from '../components/Footer';

const StyledContainer = styled.div`
  position: relative;
`;

function Landing() {
  return (
    <StyledContainer>
      <Header />
      <ProductDisplay />
      <Footer />
    </StyledContainer>
  );
}

export default Landing;
