import Image from 'next/image';
import Link from 'next/link';
import { FC, useContext } from 'react';
import styled, { css } from 'styled-components';
import {
  CartContext,
  CartItemsContext,
  CartItemsSetter,
} from '../contexts/Cart';
import { camelCaseToNormal, formatPrice } from '../helpers';
import { ProductPreviewType } from '../Types';

const position = css`
  position: relative;
`;

const transition = css`
  transition: transform 0.2s;
`;

const Root = styled.a`
  ${position}
  text-align: left;
  max-width: 27rem;

  img {
    ${transition}
  }

  &:hover button {
    transform: translate(-50%, 0);
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

const fontWeight = css`
  font-weight: 500;
`;

const textStyles = css`
  text-transform: uppercase;
  ${fontWeight}
`;

const fontSize = css`
  font-size: 1.6rem;
`;

const positionAbs = css`
  position: absolute;
`;

const Status = styled.div<{ status: 'new' | 'sale' }>`
  ${fontSize}
  ${textStyles}
  ${positionAbs}
  top: 0;
  right: 2rem;
  padding: 0.4rem 1.5rem;
  color: #fff;
  background: ${({ status }) =>
    status === 'new' ? '#6bb75d' : status === 'sale' ? '#e04243' : 'initial'};
  transform: translateY(-50%);
`;

const ImageContainer = styled.div`
  ${position}
  margin-bottom: 2.5rem;
  border: 1px solid #f7f7f7;
  overflow: hidden;
`;

const letterSpacing = css`
  letter-spacing: 1px;
`;

const Button = styled.button`
  ${textStyles}
  font-size: 1.4rem;
  text-align: center;
  ${letterSpacing}
  line-height: 1;
  ${positionAbs}
  bottom: 0;
  left: 50%;
  width: 100%;
  padding: 1rem 3px;
  color: #262626;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 5px solid var(--accent-color);
  transform: translate(-50%, 110%);
  ${transition}

  &:not(:last-of-type) {
    border-right: 2px solid #ebebeb;
  }
`;

const Name = styled.h3`
  font-size: 2.2rem;
  font-weight: 300;
  line-height: 1.3;
  ${letterSpacing}
  margin-bottom: 1.5rem;
  color: #4d4c4c;
`;

const Prices = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  gap: 1.5rem;

  @media only screen and (max-width: 22.5em) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const Price = styled.span<{ isDiscounted?: boolean }>`
  ${fontSize}
  ${fontWeight}
  text-decoration: ${({ isDiscounted }) =>
    isDiscounted ? 'line-through' : 'none'};
  color: ${({ isDiscounted }) => (isDiscounted ? '#bbbaba' : '#252525')};
`;

const ProductPreview: FC<ProductPreviewType> = ({
  id,
  name,
  category,
  image,
  price,
  priceId,
  oldPrice,
  thumbnail,
  createdAt: { seconds },
}) => {
  // Consuming context
  const cartItems = useContext(CartItemsContext);
  const setCartItems = useContext(CartItemsSetter);
  const { setIsCartOpen, hasCartOpened, setHasCartOpened } =
    useContext(CartContext);

  const kebabCasedCategory = camelCaseToNormal(category, '-', false);
  const status = oldPrice
    ? 'sale'
    : Date.now() - seconds * 1000 <= 604800000
    ? 'new'
    : null;

  return (
    <Link href={`/${kebabCasedCategory}/${id}`} passHref>
      <Root>
        {/* Image container */}
        <ImageContainer>
          {/* Product image */}
          <Image
            src={`/products/${image}`}
            alt={name}
            width={270}
            height={350}
          />

          {/* Add to cart and favorite button */}
          {/* Add to cart button */}
          <Button
            onClick={e => {
              e.preventDefault();

              const newCartItems = [...cartItems];
              const existingProduct = newCartItems.find(
                ({ id: prodId }) => prodId === id
              );

              if (!hasCartOpened) setIsCartOpen(true), setHasCartOpened(true);
              if (existingProduct && existingProduct.quantity >= 100) return;

              if (existingProduct) {
                existingProduct.quantity++;
                return setCartItems(newCartItems);
              }

              setCartItems([
                ...cartItems,
                {
                  id,
                  name,
                  category: kebabCasedCategory,
                  price,
                  priceId,
                  thumbnail,
                  quantity: 1,
                },
              ]);
            }}
          >
            Add To Cart
          </Button>
        </ImageContainer>

        {/* Product status */}
        {status && <Status status={status}>{status}</Status>}

        {/* Product name */}
        <Name>{name}</Name>

        {/* Product price & discounted price */}
        <Prices>
          {/* Current price */}
          <Price>{formatPrice(price)}</Price>

          {/* Discounted price */}
          {oldPrice && (
            <Price isDiscounted={true}>{formatPrice(oldPrice)}</Price>
          )}
        </Prices>
      </Root>
    </Link>
  );
};

export default ProductPreview;
