import styled from 'styled-components';

type MainTitleProps = {
  title: string;
  subtitle: string;
  frontPage?: boolean;
};

export const MainTitle: React.FC<MainTitleProps> = ({ title, subtitle, frontPage, ...rest }) => (
  <TitleWrapper as={frontPage ? 'h1' : 'h2'} {...rest}>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </TitleWrapper>
);

const TitleWrapper = styled.h1`
  font-weight: 200;
  font-size: 1rem;

  --spacing: 1rem;
`;

const Title = styled.span`
  display: inline-block;

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
