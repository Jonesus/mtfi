import DirectusSDK from '@directus/sdk-js';
import { API_URL } from 'api/config';
import {
  parseAboutPageData,
  parseCommonData,
  parseContactPageData,
  parseFrontPageData,
  parseGalleriesPageData,
  parsePagesData,
} from 'api/parsers';
import {
  ContactRequestPayload,
  DataBySlug,
  LanguageCode,
  LANGUAGES,
  PageData,
  PageRoute,
} from 'api/types';

const directus = new DirectusSDK(API_URL as string);

const commonDataQuery = {
  fields: ['*', 'translations.*'],
};

export const getCommonData = async () => {
  const { data } = await directus.items('common_data').read({ ...commonDataQuery, single: true });
  const parsedData = parseCommonData(data);
  return parsedData;
};

const frontPageQuery = {
  fields: ['*', '*.*', '*.translations.*'],
};

export const getFrontPage = async () => {
  const { data } = await directus.items('front_page').read({ ...frontPageQuery, single: true });
  const parsedData = parseFrontPageData(data);
  return parsedData;
};

const aboutPageQuery = {
  fields: ['*', '*.*', '*.translations.*'],
};

export const getAboutPage = async () => {
  const { data } = await directus.items('about_page').read({ ...aboutPageQuery, single: true });
  const parsedData = parseAboutPageData(data);
  return parsedData;
};

const galleriesPageQuery = {
  fields: [
    '*',
    '*.*',
    '*.translations.*',
    '*.preview_photo.*',
    '*.preview_photo.translations.*',
    '*.photos.sort',
    '*.photos.photos_id.*',
    '*.photos.photos_id.translations.*',
  ],
};

export const getGalleriesPage = async () => {
  const { data } = await directus
    .items('galleries_page')
    .read({ ...galleriesPageQuery, single: true });

  const parsedData = parseGalleriesPageData(data);
  return parsedData;
};

const contactPageQuery = {
  fields: ['*.*'],
};

export const getContactPage = async () => {
  const { data } = await directus.items('contact_page').read({ ...contactPageQuery, single: true });

  const parsedData = parseContactPageData(data);
  return parsedData;
};

const pagesQuery = {
  fields: [
    '*',
    '*.*',
    'page_data.item.*.*',
    'page_data.item.*.translations.*',
    '*.*.galleries.preview_photo.*',
    '*.*.galleries.preview_photo.translations.*',
    '*.*.galleries.photos.photos_id.*',
    '*.*.galleries.photos.sort',
    '*.*.galleries.photos.photos_id.*',
    '*.*.galleries.photos.photos_id.translations.*',
  ],
};

export const getPages = async () => {
  const { data } = await directus.items('pages').read(pagesQuery);
  const parsedData = parsePagesData(data);
  return parsedData;
};

const slugsAreEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

const getSlug = <
  T extends {
    translations: {
      [key in LanguageCode]: {
        slug: string;
      };
    };
  }
>(
  a: T,
  lang: LanguageCode
) => a.translations[lang].slug;

export const getNavRoutes = (pagesData: PageData[]): PageRoute[] => {
  const baseRoutes = pagesData.map((page) => ({
    id: page.id,
    template: page.template,
    translations: page.translations,
  }));

  const galleryPage = pagesData.find((page) => page.template === 'galleries');
  if (galleryPage && galleryPage.template === 'galleries') {
    const galleryRoutes = galleryPage.page_data.galleries.map((gallery) => ({
      id: gallery.id,
      template: 'gallery' as const,
      translations: LANGUAGES.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: {
            navigation_title: gallery.translations[curr].name,
            slug: `/${getSlug(galleryPage, curr)}/${getSlug(gallery, curr)}`,
          },
        }),
        {} as PageRoute['translations']
      ),
    }));
    return [...baseRoutes, ...galleryRoutes];
  } else {
    return baseRoutes;
  }
};

export const getPageBySlug = async (originalSlug: string[] | undefined): Promise<DataBySlug> => {
  const [pages, commonData] = await Promise.all([getPages(), getCommonData()]);
  const pageRoutes = getNavRoutes(pages);
  const notFound = {
    template: 'notFound',
    pageData: null,
    commonData: null,
    language: null,
  } as const;

  const lightboxIndex = originalSlug?.indexOf('p');
  let slug: typeof originalSlug = undefined;
  let lightboxSlug: typeof originalSlug = undefined;
  if (lightboxIndex !== undefined && lightboxIndex !== -1) {
    slug = originalSlug?.slice(0, lightboxIndex);
    if (slug?.length === 0) {
      slug = undefined;
    }
    lightboxSlug = originalSlug?.slice(lightboxIndex);
  } else {
    slug = originalSlug;
  }

  if (slug === undefined) {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (page.template === 'front') {
        if (lightboxSlug) {
          return {
            template: 'lightbox',
            pageData: {
              photos: page.page_data.highlight_photos,
              currentPhoto: Number(lightboxSlug[1]),
            },
            commonData,
            pageRoutes,
            language: 'fi',
          };
        } else {
          return {
            template: 'front',
            pageData: page.page_data,
            commonData,
            pageRoutes,
            language: 'fi',
          };
        }
      }
    }
    return notFound;
  }

  if (slug.length === 1) {
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < LANGUAGES.length; j++) {
        const page = pages[i];
        const language = LANGUAGES[j];
        const pageSlug = getSlug(page, language);
        if (slugsAreEqual(slug, [pageSlug])) {
          if (lightboxSlug && page.template === 'front') {
            return {
              template: 'lightbox',
              pageData: {
                photos: page.page_data.highlight_photos,
                currentPhoto: Number(lightboxSlug[1]),
              },
              commonData,
              pageRoutes,
              language,
            };
          } else {
            return {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              template: page.template as any,
              pageData: page.page_data,
              commonData,
              pageRoutes,
              language,
            };
          }
        }
      }
    }
  }

  if (slug.length === 2) {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (page.template === 'galleries') {
        const galleries = page.page_data.galleries;
        for (let j = 0; j < galleries.length; j++) {
          for (let k = 0; k < LANGUAGES.length; k++) {
            const language = LANGUAGES[k];
            const gallery = galleries[j];
            const galleriesSlug = getSlug(page, language);
            const gallerySlug = getSlug(gallery, language);

            if (slugsAreEqual([galleriesSlug, gallerySlug], slug)) {
              if (lightboxSlug) {
                return {
                  template: 'lightbox',
                  pageData: {
                    photos: gallery.photos,
                    currentPhoto: Number(lightboxSlug[1]),
                  },
                  commonData,
                  pageRoutes,
                  language,
                };
              } else {
                return {
                  template: 'gallery',
                  pageData: gallery,
                  commonData,
                  pageRoutes,
                  language,
                };
              }
            }
          }
        }
      }
    }
  }

  return notFound;
};

export const sendContactRequest = async (data: ContactRequestPayload) => {
  return directus.items('contact_requests').create(data);
};
