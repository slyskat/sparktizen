import styled from 'styled-components';
import { BackgroundNoise } from '../ui/BackgroundNoise';
import { dotPulse } from '../styles/Animations';

import { useState, useEffect } from 'react';

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: hsl(var(--bg-background));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  font-size: 1rem;
  letter-spacing: 0.05em;
`;

const LoadingMessageContainer = styled.div`
  height: 2rem;
  overflow: hidden;
`;

const LoadingMessage = styled.p`
  font-size: 2rem;
  letter-spacing: 0.05em;
  color: hsl(var(--text-secondary));
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const InitialDot = styled.span`
  width: 20px;
  height: 20px;
  background-color: hsl(var(--bg-primary) / 0.3);
  border-radius: 9999px;
  animation: ${dotPulse} 1.4s ease-in-out;
`;

const FirstDot = styled(InitialDot)`
  animation-delay: 0ms;
`;

const SecondDot = styled(InitialDot)`
  animation-delay: 150ms;
`;

const ThirdDot = styled(InitialDot)`
  animation-delay: 300ms;
`;

function CheckoutLoader() {
  return (
    <Container>
      <BackgroundNoise />

      <Logo>SPARKTIZEN</Logo>

      <LoadingMessageContainer>
        <LoadingMessage>REDIRECTING...</LoadingMessage>
      </LoadingMessageContainer>

      <LoadingDots>
        <FirstDot />
        <SecondDot />
        <ThirdDot />
      </LoadingDots>
    </Container>
  );
}

export default CheckoutLoader;
