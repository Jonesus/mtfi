import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  /* Remove default padding */
  ul,
  ol {
    padding: 0;
  }
  
  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }
  
  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    font-smooth: always;

    line-height: 1.5;
    font-size: 100%;
  }
  
  /* Remove list styles on ul, ol elements with a class attribute */
  ul,
  ol {
    list-style: none;
  }
  
  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }
  
  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }
  
  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    cursor: pointer;
  }
  
  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }


  @font-face {
    font-family: 'Raleway';
    src: url('/fonts/Raleway-Italic-VariableFont_wght-subset.woff2') format("woff2");
    font-weight: 1 999;
    font-style: italic;
    unicode-range: U+20-7E,U+C4,U+C5,U+D6,U+E4,U+E5,U+F6;
  }

  @font-face {
    font-family: 'Raleway';
    src: url('/fonts/Raleway-VariableFont_wght-subset.woff2') format("woff2");
    font-weight: 1 999;
    font-style: normal;
    unicode-range: U+20-7E,U+C4,U+C5,U+D6,U+E4,U+E5,U+F6;
  }

  :root {
    --page-padding: 3rem;
    --lightbox-padding: 4rem;
    --spacing: 3rem;
    --bottom-padding: var(--page-padding);
    --max-text-width: 40rem;

    --background-light: #FBFDFD;
    --background-dark: #E6E6E6;
    --black: #000000;
    --gray: #777777;
    --text-color: #555555;
    --warning: #B33A3A;
    --success: #28A745;
  }

  div#__next {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: min-content 1fr;

    background: radial-gradient(
      circle at top left,
      var(--background-light) 0%,
      var(--background-dark) 100%
    );

    font-family: 'Raleway';

    @media (max-width: 60rem) {
      grid-template-columns: unset;
      grid-auto-rows: min-content;
      position: relative;
      --bottom-padding: 10rem;
    }

    @media (max-width: 40rem) {
      --page-padding: 2rem;
      --bottom-padding: 8rem;
    }
  }


  h1 {
    font-family: 'Raleway';
  }
`;
