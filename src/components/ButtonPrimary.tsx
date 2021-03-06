import Link from 'next/link';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const position = css`
  position: relative;
`;

const Root = styled.div`
  text-align: center;
  ${position}
`;

const Line = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  width: 100%;
  background: #ebebeb;
  transform: translateY(-50%);
`;

const bgWhite = css`
  background: #fff;
`;

const InnerContainer = styled.div`
  ${position}
  display: inline-block;
  padding: 0 3rem;
  ${bgWhite}
`;

const buttonStyles = css`
  font-size: 1.7rem;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  padding: 1.3rem 3rem;
  color: #383838;
  ${bgWhite}
  border: 1px solid var(--accent-color);
  transition: background 0.2s;

  &:hover {
    background: var(--accent-color);
  }
`;

const LinkButton = styled.a`
  ${buttonStyles}
`;

const Button = styled.button`
  ${buttonStyles}
`;

interface Props {
  type: 'link' | 'button';
  href?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const ButtonPrimary: FC<Props> = ({
  type,
  href,
  isDisabled,
  onClick,
  children,
}) => (
  <Root>
    <Line />

    <InnerContainer>
      {type === 'link' ? (
        <Link href={href!} passHref>
          <LinkButton>{children}</LinkButton>
        </Link>
      ) : (
        <Button disabled={isDisabled} onClick={onClick}>
          {children}
        </Button>
      )}
    </InnerContainer>
  </Root>
);

export default ButtonPrimary;
