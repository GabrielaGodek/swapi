import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Details } from "@/pages/Details";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:planetName" element={<Details />} />
      </Routes>
  );
};

export default App;
