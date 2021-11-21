import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./assets/style/GlobalStyle.js";
import { breakpoints } from "./assets/style/variables";
import { lightTheme, darkTheme } from "./assets/style/theme";

import Sidebar from "./components/Sidebar";
import Login from "./views/Login";
import Register from "./views/Register";
import Invoices from "./views/Invoices";
import Footer from "./components/Footer";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);

    /* I set a "isAppLoaded" state to "false" initially so the transitions don't trigger immediately on landing, 
    then I set it to "true" once the app is rendered. Problem is, useEffect mutates the state before it's rendered. 
    I didn't find any proper solution yet so I use this hack for now. */
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 100);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Container isAppLoaded={isAppLoaded}>
          <Sidebar theme={theme} toggleTheme={toggleTheme} />
          <Views>
            <Content>
              <Router>
                <Switch>
                  <Route path='/' exact component={Login} />
                  <Route path='/inscription' exact component={Register} />
                  <Route path='/factures' exact component={Invoices} />
                </Switch>
              </Router>
            </Content>
            <Footer />
          </Views>
        </Container>
      </ThemeProvider>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.viewsContainerBackground};
  transition: background-color 0.3s;

  ${({ isAppLoaded }) =>
    !isAppLoaded &&
    `
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
  `}

  @media ${breakpoints.lg} {
    flex-direction: row;
  }
`;

const Views = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  gap: 4rem;
  padding: 3.2rem 2.4rem;

  @media ${breakpoints.sm} {
    padding: 5.6rem 4.8rem;
    gap: 7.5rem;
  }

  @media ${breakpoints.md} {
    padding: 7.2rem 4.8rem;
  }
`;

const Content = styled.div`
  height: 100%;
  flex-grow: 2;
`;

export default App;
