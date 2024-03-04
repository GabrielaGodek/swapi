import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Details } from "@/pages/Details";
import { Provider } from "react-redux";
import { store } from "@/stores/store";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:planetName" element={<Details />} />
      </Routes>
    </Provider>
  );
};

export default App;
