import Image, { ImageProps } from 'next/image';
import { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';

type AnimatedPhotoProps = ImageProps & {
  staggerIndex?: number;
};

export const AnimatedPhoto: React.FC<AnimatedPhotoProps> = ({ staggerIndex, ...props }) => {
  const [visible, setVisible] = useState(false);
  // Hack for next/image onload issue
  // https://github.com/vercel/next.js/issues/20368#issuecomment-757446007
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src.indexOf('data:image/gif;base64') < 0 && setVisible(true);
  };

  return (
    <TransitionWrapper visible={visible} staggerIndex={staggerIndex}>
      <Image {...props} onLoad={onImageLoad} />;
    </TransitionWrapper>
  );
};

const TransitionWrapper = styled.div<{
  visible: boolean;
  staggerIndex?: number;
}>`
  height: 100%;
  transition-property: transform, opacity;
  transition-duration: 1s, 0.7s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1), ease-in-out;
  transition-delay: calc(${(p) => p.staggerIndex || 0} * 100ms);

  --shift-amount: 2rem;
  --opacity: 0;

  transform: translateY(var(--shift-amount));
  opacity: var(--opacity);

  ${(p) =>
    p.visible
      ? `
  --shift-amount: 0;
  --opacity: 1;
  `
      : ''}
`;
