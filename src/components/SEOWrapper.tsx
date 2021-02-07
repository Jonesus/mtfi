import { useAppContext } from 'api/context';
import { DataBySlug } from 'api/types';
import { SEOBase } from 'components/SEOBase';

type SEOWrapperProps = {
  data: DataBySlug;
};

export const SEOWrapper: React.FC<SEOWrapperProps> = ({ data }) => {
  const { language } = useAppContext();

  switch (data.template) {
    case 'front':
      return <SEOBase />;

    case 'about':
      return (
        <SEOBase
          title={data.pageData.translations[language].title}
          description={data.pageData.translations[language].text}
        />
      );

    case 'galleries':
      return <SEOBase title={data.pageData.translations[language].title} />;

    case 'gallery':
      return (
        <SEOBase
          title={data.pageData.translations[language].name}
          description={data.pageData.translations[language].description}
          image={data.pageData.preview_photo.url}
        />
      );

    case 'lightbox':
      return (
        <SEOBase
          description={
            data.pageData.photos.find((photo) => photo.id === data.pageData.currentPhoto)
              ?.translations[language].description
          }
          image={data.pageData.photos.find((photo) => photo.id === data.pageData.currentPhoto)?.url}
        />
      );

    case 'contact':
      return (
        <SEOBase
          title={data.pageData.translations[language].title}
          description={data.pageData.translations[language].text}
        />
      );

    default:
      return null;
  }
};
