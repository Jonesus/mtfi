import { AboutPageData, CommonData, LanguageCode } from 'api';
import { Main as OriginalMain } from 'components/Main';
import { Sidebar } from 'components/Sidebar';
import { NextPage } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

type AboutPageProps = {
  data: AboutPageData;
  commonData: CommonData;
  language: LanguageCode;
};

export const AboutPage: NextPage<AboutPageProps> = ({ data, commonData, language }) => (
  <>
    <Sidebar commonData={commonData} language={language} />

    <Main>
      <PageSection>
        <Section>
          <Article>
            <PageTitle>{data.translations[language].title}</PageTitle>
            <ReactMarkdown skipHtml>{data.translations[language].text}</ReactMarkdown>
          </Article>
        </Section>

        <Aside>
          <Image
            src={data.highlight_photo.url}
            alt={data.highlight_photo.translations[language].alt_text}
            layout="fill"
            objectFit="cover"
          />
        </Aside>
      </PageSection>
    </Main>
  </>
);

const PageTitle = styled.h1`
  font-size: 4rem;
  line-height: 1em;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.5rem;
`;

const Main = styled(OriginalMain)`
  padding: 0;
  --max-text-width: 40rem;
`;

const PageSection = styled.section`
  height: 100%;
  display: flex;

  @media (max-width: 88rem) {
    flex-direction: column;
    align-items: center;
    height: auto;

    & aside {
      height: 50vh;
      width: calc(var(--max-text-width) - 2 * var(--page-padding));
      margin-bottom: var(--page-padding);
    }
  }
`;

const Section = styled.section`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Article = styled.article`
  padding: var(--page-padding);
  max-width: var(--max-text-width);

  & > p {
    font-size: 1.125rem;
    color: var(--text-color);
    margin-top: 1.5em;
  }
`;

const Aside = styled.aside`
  position: relative;
  height: 100vh;
  width: 100%;
`;
