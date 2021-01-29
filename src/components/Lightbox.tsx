import { useAppContext } from 'api/context';
import { Photo } from 'api/types';
import { BackArrow, Cross, ForwardArrow } from 'components/Icons';
import { SrOnly } from 'components/SrOnly';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useKeyPressEvent } from 'react-use';
import styled from 'styled-components';

type LightboxProps = {
  photos: Photo[];
};

export const Lightbox: React.FC<LightboxProps> = ({ photos }) => {
  const { language, commonData } = useAppContext();
  const router = useRouter();
  const photoQuery = Number(router.query.p);
  const focusedPhoto = photos.find((photo) => photo.id === photoQuery) as Photo;

  const closeLightbox = () =>
    router.push({ pathname: router.pathname, query: { slug: router.query.slug } });

  const focusPhoto = (id: number) =>
    router.push({ pathname: router.pathname, query: { slug: router.query.slug, p: id } });

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

  return (
    <Overlay>
      <IconButton
        className="previous"
        onClick={previousPhoto}
        title={commonData.translations[language].lightbox_previous_photo_button}
      >
        <BackArrow />
        <SrOnly>{commonData.translations[language].lightbox_previous_photo_button}</SrOnly>
      </IconButton>

      <ImageWrapper>
        <ImageContainer>
          <Image
            src={focusedPhoto.url}
            alt={focusedPhoto.translations[language].alt_text}
            layout="fill"
            objectFit="contain"
          />
        </ImageContainer>
        <ImageDescription>
          <DescriptionText>{focusedPhoto.translations[language].description}</DescriptionText>
          <ImageCount>{`${photos.indexOf(focusedPhoto) + 1} / ${photos.length}`}</ImageCount>
        </ImageDescription>
      </ImageWrapper>

      <IconButton
        className="next"
        onClick={nextPhoto}
        title={commonData.translations[language].lightbox_next_photo_button}
      >
        <ForwardArrow />
        <SrOnly>{commonData.translations[language].lightbox_next_photo_button}</SrOnly>
      </IconButton>

      <CrossButton
        onClick={closeLightbox}
        title={commonData.translations[language].lightbox_close_button}
      >
        <Cross />
        <SrOnly>{commonData.translations[language].lightbox_close_button}</SrOnly>
      </CrossButton>
    </Overlay>
  );
};

const Overlay = styled.div`
  --image-margin: 4rem;
  --description-text-size: 2rem;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;

  padding: var(--lightbox-padding);

  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff99;
    backdrop-filter: blur(1rem);
  }

  & > * {
    z-index: 1;
  }

  @media (max-width: 60rem) {
    --lightbox-padding: 2rem;
    --image-margin: 2rem;
    --description-text-size: 1.5rem;
  }

  @media (max-width: 40rem) {
    --image-margin: 0.2rem;
    grid-template-rows: 1fr min-content;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'image image'
      'previous next';

    & button.next svg,
    & button.previous svg {
      height: 8rem;
    }
  }
`;

const ImageContainer = styled.div`
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

const ImageDescription = styled.figcaption`
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
