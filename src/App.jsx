import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Details } from "@/pages/Details";
import { NotFound } from "@/components/NotFound";
import { PlanetsContextProvider } from "@/context/PlanetsContext";

const App = () => {
  return (
    <PlanetsContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:planetName" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PlanetsContextProvider>
  );
};

export default App;
