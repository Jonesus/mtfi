import { getPageBySlug } from 'api';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const fontStyles = `
@font-face {
  font-family: 'Raleway';
  src: url('/fonts/Raleway-Italic-VariableFont_wght-subset.woff2') format('woff2');
  font-weight: 1 999;
  font-style: italic;
  font-display: swap;
  unicode-range: U+20-7E, U+C4, U+C5, U+D6, U+E4, U+E5, U+F6;
}

@font-face {
  font-family: 'Raleway';
  src: url('/fonts/Raleway-VariableFont_wght-subset.woff2') format('woff2');
  font-weight: 1 999;
  font-style: normal;
  font-display: swap;
  unicode-range: U+20-7E, U+C4, U+C5, U+D6, U+E4, U+E5, U+F6;
}
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      const pageProps = await getPageBySlug(ctx.query.slug as string[] | undefined);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        lang: pageProps.language,
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang={((this.props as unknown) as { lang: string }).lang}>
        <Head>
          <link
            rel="preload"
            href="/fonts/Raleway-Italic-VariableFont_wght-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Raleway-VariableFont_wght-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
