import { useAppContext } from 'api/context';
import { LightboxData } from 'api/types';
import { AnimatedPhoto } from 'components/AnimatedPhoto';
import { BackArrow, Cross, ForwardArrow } from 'components/Icons';
import { SrOnly } from 'components/SrOnly';
import { AnimatePresence, motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useKeyPressEvent, usePrevious } from 'react-use';
import styled from 'styled-components';

type LightboxProps = {
  data: LightboxData;
};

export const LightboxPage: NextPage<LightboxProps> = ({ data: { photos, currentPhoto } }) => {
  const { language, commonData } = useAppContext();
  const router = useRouter();
  const photoQuery = currentPhoto;
  let focusedPhoto = photos.find((photo) => photo.id === photoQuery);
  const previousFocusedPhoto = usePrevious(focusedPhoto);
  if (!focusedPhoto) focusedPhoto = previousFocusedPhoto;

  const baseRouteIndex = router.asPath.split('/').indexOf('p');
  const baseRoute = router.asPath.split('/').slice(0, baseRouteIndex).join('/');

  const closeLightbox = () => router.push({ pathname: baseRoute });

  const focusPhoto = (id: number) => router.push({ pathname: `${baseRoute}/p/${id}` });

  const nextPhoto = () => {
    if (focusedPhoto) {
      const currentIndex = photos.indexOf(focusedPhoto);
      const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
      focusPhoto(photos[nextIndex].id);
    }
  };

  const previousPhoto = () => {
    if (focusedPhoto) {
      const currentIndex = photos.indexOf(focusedPhoto);
      const previousIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
      focusPhoto(photos[previousIndex].id);
    }
  };

  useKeyPressEvent('Escape', closeLightbox);
  useKeyPressEvent('ArrowRight', nextPhoto);
  useKeyPressEvent('ArrowLeft', previousPhoto);

  if (!focusedPhoto) return null;

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IconButton
        className="previous"
        onClick={previousPhoto}
        title={commonData.translations[language].lightbox_previous_photo_button}
      >
        <BackArrow />
        <SrOnly>{commonData.translations[language].lightbox_previous_photo_button}</SrOnly>
      </IconButton>

      <AnimatePresence exitBeforeEnter>
        <ImageWrapper key={focusedPhoto.id}>
          <ImageContainer
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedPhoto
              src={focusedPhoto.url}
              alt={focusedPhoto.translations[language].alt_text}
              layout="fill"
              objectFit="contain"
              opacityOnly
            />
          </ImageContainer>
          <ImageDescription
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3 }}
          >
            <DescriptionText>{focusedPhoto.translations[language].description}</DescriptionText>
            <ImageCount>{`${photos.indexOf(focusedPhoto) + 1} / ${photos.length}`}</ImageCount>
          </ImageDescription>
        </ImageWrapper>
      </AnimatePresence>

      <IconButton
        className="next"
        onClick={nextPhoto}
        title={commonData.translations[language].lightbox_next_photo_button}
      >
        <ForwardArrow />
        <SrOnly>{commonData.translations[language].lightbox_next_photo_button}</SrOnly>
      </IconButton>

      <CrossButton
        className="close"
        onClick={closeLightbox}
        title={commonData.translations[language].lightbox_close_button}
      >
        <Cross />
        <SrOnly>{commonData.translations[language].lightbox_close_button}</SrOnly>
      </CrossButton>
    </Overlay>
  );
};

const Overlay = styled(motion.div)`
  --image-margin: 4rem;
  --description-text-size: 2rem;

  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  padding: var(--lightbox-padding);

  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  background-color: #ffffffee;

  & > * {
    z-index: 1;
  }

  @media (max-width: 60rem) {
    --lightbox-padding: 1rem;
    --image-margin: 2rem;
    --description-text-size: 1.5rem;
  }

  @media (max-width: 40rem) {
    --image-margin: 0.2rem;
    --description-text-size: 1.2rem;
    padding: 4rem var(--lightbox-padding) 0;
    grid-template-rows: 1fr min-content;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'image image'
      'previous next';

    & button.next svg,
    & button.previous svg {
      height: 6rem;
    }
    & button.close svg {
      height: 3rem;
      width: 3rem;
    }
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 var(--image-margin);

  @media (max-width: 40rem) {
    grid-column: span 2;
    grid-area: image;
  }
`;

const ImageDescription = styled(motion.figure)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  font-size: var(--description-text-size);
  color: var(--black);

  @media (max-width: 40rem) {
    margin-bottom: 1rem;
  }
`;

const DescriptionText = styled.span`
  font-style: italic;
  max-width: 80%;
`;

const ImageCount = styled.span`
  font-style: normal;
  font-weight: 500;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    background-color: var(--background-dark);
  }
`;

const CrossButton = styled(IconButton)`
  position: absolute;
  display: flex;

  top: var(--lightbox-padding);
  right: var(--lightbox-padding);
`;
