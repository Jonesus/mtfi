export const LANGUAGE_KEYS = { 'fi-FI': 'fi', 'en-US': 'en' };
export const LANGUAGES = ['fi', 'en'] as const;
export type LanguageCode = typeof LANGUAGES[number];

export type PhotoOrientation = 'normal' | 'tall' | 'wide';

export type Photo = {
  id: number;
  image: string;
  url: string;
  grid_preview_url: string | null;
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
  instagram_user: string;
  translations: {
    [key in LanguageCode]: {
      id: number;
      title: string;
      subtitle: string;
      language_switcher_label: string;
      lightbox_previous_photo_button: string;
      lightbox_next_photo_button: string;
      lightbox_close_button: string;
    };
  };
};

export type FrontPageData = {
  id: number;
  date_updated: Date | null;
  highlight_photos: Photo[];
};

export type AboutPageData = {
  id: number;
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
  id: number;
  date_updated: string | null;
  translations: {
    [key in LanguageCode]: {
      title: string;
      slug: string;
    };
  };
  galleries: Gallery[];
};

export type ContactPageData = {
  id: number;
  date_updated: string;
  translations: {
    [key in LanguageCode]: {
      title: string;
      text: string;
      email_field_label: string;
      text_field_label: string;
      submit_button_text: string;
      form_field_empty: string;
      form_email_invalid: string;
      form_submit_success: string;
      form_submit_error: string;
    };
  };
};

export type LightboxData = {
  id: number;
  photos: Photo[];
  currentPhoto: number;
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
    | {
        template: 'contact';
        page_data: ContactPageData;
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
  | (CommonDataBySlug & {
      template: 'contact';
      pageData: ContactPageData;
    })
  | (CommonDataBySlug & {
      template: 'lightbox';
      pageData: LightboxData;
    })
  | {
      template: 'notFound';
      pageData: null;
      commonData: null;
      language: null;
    };

export type PageTemplate = 'front' | 'about' | 'galleries' | 'gallery' | 'contact' | 'lightbox';

export type PageRoute = {
  id: number;
  template: PageTemplate;
  translations: {
    [key in LanguageCode]: {
      navigation_title: string;
      slug: string;
    };
  };
};

export type ContactRequestPayload = {
  email: string;
  text: string;
};
