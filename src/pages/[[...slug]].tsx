import { AboutPage } from '_pages/AboutPage';
import { ContactPage } from '_pages/ContactPage';
import { FrontPage } from '_pages/FrontPage';
import { GalleriesPage } from '_pages/GalleriesPage';
import { GalleryPage } from '_pages/GalleryPage';
import { getNavRoutes, getPageBySlug, getPages } from 'api';
import { AppContextProvider } from 'api/context';
import { LANGUAGES } from 'api/types';
import { Sidebar } from 'components/Sidebar';
import { AnimatePresence } from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Error from 'pages/_error';
import { ParsedUrlQuery } from 'querystring';

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  if (props.template === 'notFound' || !props.template) {
    return <Error statusCode={404} />;
  }

  const pageComponent = (() => {
    switch (props.template) {
      case 'front':
        return (
          <FrontPage data={props.pageData} pageRoutes={props.pageRoutes} key={props.template} />
        );

      case 'about':
        return <AboutPage data={props.pageData} key={props.template} />;

      case 'galleries':
        return <GalleriesPage data={props.pageData} key={props.template} />;

      case 'gallery':
        return <GalleryPage data={props.pageData} key={props.template} />;

      case 'contact':
        return <ContactPage data={props.pageData} key={props.template} />;
    }
  })();

  return (
    <AppContextProvider
      value={{
        language: props.language,
        commonData: props.commonData,
      }}
    >
      <Sidebar pageRoutes={props.pageRoutes} currentPage={props.template} />
      <AnimatePresence exitBeforeEnter>{pageComponent}</AnimatePresence>
    </AppContextProvider>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  const pageProps = await getPageBySlug(context.params?.slug as string[] | undefined);
  return { props: pageProps, revalidate: 1 };
};

export const getStaticPaths = async () => {
  const pages = await getPages();
  const routes = getNavRoutes(pages);

  const paths = LANGUAGES.flatMap((language) =>
    routes.map((route) => ({
      params: { slug: route.translations[language].slug.split('/').filter((item) => item !== '') },
    }))
  );

  return { paths, fallback: true };
};
