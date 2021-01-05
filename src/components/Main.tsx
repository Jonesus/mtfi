import styled from 'styled-components';

export const Main = styled.main`
  padding: var(--page-padding);
  overflow: auto;
  height: 100vh;

  @media (max-width: 60rem) {
    margin-bottom: 6rem;
  }
`;
