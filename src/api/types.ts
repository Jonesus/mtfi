export const LANGUAGE_KEYS = { 'fi-FI': 'fi', 'en-US': 'en' };
export const LANGUAGES = ['fi', 'en'] as const;
export type LanguageCode = typeof LANGUAGES[number];

export type PhotoOrientation = 'normal' | 'tall' | 'wide';

export type Photo = {
  id: number;
  image: string;
  url: string;
  name: string;
  gallery_orientation: PhotoOrientation;
  date_created: string | null;
  date_updated: string | null;
  translations: {
    [key in LanguageCode]: {
      id: number;
      alt_text: string;
      description: string;
    };
  };
};

export type CommonData = {
  date_updated: string | null;
  phone_number: string;
  email_address: string;
  telegram_nickname: string;
  translations: {
    [key in LanguageCode]: {
      id: number;
      title: string;
      subtitle: string;
    };
  };
};

export type FrontPageData = {
  date_updated: Date | null;
  highlight_photos: Photo[];
};

export type AboutPageData = {
  date_updated: Date | null;
  highlight_photo: Photo;
  translations: {
    [key in LanguageCode]: {
      title: string;
      text: string;
      slug: string;
    };
  };
};

export type Gallery = {
  id: number;
  sort: number | null;
  date_created: string | null;
  date_updated: string | null;
  preview_photo: Photo;
  name: string;
  translations: {
    [key in LanguageCode]: {
      name: string;
      description: string;
      slug: string;
    };
  };
  photos: Photo[];
};

export type GalleriesPageData = {
  date_updated: string | null;
  translations: {
    [key in LanguageCode]: {
      title: string;
      slug: string;
    };
  };
  galleries: Gallery[];
};

type PageMetadata = {
  id: number;
  sort: number;
  name: string;
  translations: {
    [key in LanguageCode]: {
      navigation_title: string;
      slug: string;
    };
  };
};

export type PageData = PageMetadata &
  (
    | {
        template: 'front';
        page_data: FrontPageData;
      }
    | {
        template: 'about';
        page_data: AboutPageData;
      }
    | {
        template: 'galleries';
        page_data: GalleriesPageData;
      }
  );

export type CommonDataBySlug = {
  language: LanguageCode;
  commonData: CommonData;
  pageRoutes: PageRoute[];
};

export type DataBySlug =
  | (CommonDataBySlug & {
      template: 'front';
      pageData: FrontPageData;
    })
  | (CommonDataBySlug & {
      template: 'about';
      pageData: AboutPageData;
    })
  | (CommonDataBySlug & {
      template: 'galleries';
      pageData: GalleriesPageData;
    })
  | (CommonDataBySlug & {
      template: 'gallery';
      pageData: Gallery;
    })
  | {
      template: 'notFound';
      pageData: null;
      commonData: null;
      language: null;
    };

export type PageTemplate = 'front' | 'about' | 'galleries' | 'gallery';

export type PageRoute = {
  template: PageTemplate;
  translations: {
    [key in LanguageCode]: {
      navigation_title: string;
      slug: string;
    };
  };
};
