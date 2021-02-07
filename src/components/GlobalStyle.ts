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

  :root {
    --page-padding: 3rem;
    --lightbox-padding: 4rem;
    --spacing: 3rem;
    --article-width: 40rem;

    --background-light: #FBFDFD;
    --background-dark: #E6E6E6;
    --black: #000000;
    --gray: #666666;
    --text-color: #555555;
    --warning: #B33A3A;
    --success: #28A745;
  }

  html {
    height: 100%;
    height: -webkit-fill-available;


    &:before {
      content: '';
      background: radial-gradient(
        circle at top left,
        var(--background-light) 0%,
        var(--background-dark) 100%
      );
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1; 
    }
  }

  body {
    height: 100%;
  }

  div#__next {
    width: 100vw;
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 100vh;

    font-family: 'Raleway';

    @media (max-width: 60rem) {
      display: block;
      position: relative;
      height: auto;
    }

    @media (max-width: 40rem) {
      --page-padding: 2rem;
    }

    @media (max-width: 25rem) {
      --page-padding: 1rem;
    }
  }


  h1 {
    font-family: 'Raleway';
  }
`;
