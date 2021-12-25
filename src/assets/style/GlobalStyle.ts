import { createGlobalStyle } from "styled-components";
import { breakpoints } from "./variables";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit; 
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;

  }

  body {
    font-size: 1.5rem;
    font-family: 'Spartan', sans-serif;
    min-width:320px;
    overflow:hidden;
  }

  ul {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  h1, h2, h3, h4 {
    font-weight: bold;
  }

  h1 {
    font-size:2rem;
    line-height: 3.6rem;
    letter-spacing: -0.1rem;
    
    @media ${breakpoints.sm} {
      font-size: 3.2rem;
    }
  }

   h2 {
    font-size: 2rem;
    line-height: 2.2rem;
    letter-spacing: -0.063rem;
  }

   h3 {
    font-size: 1.6rem;
    line-height: 2.4rem;
    letter-spacing: -0.08rem;
  }

  h4 {
    font-size: 1.2rem;
    line-height: 1.5rem;
    letter-spacing: -0.025rem;
  }

  a {
    text-decoration: none;
  }

  input, select, textarea, button{
    font-family:inherit;
  }
`;

export default GlobalStyle;
