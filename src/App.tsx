import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import styled, { ThemeProvider, css } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import GlobalStyle from "./assets/style/GlobalStyle";
import { breakpoints } from "./assets/style/variables";
import { lightTheme, darkTheme } from "./assets/style/theme";

import ConfirmModal from "./components/ConfirmModal";
import Drawer from "./components/Drawer";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";

import "./firebase/config";

const App: React.FC = () => {
  const auth = getAuth();

  const location = useLocation();

  const loadingBar = useRef<LoadingBarRef>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [theme, setTheme] = useState("light");
  const [enableTransitions, setEnableTransitions] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(
    window.innerWidth < 576
  );
  const [isMediumViewport, setIsMediumViewport] = useState(
    window.innerWidth < 768
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [sidebarHeight, setSidebarHeight] = useState(
    sidebar.current?.offsetHeight
  );

  const [sidebarWidth, setSidebarWidth] = useState(
    sidebar.current?.offsetWidth
  );

  useEffect(() => {
    setSidebarHeight(sidebar.current?.offsetHeight);
    setSidebarWidth(sidebar.current?.offsetWidth);
  }, []);

  // Scrolls to the top on every page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hides the sticky navbar when scrolling down on mobile, and shows it again when scrolling up
  useEffect(() => {
    let currPosition = window.scrollY;

    window.addEventListener("scroll", () => {
      window.scrollY > currPosition && window.scrollY > 100
        ? setShowNavbar(false)
        : setShowNavbar(true);

      currPosition = window.scrollY;
    });
  }, []);

  // Updates viewport related states on window resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsSmallViewport(window.innerWidth < 576);
      setIsMediumViewport(window.innerWidth < 768);
    });
  }, []);

  // Applies the user's choosen theme from the local storage
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  /* Sets the "enableTransitions" state to "true" once the app is rendered
  
   It prevents an unwanted behavior where on dark mode the app's background will first render in light mode and then very quickly transition to dark mode
   instead of directly render in dark mode, because it has a transition CSS rule. This results in an unpleasant white flash everytime you land on or refresh a page
  
   useEffect seems to mutate the state before the DOM is fully mounted so the flash still occurs, so I have to use this hack for now
  */
  useEffect(() => {
    setTimeout(() => {
      setEnableTransitions(true);
    }, 100);
  }, []);

  // Disables pages scroll when the drawer is opened
  useEffect(() => {
    showDrawer || showLogoutModal
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "initial");
  }, [showDrawer, showLogoutModal]);

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  /** Signs out the user */
  const logout = () => {
    signOut(auth);
    setShowLogoutModal(false);
  };

  // Observer tracking the user's sign-in state
  onAuthStateChanged(auth, (currentUser) =>
    currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false)
  );

  /** @todo Remove parameters after react-top-loading-bar fixes the issue (they should be optional) */
  const startLoadingBar = () => loadingBar?.current?.continuousStart(20, 1000);
  const endLoadingBar = () => loadingBar?.current?.complete();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <LoadingBar ref={loadingBar} color='#7C5DFA' height={3} />

      <Container enableTransitions={enableTransitions}>
        <SidebarExtended
          ref={sidebar}
          show={showNavbar}
          theme={theme}
          toggleTheme={toggleTheme}
          showLogoutModal={() => setShowLogoutModal(true)}
        />

        <AnimatePresence>
          {showLogoutModal && (
            <ConfirmModal
              title='Déconnexion'
              text='Êtes-vous sûr de vouloir vous déconnecter ?'
              cancel={() => setShowLogoutModal(false)}
              confirm={logout}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDrawer && (
            <Drawer
              closeDrawer={() => setShowDrawer(false)}
              sidebar={sidebar}
              sidebarHeight={sidebarHeight}
              sidebarWidth={sidebarWidth}
            />
          )}
        </AnimatePresence>

        {isLoggedIn !== null && (
          <Pages>
            <Content>
              <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                  <Route
                    path='/'
                    element={
                      !isLoggedIn ? (
                        <Login
                          startLoadingBar={startLoadingBar}
                          endLoadingBar={endLoadingBar}
                        />
                      ) : (
                        <Navigate to='/factures' />
                      )
                    }
                  />

                  <Route
                    path='/inscription'
                    element={
                      !isLoggedIn ? (
                        <Register
                          startLoadingBar={startLoadingBar}
                          endLoadingBar={endLoadingBar}
                        />
                      ) : (
                        <Navigate to='/factures' />
                      )
                    }
                  />

                  <Route
                    path='/factures'
                    element={
                      isLoggedIn ? (
                        <Invoices
                          isSmallViewport={isSmallViewport}
                          isMediumViewport={isMediumViewport}
                          showDrawer={() => setShowDrawer(true)}
                        />
                      ) : (
                        <Navigate to='/' />
                      )
                    }
                  />

                  <Route
                    path='/factures/:id'
                    element={
                      isLoggedIn ? (
                        <Invoice
                          showDrawer={() => setShowDrawer(true)}
                          isMediumViewport={isMediumViewport}
                        />
                      ) : (
                        <Navigate to='/' />
                      )
                    }
                  />

                  <Route
                    path='/reinitialisation'
                    element={
                      isLoggedIn ? (
                        <Navigate to='/factures' />
                      ) : (
                        <PasswordReset
                          startLoadingBar={startLoadingBar}
                          endLoadingBar={endLoadingBar}
                        />
                      )
                    }
                  />

                  <Route
                    path='*'
                    element={
                      isLoggedIn ? (
                        <Navigate to='/factures' />
                      ) : (
                        <Navigate to='/' />
                      )
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Content>

            <Footer />
          </Pages>
        )}
      </Container>
    </ThemeProvider>
  );
};

interface ContainerProps {
  enableTransitions: boolean;
}

const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  display: grid;
  grid-template: auto 1fr / 1fr;
  background-color: ${({ theme }) => theme.pagesContainerBackground};
  transition: background-color 0.3s;

  ${({ enableTransitions }) =>
    !enableTransitions &&
    css`
      -webkit-transition: none;
      -moz-transition: none;
      -o-transition: none;
      transition: none;
    `}

  @media ${breakpoints.lg} {
    grid-template: 1fr / auto 1fr;
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

  @media ${breakpoints.lg} {
    transition: none;
    position: sticky;
    top: 0;
    bottom: 0;
    height: 100vh;
    transform: translateY(0);
  }
`;

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  flex: 1;
`;

export default App;
