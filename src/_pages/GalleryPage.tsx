import { Gallery, LanguageCode } from 'api/types';
import { Main } from 'components/Main';
import { PageTitle } from 'components/PageTitle';
import { PhotoGrid } from 'components/PhotoGrid';
import { NextPage } from 'next';
import styled from 'styled-components';

type GalleryPageProps = {
  data: Gallery;
  language: LanguageCode;
};

export const GalleryPage: NextPage<GalleryPageProps> = ({ data, language }) => (
  <Main>
    <PageTitle>{data.translations[language].name}</PageTitle>
    <Description>{data.translations[language].description}</Description>
    <Photos language={language} photos={data.photos} />
  </Main>
);

const Photos = styled(PhotoGrid)`
  margin-top: var(--spacing);
`;

const Description = styled.p`
  margin-top: var(--spacing);
  font-size: 1.125rem;
`;
