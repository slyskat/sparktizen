import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { getProducts } from '../services/apiProducts';
import ProductCard from './ProductCard';
import { useDrop } from '../contexts/DropContext';

const StyledSection = styled.section`
  width: 100%;
  padding: 2rem 1rem;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  max-width: 80rem;
  margin: 0 auto;

  @media (min-width: 640px) {
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// const products = [
//   {
//     id: 1,
//     name: 'TACTICAL VEST',
//     price: 320,
//     image: '/placeholder.svg',
//     status: 'AVAILABLE',
//   },
//   {
//     id: 2,
//     name: 'GRAPHIC JERSEY',
//     price: 180,
//     image: '/placeholder.svg',
//     status: 'AVAILABLE',
//   },
//   {
//     id: 3,
//     name: 'CARGO PANTS',
//     price: 240,
//     image: '/placeholder.svg',
//     status: 'AVAILABLE',
//   },
//   {
//     id: 4,
//     name: 'UTILITY HOODIE',
//     price: 280,
//     image: '/placeholder.svg',
//     status: 'AVAILABLE',
//   },
// ];

function ProductDisplay() {
  const { isUnlocked } = useDrop();
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const displayedProducts = isUnlocked ? products : products?.slice(0, 4);

  return (
    <StyledSection>
      <GridContainer>
        {displayedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </GridContainer>
    </StyledSection>
  );
}

export default ProductDisplay;
