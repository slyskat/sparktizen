import styled, { css } from 'styled-components';

export const FieldStyles = css`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid hsl(var(--border));
  padding: 0.75rem 0;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--text-primary));
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom: 1px solid hsl(var(--text-primary));
  }

  &::placeholder {
    color: hsl(var(--text-secondary) / 0.5);
  }
`;

export const CheckoutInput = styled.input`
  ${FieldStyles}
`;

export const CheckoutSelect = styled.select`
  ${FieldStyles}
  cursor: pointer;

  option {
    background-color: hsl(0 0% 3%);
  }
`;
