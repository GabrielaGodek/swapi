import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Details } from "@/pages/Details";
import { NotFound } from "@/components/NotFound";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:planetName" element={<Details />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
