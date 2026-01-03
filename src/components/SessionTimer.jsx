import styled, { css } from 'styled-components';
import { useDrop } from '../contexts/DropContext';
import { formatTime } from '../utils/helpers';

const StyledDiv = styled.div`
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  line-height: 1.25rem;

  ${(props) =>
    props.$isExpired &&
    css`
      color: hsl(var(--warning));
      text-decoration: line-through;
    `}

  ${(props) => {
    if (props.$isWarning) {
      return css`
        color: hsl(var(--warning));
      `;
    } else {
      return css`
        color: hsl(var(--text-primary));
      `;
    }
  }}
`;

function SessionTimer() {
  const { timeLeft, isExpired, isWarning } = useDrop();

  return (
    <StyledDiv $isExpired={isExpired} $isWarning={isWarning}>
      {isExpired ? 'SESSION EXPIRED' : formatTime(timeLeft)}
    </StyledDiv>
  );
}

export default SessionTimer;
