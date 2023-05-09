import { BrowerRoutes as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import MainContent from "./components/MainContent";
import Update from "./components/Update";
import Header from "./components/Header"


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/model/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
