import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { capitalize } from '../helpers';
import { getNumProducts } from '../lib/firebase/firebase';
import { ProductPreviewType } from '../Types';
import Overlay from './Overlay';
import ProductPreview from './ProductPreview';
import ViewNowBtn from './ViewNowBtn';

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.2fr;
  gap: 3rem;
  padding: 6rem 0;

  &:not(:last-of-type) {
    border-bottom: 2px solid #ebebeb;
  }
`;

const LeftSide = styled.div``;

const Name = styled.p`
  font-size: 3.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #202600;
`;

const Description = styled.p`
  font-size: 2rem;
  line-height: 1.35;
  margin-bottom: 4rem;
  color: #828282;
`;

const ProductGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
`;

const PaginationButton = styled.button<{ isLeft?: boolean }>`
  position: absolute;
  top: 17.5rem;
  ${({ isLeft }) => (isLeft ? 'left: 0;' : 'right: 0;')}
  padding: 2.5rem .8rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  transform: translateY(-50%);
  transition: background 0.2s;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const ChevronIcon = styled.svg<{ isLeft?: boolean }>`
  width: 2rem;
  height: 2rem;
  fill: #fff;
  ${({ isLeft }) => isLeft && 'transform: rotate(180deg);'};
`;

interface Props {
  name: string;
  description: string;
  products: ProductPreviewType[];
}

const FeaturedCategory: FC<Props> = ({ name, description, products }) => {
  // State
  const [currentProducts, setCurrentProducts] = useState(products);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Root>
      {/* Left side */}
      <LeftSide>
        {/* Name */}
        <Name>{capitalize(name)}</Name>

        {/* Description */}
        <Description>{description}</Description>

        {/* View now button */}
        <ViewNowBtn href={`/${name.toLowerCase()}`}>Shop Now</ViewNowBtn>
      </LeftSide>

      {/* Products grid */}
      <ProductGrid>
        {/* Left button */}
        {currentPage > 1 && (
          <PaginationButton
            disabled={isLoading}
            isLeft={true}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronIcon isLeft={true}>
              <use href="chevron-right.svg#icon" />
            </ChevronIcon>
          </PaginationButton>
        )}

        {/* Product previews */}
        {currentProducts
          .slice((currentPage - 1) * 3, currentPage * 3)
          .map(
            ({
              id,
              name,
              category,
              image,
              price,
              oldPrice,
              thumbnail,
              createdAt,
            }) => (
              <ProductPreview
                key={id}
                id={id}
                name={name}
                category={category}
                image={image}
                price={price}
                oldPrice={oldPrice}
                thumbnail={thumbnail}
                createdAt={createdAt}
              />
            )
          )}

        {/* Right button */}
        {currentPage < maxPage && (
          <PaginationButton
            disabled={isLoading}
            onClick={async () => {
              try {
                if (currentProducts.length - currentPage * 3 > 0)
                  return setCurrentPage(currentPage + 1);

                setIsLoading(true);

                // Fetch next 3 products
                const [products, lastDoc] = await getNumProducts(
                  name,
                  lastVisible,
                  3
                );

                const [latestProducts, latestDoc] =
                  currentPage <= 1
                    ? await getNumProducts(name, lastDoc, 3)
                    : [products, lastDoc];

                if (latestProducts.length < 3) setMaxPage(currentPage + 1);

                setLastVisible(latestDoc);
                setCurrentProducts([...currentProducts, ...latestProducts]);
                setIsLoading(false);
                setCurrentPage(currentPage + 1);
              } catch (_) {
                setIsLoading(false);
              }
            }}
          >
            <ChevronIcon>
              <use href="chevron-right.svg#icon" />
            </ChevronIcon>
          </PaginationButton>
        )}

        <Overlay isLoading={isLoading} scale={1.7} />
      </ProductGrid>
    </Root>
  );
};

export default FeaturedCategory;
