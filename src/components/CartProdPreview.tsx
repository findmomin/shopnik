import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';
import { formatPrice } from '../helpers';
import { CartItem } from '../Types';

const Root = styled.div``;

const ImageContainer = styled.div``;

const Details = styled.div``;

const Name = styled.p``;

const Price = styled.p``;

const Buttons = styled.div``;

const QuantityButtons = styled.div``;

const Button = styled.button``;

const Icon = styled.svg``;

const DeleteBtn = styled.button``;

const DeleteIcon = styled.svg``;

const CartProdPreview: FC<CartItem> = ({ name, image, price, quantity }) => {
  return (
    <Root>
      {/* Product image */}
      <ImageContainer>
        <Link href="/test/test">
          <Image src={image} alt={name} width={200} height={200} />
        </Link>
      </ImageContainer>

      {/* Details */}
      <Details>
        <Link href="/test/test">
          {/* Name */}
          <Name>{name}</Name>

          {/* Price */}
          <Price>{formatPrice(price)}</Price>
        </Link>

        {/* Buttons */}
        <Buttons>
          {/* Quantity increase decrease buttons */}
          <QuantityButtons>
            {/* Minus button */}
            <Button>
              <Icon>
                <use href="" />
              </Icon>
            </Button>

            {/* Quantity */}
            {quantity}

            {/* Plus button */}
            <Button>
              <Icon>
                <use href="" />
              </Icon>
            </Button>
          </QuantityButtons>

          {/* Delete button */}
          <DeleteBtn>
            <DeleteIcon>
              <use href="" />
            </DeleteIcon>
          </DeleteBtn>
        </Buttons>
      </Details>
    </Root>
  );
};

export default CartProdPreview;
