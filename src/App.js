import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./assets/style/GlobalStyle.js";
import { breakpoints } from "./assets/style/variables";
import { lightTheme, darkTheme } from "./assets/style/theme";

import Sidebar from "./components/Sidebar";
import Login from "./views/Login";
import Register from "./views/Register";
import Invoices from "./views/Invoices";
import Invoice from "./views/Invoice";
import Footer from "./components/Footer";

const App = () => {
  let location = useLocation();
  const [theme, setTheme] = useState("light");
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isSmallViewport, setIsSmallViewport] = useState(
    window.innerWidth < 576
  );
  const [isMediumViewport, setIsMediumViewport] = useState(
    window.innerWidth < 768
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    let currPosition = window.scrollY;

    window.addEventListener("scroll", () => {
      window.scrollY > currPosition && window.scrollY > 100
        ? setShowNavbar(false)
        : setShowNavbar(true);

      currPosition = window.scrollY;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsSmallViewport(window.innerWidth < 576);
      setIsMediumViewport(window.innerWidth < 768);
    });
  }, []);

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
          <SidebarExtended
            show={showNavbar}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <Views>
            <Content>
              <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/inscription' exact component={Register} />
                <InvoicesContainer>
                  <Route path='/factures' exact>
                    <Invoices
                      isSmallViewport={isSmallViewport}
                      isMediumViewport={isMediumViewport}
                    />
                  </Route>
                  <Route path='/factures/:id' exact>
                    <Invoice isMediumViewport={isMediumViewport} />
                  </Route>
                </InvoicesContainer>
              </Switch>
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
  background-color: ${({ theme }) => theme.viewsContainerBackground};
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

const SidebarExtended = styled(Sidebar)`
  transition: transform 200ms;
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-100%)")};
  position: sticky;
  top: 0;
  z-index: 100;

  @media ${breakpoints.lg} {
    transition: none;
    position: static;
    transform: translateY(0);
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

const InvoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 730px;
  margin: 0 auto;
  height: 100%;
`;

export default App;
