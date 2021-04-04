import { useAppContext } from 'api/context';
import { GalleriesPageData } from 'api/types';
import { Article } from 'components/Article';
import { GalleryPreview } from 'components/GalleryPreview';
import { Main as OriginalMain } from 'components/Main';
import { PageTitle } from 'components/PageTitle';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { containerTransitions, itemTransitions } from 'utils';

type GalleriesPageProps = {
  data: GalleriesPageData;
};

export const GalleriesPage: NextPage<GalleriesPageProps> = ({ data }) => {
  const { language } = useAppContext();
  const router = useRouter();

  return (
    <Main>
      <GalleriesArticle>
        <PageTitle>{data.translations[language].title}</PageTitle>
        <GalleryList initial="initial" animate="enter" variants={containerTransitions}>
          {data.galleries
            ?.filter((gallery) => gallery.photos.length > 0)
            .map((gallery) => (
              <GalleryListItem key={gallery.id} variants={itemTransitions}>
                <Link href={`${router.asPath}/${gallery.translations[language].slug}`} passHref>
                  <GalleryLink>
                    <GalleryPreview gallery={gallery} language={language} />
                  </GalleryLink>
                </Link>
              </GalleryListItem>
            ))}
        </GalleryList>
      </GalleriesArticle>
    </Main>
  );
};

const Main = styled(OriginalMain)`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
`;

const GalleriesArticle = styled(Article)`
  --article-width: auto;
`;

const GalleryList = styled(motion.ul)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: var(--spacing);

  margin-top: var(--spacing);
  --preview-image-height: 24vw;

  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
    --preview-image-height: 50vw;
  }
`;

const GalleryListItem = styled(motion.li)``;

const GalleryLink = styled.a`
  text-decoration: none;
  color: inherit;

  & h2:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    left: 50%;
    position: absolute;
    background: var(--black);
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  & h2:active:after,
  &:hover h2:after {
    width: 100%;
    left: 0;
  }
`;
