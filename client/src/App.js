import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/Detail.page";
import LandingPage from "./pages/Landing.page";
import styled from "styled-components"
import CreateBoardPage from "./pages/CreateBoard.page";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact={true} path="/create" element={<CreateBoardPage />} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 100px;
`
