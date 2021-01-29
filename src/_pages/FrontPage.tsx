import { useAppContext } from 'api/context';
import { FrontPageData, PageRoute } from 'api/types';
import { Main } from 'components/Main';
import { MainTitle } from 'components/MainTitle';
import { PhotoGrid } from 'components/PhotoGrid';
import { SEO } from 'components/SEO';
import { NextPage } from 'next';
import styled from 'styled-components';

type FrontPageProps = {
  data: FrontPageData;
  pageRoutes: PageRoute[];
};

export const FrontPage: NextPage<FrontPageProps> = ({ data, pageRoutes }) => {
  const { language, commonData } = useAppContext();

  return (
    <Main>
      <SEO />
      <article>
        <MobileTitle
          title={commonData.translations[language].title}
          subtitle={commonData.translations[language].subtitle}
          frontPage
          link={
            (pageRoutes.find((route) => route.template === 'front') as PageRoute).translations[
              language
            ].slug
          }
        />

        <PhotoGrid photos={data.highlight_photos} />
      </article>
    </Main>
  );
};

const MobileTitle = styled(MainTitle)`
  padding-bottom: calc(var(--page-padding) * 2);
  display: flex;
  flex-direction: column;

  @media (min-width: 60rem) {
    display: none;
  }
`;
