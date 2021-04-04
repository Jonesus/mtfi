import { getNavRoutes, getPageBySlug, getPages } from 'api';
import { AppContextProvider } from 'api/context';
import {
  AboutPageData,
  ContactPageData,
  FrontPageData,
  GalleriesPageData,
  Gallery,
  LANGUAGES,
  LightboxData,
  PageRoute,
} from 'api/types';
import { SEOWrapper } from 'components/SEOWrapper';
import { Sidebar } from 'components/Sidebar';
import { AnimatePresence } from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Error from 'pages/_error';
import { ParsedUrlQuery } from 'querystring';

const FrontPage = dynamic<{ data: FrontPageData; pageRoutes: PageRoute[] }>(
  () => import('_pages/FrontPage').then((mod) => mod.FrontPage),
  { ssr: false }
);
const AboutPage = dynamic<{ data: AboutPageData }>(
  () => import('_pages/AboutPage').then((mod) => mod.AboutPage),
  { ssr: false }
);
const ContactPage = dynamic<{ data: ContactPageData }>(
  () => import('_pages/ContactPage').then((mod) => mod.ContactPage),
  { ssr: false }
);
const GalleriesPage = dynamic<{ data: GalleriesPageData }>(
  () => import('_pages/GalleriesPage').then((mod) => mod.GalleriesPage),
  { ssr: false }
);
const GalleryPage = dynamic<{ data: Gallery }>(
  () => import('_pages/GalleryPage').then((mod) => mod.GalleryPage),
  { ssr: false }
);
const LightboxPage = dynamic<{ data: LightboxData }>(
  () => import('_pages/LightboxPage').then((mod) => mod.LightboxPage),
  { ssr: false }
);

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

      case 'lightbox':
        return <LightboxPage data={props.pageData} key={props.template} />;
    }
  })();

  return (
    <AppContextProvider
      value={{
        language: props.language,
        commonData: props.commonData,
        pageId: props.pageData.id,
      }}
    >
      <SEOWrapper data={props} />
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

  const paths = LANGUAGES.map((language) =>
    routes.map((route) => {
      const baseRoute = {
        params: {
          slug: route.translations[language].slug.split('/').filter((item) => item !== ''),
        },
      };

      if (route.template === 'front') {
        return [
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (pages.find((page) => page.template === 'front')!
            .page_data as FrontPageData).highlight_photos.map((photo) => ({
            params: {
              slug: [
                ...route.translations[language].slug.split('/').filter((item) => item !== ''),
                'p',
                `${photo.id}`,
              ],
            },
          })),
          baseRoute,
        ];
      }

      if (route.template === 'gallery') {
        return [
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ((pages.find((page) => page.template === 'galleries')!
            .page_data as GalleriesPageData).galleries.find(
            (gallery) => gallery.id === route.id
          )! as Gallery).photos.map((photo) => ({
            params: {
              slug: [
                ...route.translations[language].slug.split('/').filter((item) => item !== ''),
                'p',
                `${photo.id}`,
              ],
            },
          })),
          baseRoute,
        ];
      }

      return baseRoute;
    })
  ).flat(5);

  return { paths, fallback: true };
};
