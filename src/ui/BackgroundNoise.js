import styled from 'styled-components';
import { grain } from '../styles/Animations';

export const BackgroundNoise = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: transparent
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
    repeat;
  opacity: var(--grain-opacity);
  pointer-events: none;
  animation: ${grain} 8s steps(10) infinite;
  z-index: 50;
`;
