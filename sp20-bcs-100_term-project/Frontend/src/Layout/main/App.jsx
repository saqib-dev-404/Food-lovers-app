import "./App.css";
import Header from "../components/Header";
import Home from "../screens/Home";
import StickyFooter from "../components/Footer";
import LandingPage from "../screens/LandingPage";

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <StickyFooter />
    </div>
  );
}

export default App;
