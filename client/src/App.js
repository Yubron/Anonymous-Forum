import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/Detail.page";
import LandingPage from "./pages/Landing.page";
import styled from "styled-components"

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 100px;
`
