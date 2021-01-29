import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const Main: React.FC = (props) => {
  const navbarHeight = useRef(110);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const header = document.body.querySelector('header');
      if (header) {
        navbarHeight.current = header.offsetHeight;
      }
    }
  }, [navbarHeight]);

  return (
    <StyledMain
      {...props}
      style={
        {
          '--navbar-height': `${navbarHeight.current}px`,
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
