import { useAppContext } from 'api/context';
import { Gallery } from 'api/types';
import { Main } from 'components/Main';
import { PageTitle } from 'components/PageTitle';
import { PhotoGrid } from 'components/PhotoGrid';
import { SEO } from 'components/SEO';
import { NextPage } from 'next';
import styled from 'styled-components';

type GalleryPageProps = {
  data: Gallery;
};

export const GalleryPage: NextPage<GalleryPageProps> = ({ data }) => {
  const { language } = useAppContext();

  return (
    <Main>
      <SEO
        title={data.translations[language].name}
        description={data.translations[language].description}
      />
      <article>
        <PageTitle>{data.translations[language].name}</PageTitle>
        <Description>{data.translations[language].description}</Description>
        <Photos photos={data.photos} />
      </article>
    </Main>
  );
};

const Photos = styled(PhotoGrid)`
  margin-top: var(--spacing);
`;

const Description = styled.p`
  margin-top: var(--spacing);
  font-size: 1.125rem;
`;
