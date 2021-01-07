import { ASSET_URL } from 'api/config';
import {
  AboutPageData,
  CommonData,
  FrontPageData,
  GalleriesPageData,
  LANGUAGE_KEYS,
  PageData,
  Photo,
} from 'api/types';

export const parseDate = (data: string | null) => (data ? new Date(data) : null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseTranslationData = (data: any[]) =>
  data.reduce((acc, curr) => {
    const lang = curr.languages_code as keyof typeof LANGUAGE_KEYS;
    const data = { [LANGUAGE_KEYS[lang]]: curr };
    return { ...acc, ...data };
  }, {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parsePhoto = (data: any): Photo => ({
  ...data,
  url: `${ASSET_URL}${data.image}`,
  translations: parseTranslationData(data.translations),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCommonData = (data: any): CommonData => ({
  ...data,
  translations: parseTranslationData(data?.translations),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseFrontPageData = (data: any): FrontPageData => ({
  ...data,
  highlight_photos: data?.highlight_photos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((a: any, b: any) => a.frontpage_sort - b.frontpage_sort)
    .map(parsePhoto),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseAboutPageData = (data: any): AboutPageData => ({
  ...data,
  highlight_photo: parsePhoto(data?.highlight_photo[0]),
  translations: parseTranslationData(data?.translations),
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseGalleriesPageData = (data: any): GalleriesPageData => ({
  ...data,
  translations: parseTranslationData(data?.translations),
  galleries: data?.galleries.map((gallery: any) => ({
    ...gallery,
    preview_photo: parsePhoto(gallery.preview_photo),
    translations: parseTranslationData(gallery.translations),
    photos: gallery.photos
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((data: any) => data.photos_id)
      .filter((item: any) => item)
      .map(parsePhoto),
    /* eslint-enable @typescript-eslint/no-explicit-any */
  })),
});

type NullablePageData =
  | PageData
  | {
      template: 'notFound';
      page_data: null;
    };

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parsePagesData = (data: any): PageData[] =>
  (data as any[])
    .map(
      (item: any): NullablePageData => ({
        /* eslint-enable @typescript-eslint/no-explicit-any */
        ...item,
        translations: parseTranslationData(item.translations),
        page_data: (() => {
          switch (item.template) {
            case 'front':
              return parseFrontPageData(item.page_data[0].item);
            case 'about':
              return parseAboutPageData(item.page_data[0].item);
            case 'galleries':
              return parseGalleriesPageData(item.page_data[0].item);
            case 'notFound':
            default:
              return null;
          }
        })(),
      })
    )
    .filter((item): item is PageData => item.template !== 'notFound')
    .sort((a, b) => a.sort - b.sort);
