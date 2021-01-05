import DirectusSDK from '@directus/sdk-js';
import {
  parseAboutPageData,
  parseCommonData,
  parseFrontPageData,
  parseGalleriesPageData,
  parsePagesData,
} from 'api/parsers';
import { DataBySlug, LanguageCode, LANGUAGES } from 'api/types';

const API_URL = 'http://localhost:8055/';
export const ASSET_URL = 'http://localhost:8055/assets/';

const directus = new DirectusSDK(API_URL);

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

const pagesQuery = {
  fields: [
    '*',
    '*.*',
    'page_data.item.*.*',
    'page_data.item.*.translations.*',
    '*.*.galleries.photos.photos_id.*',
    '*.*.galleries.photos.photos_id.translations.*',
  ],
};

export const getPages = async () => {
  const { data } = await directus.items('pages').read(pagesQuery);
  const parsedData = parsePagesData(data);
  return parsedData;
};

export const getAllPages = async () => {
  const [frontPageData, aboutPageData, galleriesPageData] = await Promise.all([
    getFrontPage(),
    getAboutPage(),
    getGalleriesPage(),
  ]);

  return { frontPageData, aboutPageData, galleriesPageData };
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

export const getPageBySlug = async (slug: string[] | undefined): Promise<DataBySlug> => {
  const [pages, commonData] = await Promise.all([getPages(), getCommonData()]);
  const notFound = {
    template: 'notFound',
    pageData: null,
    commonData: null,
    language: null,
  } as const;

  if (slug === undefined) {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (page.template === 'front') {
        return {
          template: 'front',
          pageData: page.page_data,
          commonData,
          language: 'fi',
        };
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
          return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            template: page.template as any,
            pageData: page.page_data,
            commonData,
            language,
          };
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
              return {
                template: 'gallery',
                pageData: gallery,
                commonData,
                language,
              };
            }
          }
        }
      }
    }
  }

  return notFound;
};
