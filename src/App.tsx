import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { initializeApp } from "firebase/app";

import GlobalStyle from "./assets/style/GlobalStyle";
import { breakpoints } from "./assets/style/variables";
import { lightTheme, darkTheme } from "./assets/style/theme";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Login from "./views/Login";
import Register from "./views/Register";
import Invoices from "./views/Invoices";
import Invoice from "./views/Invoice";

const App: React.FC = () => {
  // Initialize Firebase
  initializeApp({
    apiKey: "AIzaSyDdeIpC_pPvO5ksOABxMPWzsYaqZjig0Wc",
    authDomain: "invoice-manager-f7e48.firebaseapp.com",
    projectId: "invoice-manager-f7e48",
    storageBucket: "invoice-manager-f7e48.appspot.com",
    messagingSenderId: "857320069304",
    appId: "1:857320069304:web:424f095427c79bb4dbfc4d",
  });

  const location = useLocation();

  const [theme, setTheme] = useState("light");
  const [enableTransitions, setEnableTransitions] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isSmallViewport, setIsSmallViewport] = useState(
    window.innerWidth < 576
  );
  const [isMediumViewport, setIsMediumViewport] = useState(
    window.innerWidth < 768
  );

  /**
   * Scroll to the top on every page change
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /**
   * Hide the sticky navbar when scrolling down on mobile, and show it again when scrolling up
   */
  useEffect(() => {
    let currPosition = window.scrollY;

    window.addEventListener("scroll", () => {
      window.scrollY > currPosition && window.scrollY > 100
        ? setShowNavbar(false)
        : setShowNavbar(true);

      currPosition = window.scrollY;
    });
  }, []);

  /**
   * Update viewport related states on window resize
   */
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsSmallViewport(window.innerWidth < 576);
      setIsMediumViewport(window.innerWidth < 768);
    });
  }, []);

  /**
   * Apply the user's choosen theme on page load from the local storage
   */
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  /**
   * Set a "enableTransitions" state to "false" initially so the transitions don't trigger immediately on landing,
   * then set it to "true" once the app is rendered. Problem is, useEffect mutates the state before it's rendered.
   * I didn't find any proper solution yet so I use this hack for now
   */
  useEffect(() => {
    setTimeout(() => {
      setEnableTransitions(true);
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
        <Container enableTransitions={enableTransitions}>
          <SidebarExtended
            show={showNavbar}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <Views>
            <Content>
              <AnimatePresence exitBeforeEnter initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path='/' element={<Login />} />
                  <Route path='/inscription' element={<Register />} />
                  <Route
                    path='/factures'
                    element={
                      <InvoicesWrapper>
                        <Invoices
                          isSmallViewport={isSmallViewport}
                          isMediumViewport={isMediumViewport}
                        />
                      </InvoicesWrapper>
                    }
                  />
                  <Route
                    path='/factures/:id'
                    element={
                      <InvoiceWrapper>
                        <Invoice isMediumViewport={isMediumViewport} />
                      </InvoiceWrapper>
                    }
                  />

                  <Route path='*' element={<Navigate to='/factures' />} />
                </Routes>
              </AnimatePresence>
            </Content>
            <Footer />
          </Views>
        </Container>
      </ThemeProvider>
    </>
  );
};

interface ContainerProps {
  enableTransitions: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.viewsContainerBackground};
  transition: background-color 0.3s;

  ${({ enableTransitions }) =>
    !enableTransitions &&
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

interface SidebarExtendedProps {
  show: boolean;
}

const SidebarExtended = styled(Sidebar)<SidebarExtendedProps>`
  transition: transform 300ms;
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

const InvoiceWrapper = styled.div`
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 300ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const InvoicesWrapper = styled.div`
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 300ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export default App;
