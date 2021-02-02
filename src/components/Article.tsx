import styled from 'styled-components';

export const Article = styled.article`
  width: 100%;
  max-width: var(--article-width);
  padding: var(--page-padding);

  @media (max-width: 60rem) {
    padding: 0;
    padding-bottom: max(
      calc(var(--page-padding) * 2),
      calc(var(--navbar-height) + var(--page-padding))
    );
  }
`;
