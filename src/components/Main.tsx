import styled from 'styled-components';

export const Main: React.FC = (props) => {
  let navbarHeight = 110;
  if (typeof document !== 'undefined') {
    const header = document.body.querySelector('header');
    if (header) {
      navbarHeight = header.offsetHeight;
    }
  }

  return (
    <StyledMain
      {...props}
      style={
        {
          '--navbar-height': `${navbarHeight}px`,
        } as React.CSSProperties
      }
    />
  );
};

const StyledMain = styled.main`
  padding: var(--page-padding);
  overflow: auto;
  height: 100%;
`;
