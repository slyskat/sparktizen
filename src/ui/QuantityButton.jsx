import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem;
  border: 1px solid hsl(var(--border));

  &:hover {
    background-color: hsl(var(--bg-secondary));
  }
`;

function QuantityButton({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default QuantityButton;
