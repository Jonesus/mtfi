import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageTitle = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 1em;
  font-weight: 700;

  @media (max-width: 40rem) {
    font-size: 3rem;
  }
`;
