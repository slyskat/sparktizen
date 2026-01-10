import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem;
  border: 1px solid hsl(var(--border));

  &:hover {
    background-color: hsl(var(--bg-secondary));
  }
`;

function QuantityButton({ children, onClick, label }) {
  return (
    <StyledButton onClick={onClick} aria-label={label}>
      {children}
    </StyledButton>
  );
}

export default QuantityButton;
