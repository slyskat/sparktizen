import { keyframes } from 'styled-components';

export const lockPulse = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.4;
  }`;

export const textFlicker = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  93% {
    opacity: 0.8;
  }
  94% {
    opacity: 1;
  }
  95% {
    opacity: 0.9;
  }
  96% {
    opacity: 1;
  }
`;

export const grain = keyframes`
  0%,
  100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -10%);
  }
  20% {
    transform: translate(-15%, 5%);
  }
  30% {
    transform: translate(7%, -25%);
  }
  40% {
    transform: translate(-5%, 25%);
  }
  50% {
    transform: translate(-15%, 10%);
  }
  60% {
    transform: translate(15%, 0%);
  }
  70% {
    transform: translate(0%, 15%);
  }
  80% {
    transform: translate(3%, 35%);
  }
  90% {
    transform: translate(-10%, 10%);
  }`;

export const shake = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-6px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(6px);
  }
`;
