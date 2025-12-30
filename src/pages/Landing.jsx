import styled from 'styled-components';
import Header from '../components/Header';
import ProductDisplay from '../components/ProductDisplay';

import { useDrop } from '../contexts/DropContext';
import { CopyrightText } from '../ui/CopyrightText';
import Footer from '../components/Footer';

const StyledContainer = styled.div`
  position: relative;
`;

const StyledFooter = styled.footer`
  width: 100%;
  padding: 2rem 1rem;
  text-align: center;
`;

function Landing() {
  const { isUnlocked } = useDrop();
  return (
    <StyledContainer>
      <Header />
      <ProductDisplay />
      {!isUnlocked && <Footer />}
      {isUnlocked && (
        <StyledFooter>
          <CopyrightText>© 2025 SPARTIZEN. ALL RIGHTS RESERVED.</CopyrightText>
        </StyledFooter>
      )}
    </StyledContainer>
  );
}

export default Landing;
