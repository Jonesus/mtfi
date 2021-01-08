import { getAllPages, getPageBySlug } from 'api';
import { LANGUAGES } from 'api/types';
import { AboutPage } from 'components/AboutPage';
import { FrontPage } from 'components/FrontPage';
import { GalleriesPage } from 'components/GalleriesPage';
import { GalleryPage } from 'components/GalleryPage';
import { Sidebar } from 'components/Sidebar';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Error from 'pages/_error';
import { ParsedUrlQuery } from 'querystring';

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  switch (props.template) {
    case 'front':
      return (
        <>
          <Sidebar
            commonData={props.commonData}
            language={props.language}
            pageRoutes={props.pageRoutes}
            currentPage={props.template}
          />
          <FrontPage
            data={props.pageData}
            commonData={props.commonData}
            language={props.language}
            pageRoutes={props.pageRoutes}
          />
        </>
      );

    case 'about':
      return (
        <>
          <Sidebar
            commonData={props.commonData}
            language={props.language}
            pageRoutes={props.pageRoutes}
            currentPage={props.template}
          />
          <AboutPage data={props.pageData} language={props.language} />
        </>
      );

    case 'galleries':
      return (
        <>
          <Sidebar
            commonData={props.commonData}
            language={props.language}
            pageRoutes={props.pageRoutes}
            currentPage={props.template}
          />
          <GalleriesPage data={props.pageData} language={props.language} />
        </>
      );

    case 'gallery':
      return (
        <>
          <Sidebar
            commonData={props.commonData}
            language={props.language}
            pageRoutes={props.pageRoutes}
            currentPage={props.template}
          />
          <GalleryPage data={props.pageData} language={props.language} />
        </>
      );

    case 'notFound':
    default:
      return <Error statusCode={404} />;
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  const pageProps = await getPageBySlug(context.params?.slug as string[] | undefined);
  return { props: pageProps, revalidate: 1 };
};

export const getStaticPaths = async () => {
  const { galleriesPageData } = await getAllPages();

  const galleriesBasePaths = LANGUAGES.map((lang) => ({
    params: { slug: [galleriesPageData.translations[lang].slug] },
  }));
  const galleriesPaths = galleriesPageData.galleries.reduce((acc, curr) => {
    const gallerySubPaths = LANGUAGES.map((lang) => ({
      params: {
        slug: [galleriesPageData.translations[lang].slug, curr.translations[lang].slug],
      },
    }));
    return [...acc, ...gallerySubPaths];
  }, galleriesBasePaths);

  const paths = [{ params: { slug: [] } }, { params: { slug: ['en'] } }, ...galleriesPaths];

  return { paths, fallback: true };
};
