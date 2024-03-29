import Link from 'next/link';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { prefixWithSlash } from 'utils';

type MainTitleProps = {
  title: string;
  subtitle: string;
  link: string;
  frontPage?: boolean;
};

export const MainTitle = forwardRef<HTMLHeadingElement, MainTitleProps>(
  ({ title, subtitle, frontPage, link, ...rest }, ref) => (
    <TitleWrapper as={frontPage ? 'h1' : 'h2'} {...rest} ref={ref}>
      <Link href={prefixWithSlash(link)} passHref>
        <Title>{title}</Title>
      </Link>
      <Subtitle>{subtitle}</Subtitle>
    </TitleWrapper>
  )
);

const TitleWrapper = styled.h1`
  font-weight: 200;
  font-size: 1rem;

  --spacing: 1rem;
`;

const Title = styled.a`
  display: inline-block;
  text-decoration: none;

  font-size: 4em;
  line-height: 1em;
  color: var(--black);

  &:after {
    content: '';
    width: 1em;
    height: 1px;
    display: block;
    margin-top: var(--spacing);
    border-bottom: 1px solid currentColor;
  }
`;

const Subtitle = styled.span`
  display: inline-block;
  margin-top: var(--spacing);

  font-size: 1.5em;
  line-height: 1em;
  color: var(--gray);
`;
