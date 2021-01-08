import { GalleriesPageData, LanguageCode } from 'api/types';
import { GalleryPreview } from 'components/GalleryPreview';
import { Main as OriginalMain } from 'components/Main';
import { PageTitle } from 'components/PageTitle';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type GalleriesPageProps = {
  data: GalleriesPageData;
  language: LanguageCode;
};

export const GalleriesPage: NextPage<GalleriesPageProps> = ({ data, language }) => {
  const router = useRouter();

  return (
    <Main>
      <GalleriesPageWrapper>
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
      </GalleriesPageWrapper>
    </Main>
  );
};

const Main = styled(OriginalMain)`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
`;

const GalleriesPageWrapper = styled.article`
  width: 100%;
  max-width: 40rem;
  padding-bottom: var(--bottom-padding, var(--page-padding));
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
