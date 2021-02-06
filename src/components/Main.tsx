import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { throttle } from 'utils';

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

const SCROLL_THRESHOLD = 5;

export const Main: React.FC = (props) => {
  const navbarHeight = useRef(110);
  const previousHeaderScroll = useRef(0);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const header = document.body.querySelector('header');
      if (header) {
        navbarHeight.current = header.offsetHeight;
      }
    }
  }, [navbarHeight]);

  const updateNavTranslation = () => {
    if (typeof document !== 'undefined') {
      const mainChild = document.body.querySelector('main')?.children[0] as HTMLElement;
      const nextDiv = document.body.querySelector('#__next') as HTMLElement;
      const header = document.body.querySelector('header') as HTMLElement;

      const currentScroll = window.scrollY;
      const previousScroll = previousHeaderScroll.current;

      console.log({ currentScroll });

      if (Math.abs(currentScroll - previousScroll) < SCROLL_THRESHOLD) return;

      if (currentScroll > previousScroll && currentScroll > SCROLL_THRESHOLD) {
        nextDiv.style.setProperty('--header-position', `${header.offsetHeight}px`);
      } else if (
        currentScroll < previousScroll &&
        currentScroll < mainChild.offsetHeight - window.outerHeight
      ) {
        nextDiv.style.setProperty('--header-position', `0px`);
      }
      previousHeaderScroll.current = currentScroll;
    }
  };

  useEffect(() => {
    if (window) {
      const throttledSetScroll = throttle(updateNavTranslation, 100);
      window.addEventListener('scroll', throttledSetScroll);

      return () => window.removeEventListener('scroll', throttledSetScroll);
    }
  }, []);

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
  height: 100%;
`;
