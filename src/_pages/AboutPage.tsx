import { useAppContext } from 'api/context';
import { AboutPageData } from 'api/types';
import { AnimatedPhoto } from 'components/AnimatedPhoto';
import { Main as OriginalMain } from 'components/Main';
import { PageTitle } from 'components/PageTitle';
import { SEO } from 'components/SEO';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { containerTransitions, itemTransitions } from 'utils';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

type AboutPageProps = {
  data: AboutPageData;
};

const renderers = {
  paragraph: (props: { value: string }) => (
    <motion.p variants={itemTransitions} key={props.value} {...props} />
  ),
};

export const AboutPage: NextPage<AboutPageProps> = ({ data }) => {
  const { language } = useAppContext();

  return (
    <Main>
      <SEO
        title={data.translations[language].title}
        description={data.translations[language].text}
      />
      <PageSection>
        <Section>
          <Article initial="initial" animate="enter" variants={containerTransitions}>
            <PageTitle variants={itemTransitions} key="title">
              {data.translations[language].title}
            </PageTitle>
            <ReactMarkdown skipHtml renderers={renderers}>
              {data.translations[language].text}
            </ReactMarkdown>
          </Article>
        </Section>

        <Aside>
          <AnimatedPhoto
            opacityOnly
            src={data.highlight_photo.url}
            alt={data.highlight_photo.translations[language].alt_text}
            layout="fill"
            objectFit="cover"
          />
        </Aside>
      </PageSection>
    </Main>
  );
};

const Main = styled(OriginalMain)`
  && {
    padding: 0;
  }
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
      width: calc(var(--article-width) - 2 * var(--page-padding));
      margin-bottom: var(--page-padding);
    }
  }

  @media (max-width: 40rem) {
    & aside {
      width: 100%;
      height: 40vh;
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

const Article = styled(motion.article)`
  padding: var(--page-padding);
  max-width: var(--article-width);

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
