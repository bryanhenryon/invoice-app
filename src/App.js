import styled from 'styled-components';
import GlobalStyle from './assets/style/GlobalStyle.js';
import Sidebar from './components/Sidebar';
import { breakpoints } from './assets/style/variables';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar />
        <Views />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media ${breakpoints.md} {
    flex-direction: row;
  }
`;

const Views = styled.main`
  flex-grow: 2;
`;

export default App;
