import { CommonData, FrontPageData, LanguageCode } from 'api/types';
import { Main } from 'components/Main';
import { MainTitle } from 'components/MainTitle';
import { PhotoGrid } from 'components/PhotoGrid';
import { Sidebar } from 'components/Sidebar';
import { NextPage } from 'next';
import styled from 'styled-components';

type FrontPageProps = {
  data: FrontPageData;
  commonData: CommonData;
  language: LanguageCode;
};

export const FrontPage: NextPage<FrontPageProps> = ({ data, commonData, language }) => (
  <>
    <Sidebar commonData={commonData} language={language} frontPage />

    <Main>
      <MobileTitle frontPage {...commonData.translations[language]} />

      <PhotoGrid photos={data.highlight_photos} language={language} />
    </Main>
  </>
);

const MobileTitle = styled(MainTitle)`
  padding-bottom: calc(var(--page-padding) * 2);
  display: flex;
  flex-direction: column;

  @media (min-width: 60rem) {
    display: none;
  }
`;
