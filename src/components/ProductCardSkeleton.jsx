import styled from 'styled-components';
import { pulse } from '../styles/Animations';

const Skeleton = styled.div`
  background-color: hsl(0 0 11%);
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const CardSkeleton = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  background-color: hsl(var(--bg-secondary));
`;

const ImageSkeleton = styled(Skeleton)`
  position: absolute;
  inset: 0;
`;

const InfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0.75rem;
  background: linear-gradient(
    to top,
    hsl(var(--bg-primary) / 0.8),
    transparent
  );
`;

const NameSkeleton = styled(Skeleton)`
  height: 0.75rem;
  width: 6rem;
  margin-bottom: 0.5rem;
`;

const PriceSkeleton = styled(Skeleton)`
  height: 1rem;
  width: 4rem;
`;

export function ProductCardSkeleton() {
  return (
    <CardSkeleton>
      <ImageSkeleton>
        <InfoContainer>
          <NameSkeleton />
          <PriceSkeleton />
        </InfoContainer>
      </ImageSkeleton>
    </CardSkeleton>
  );
}

export default ProductCardSkeleton;
