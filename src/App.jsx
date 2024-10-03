import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appartements from "./Appartements";
import ApartmentDetails from "./ApartmentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Appartements />} />
        <Route path="/appartement/:id" element={<ApartmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
