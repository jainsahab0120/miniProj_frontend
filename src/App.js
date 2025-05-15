import "./styles/global.css";
import { ThemeProvider,styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import TutorialList from "./pages/TutorialList";
import ContactPage from "./pages/ContactPage";
import YogaPranayamaList from "./pages/YogaPranayamaList";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/tutorials" exact element={<TutorialList />} />
              <Route path="/yoga-pranayama" exact element={<YogaPranayamaList />} />
              <Route path="/contact" exact element={<ContactPage />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication setCurrentUser={setCurrentUser} />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
