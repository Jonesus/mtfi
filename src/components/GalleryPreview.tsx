import { Gallery, LanguageCode } from 'api/types';
import { AnimatedPhoto } from 'components/AnimatedPhoto';
import styled from 'styled-components';

type GalleryPreviewProps = {
  gallery: Gallery;
  language: LanguageCode;
};

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ gallery, language }) => {
  return (
    <>
      <GalleryTitle>{gallery.translations[language].name}</GalleryTitle>
      <PreviewImageWrapper>
        <AnimatedPhoto
          src={gallery.preview_photo.url}
          alt={gallery.preview_photo.translations[language].alt_text}
          layout="fill"
          objectFit="cover"
          opacityOnly
        />
      </PreviewImageWrapper>
    </>
  );
};

const GalleryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.2em;
  position: relative;
  display: inline-block;
`;

const PreviewImageWrapper = styled.div`
  margin-top: 1.5rem;
  position: relative;
  height: var(--preview-image-height);
`;
