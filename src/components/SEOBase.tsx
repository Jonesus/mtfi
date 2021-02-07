import { useAppContext } from 'api/context';
import Head from 'next/head';
import { useEffect } from 'react';
import { truncateString } from 'utils';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
};

export const SEOBase: React.FC<SEOProps> = ({ title, description, image }) => {
  const { language, commonData } = useAppContext();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const fullTitle = title
    ? `${title} | ${commonData.translations[language].title}`
    : commonData.translations[language].title;

  const fullDescription = description
    ? truncateString(description.replace(/\*/g, ''), 150)
    : commonData.translations[language].subtitle;

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={fullDescription} />

      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="google" content="nositelinkssearchbox" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:locale" content={language} />
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {image ? <meta property="twitter:image" content={image} /> : null}
    </Head>
  );
};
