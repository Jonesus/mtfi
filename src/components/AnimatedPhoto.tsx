import Image, { ImageProps } from 'next/image';
import { SyntheticEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

type AnimatedPhotoProps = ImageProps & {
  opacityOnly?: boolean;
  staggerIndex?: number;
};

function isElementInViewport(rect: DOMRect | null) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined' && rect !== null) {
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  } else {
    return true;
  }
}

export const AnimatedPhoto: React.FC<AnimatedPhotoProps> = ({
  staggerIndex,
  opacityOnly,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [wrapperRect, setWrapperRect] = useState<DOMRect | null>(null);
  const wrapperRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setWrapperRect(node.getBoundingClientRect());
    }
  }, []);

  // Hack for next/image onload issue
  // https://github.com/vercel/next.js/issues/20368#issuecomment-757446007
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src.indexOf('data:image/gif;base64') < 0 && setVisible(true);
  };

  return (
    <TransitionWrapper
      ref={wrapperRef}
      visible={visible}
      staggerIndex={staggerIndex}
      opacityOnly={opacityOnly}
      skipStagger={!isElementInViewport(wrapperRect)}
    >
      <Image {...props} onLoad={onImageLoad} />;
    </TransitionWrapper>
  );
};

const TransitionWrapper = styled.div<{
  visible: boolean;
  staggerIndex?: number;
  opacityOnly?: boolean;
  skipStagger: boolean;
}>`
  height: 100%;
  transition-property: transform, opacity;
  transition-duration: 1s, 0.7s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1), ease-in-out;
  transition-delay: calc(${(p) => p.staggerIndex || 0} * 150ms);

  --shift-amount: 2rem;
  --opacity: 0;

  transform: translateY(var(--shift-amount));
  opacity: var(--opacity);
  ${(p) => (p.opacityOnly ? '--shift-amount: 0' : '')}

  ${(p) =>
    p.visible
      ? `
  --shift-amount: 0;
  --opacity: 1;
  `
      : ''}

  ${(p) => (p.skipStagger ? 'transition-delay: 0ms' : '')}
`;
