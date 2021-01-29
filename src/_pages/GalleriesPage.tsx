import { useAppContext } from 'api/context';
import { GalleriesPageData } from 'api/types';
import { Article } from 'components/Article';
import { GalleryPreview } from 'components/GalleryPreview';
import { Main as OriginalMain } from 'components/Main';
import { PageTitle } from 'components/PageTitle';
import { SEO } from 'components/SEO';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type GalleriesPageProps = {
  data: GalleriesPageData;
};

export const GalleriesPage: NextPage<GalleriesPageProps> = ({ data }) => {
  const { language } = useAppContext();
  const router = useRouter();

  return (
    <Main>
      <SEO title={data.translations[language].title} />
      <Article>
        <PageTitle>{data.translations[language].title}</PageTitle>
        <GalleryList>
          {data.galleries.map((gallery) => (
            <GalleryListItem key={gallery.id}>
              <Link href={`${router.asPath}/${gallery.translations[language].slug}`} passHref>
                <GalleryLink>
                  <GalleryPreview gallery={gallery} language={language} />
                </GalleryLink>
              </Link>
            </GalleryListItem>
          ))}
        </GalleryList>
      </Article>
    </Main>
  );
};

const Main = styled(OriginalMain)`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
`;

const GalleryList = styled.ul`
  margin-top: var(--spacing);
`;

const GalleryListItem = styled.li`
  & + & {
    margin-top: var(--spacing);
  }
`;

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
