import { useAppContext } from 'api/context';
import { Photo, PhotoOrientation } from 'api/types';
import { AnimatedPhoto } from 'components/AnimatedPhoto';
import { Lightbox } from 'components/Lightbox';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type PhotoGridProps = {
  photos: Photo[];
};

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, ...rest }) => {
  const { language } = useAppContext();
  const router = useRouter();
  const photoQuery = Number(router.query.p);
  const focusedPhoto = photos.find((photo) => photo.id === photoQuery);

  const getFocusPhoto = (id: number) => () =>
    router.push({ pathname: router.pathname, query: { slug: router.query.slug, p: id } });

  return (
    <>
      <GridWrapper {...rest}>
        {photos.map((photo, i) => (
          <GridItem key={photo.id} orientation={photo.gallery_orientation}>
            <HoverableImage
              src={photo.url}
              alt={photo.translations[language].alt_text}
              layout="fill"
              objectFit="cover"
              onClick={getFocusPhoto(photo.id)}
              staggerIndex={i}
              sizes={photo.gallery_orientation === 'wide' ? '80vw' : '40vw'}
            />
          </GridItem>
        ))}
      </GridWrapper>
      <AnimatePresence exitBeforeEnter>
        {focusedPhoto && (
          <Lightbox
            photos={photos}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key="lightbox"
          />
        )}
      </AnimatePresence>
    </>
  );
};

const GridWrapper = styled.ul`
  --image-min-size: 30vw;
  --grid-gap: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: var(--image-min-size);
  grid-auto-flow: dense;
  gap: var(--grid-gap);

  @media (max-width: 60rem) {
    --image-min-size: 40vw;
  }

  @media (max-width: 30rem) {
    --grid-gap: 0.5rem;
  }
`;

const GridItem = styled.li<{ orientation: PhotoOrientation }>`
  position: relative;

  ${(p) => (p.orientation === 'tall' ? `grid-row: span 2;` : '')}
  ${(p) => (p.orientation === 'wide' ? `grid-column: span 2;` : '')}

  @media (max-width: 21rem), (min-width: 60rem) and (max-width: 67rem) {
    grid-column: unset;
  }
`;

const HoverableImage = styled(AnimatedPhoto)<{ layout?: string }>`
  cursor: pointer;
  transition: transform 0.4s ease-out;
  &:hover {
    transform: scale(1.03, 1.03);
  }
`;
