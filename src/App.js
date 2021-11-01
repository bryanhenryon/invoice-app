import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './assets/style/GlobalStyle.js';
import Sidebar from './components/Sidebar';
import { breakpoints } from './assets/style/variables';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './assets/style/theme';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);

    /* I set a "isAppLoaded" state to "false" initially so the transitions don't trigger immediately on landing, 
    then I set it to "true" once the app is rendered. Problem is, useEffect mutates the state before it's rendered. 
    I didn't find any proper solution yet so I use this hack for now. */
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 100);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Container isAppLoaded={isAppLoaded}>
          <Sidebar theme={theme} toggleTheme={toggleTheme} />
          <Views />
        </Container>
      </ThemeProvider>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  transition: all 0.5s ease;

  ${({ isAppLoaded }) =>
    !isAppLoaded &&
    `
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
  `}

  @media ${breakpoints.md} {
    flex-direction: row;
  }
`;

const Views = styled.main`
  flex-grow: 2;
`;

export default App;
