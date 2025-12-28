import styled, { css } from 'styled-components';
import { Lock } from 'lucide-react';
import { lockPulse, textFlicker } from '../styles/Animations';

import { useDrop } from '../contexts/DropContext';
import { Subtitle } from '../ui/Subtitle';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  position: relative;
`;

const LockContainer = styled.div`
  margin-bottom: 1rem;
  transition: opacity 0.5s ease;
  color: var(--foreground);
  opacity: ${(props) => (props.$isUnlocked ? 0 : 0.5)};
  animation: ${(props) =>
    !props.$isUnlocked &&
    css`
      ${lockPulse} 2s infinite
    `};
`;

const Title = styled.h1`
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 15vw, 12rem);
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: var(--foreground);
  text-align: center;
  animation: ${textFlicker} 5s ease-in-out infinite;
`;

function Header() {
  const { isUnlocked } = useDrop();
  return (
    <StyledHeader>
      <LockContainer $isUnlocked={isUnlocked}>
        <Lock size={24} strokeWidth={1.5} />
      </LockContainer>
      <Title>SPARKTIZEN</Title>
      <Subtitle>
        {isUnlocked
          ? 'SESSION ACTIVE // DROP UNLOCKED // SS25'
          : 'GLOBAL DROP // RESTRICTED ACCESS // SS25'}
      </Subtitle>
    </StyledHeader>
  );
}

export default Header;
