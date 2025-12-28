import styled from 'styled-components';

export const Subtitle = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--muted-foreground);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  opacity: 0.6;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;
