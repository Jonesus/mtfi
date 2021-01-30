import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const transitionVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

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
      variants={transitionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={
        {
          '--navbar-height': `${navbarHeight.current}px`,
        } as React.CSSProperties
      }
    />
  );
};

const StyledMain = styled(motion.main)`
  padding: var(--page-padding);
  overflow: auto;
  height: 100%;
`;
