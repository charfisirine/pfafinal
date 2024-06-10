import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Connexion from "./Components/connexion/Connexion";
import Inscription from "./Components/inscription/Inscription";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailCertif from "./Components/DetailCertif/DetailCertif";
import Passerexamin from "./Components/Passerexamin/Passerexamin";
import CreerExamen from "./Components/creerexamin/CreerExamin";
import {Questions} from "./Components/creerquestion/questions";
import Dashboardformateur from "./Components/Dashboardformateur/Dashboardformateur";
import Dashboardcandidat from "./Components/Dashboardcandidat/Dashboardcandidat";
import ModifierExamin from "./Components/Dashboardformateur/ModifierExamin";
import { ModifierQuestions } from "./Components/creerquestion/modifierQuestions";
import Resultat from "./Components/Resultat/Resultat";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DetailCertif" element={<DetailCertif />} />
        <Route path="/Inscription" element={<Inscription />} />
        {/* <Route path="/InscriptionCandidat" element={<InscriptionCandidat/>} /> 
        <Route path="/InscriptionFormateur" element={<InscriptionFormateur/>} />  */}
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Passerexamin/:id" element={<Passerexamin />} />
        <Route path="/CreerExamen" element={<CreerExamen />} />
        <Route path="/ModifierExamen/:id" element={<ModifierExamin />} />
        <Route path="/CreerQuestions" element={<Questions />} />
        <Route path="/ModifierQuestion/:id" element={<ModifierQuestions />} />
        <Route path="/Dashboardformateur" element={<Dashboardformateur />} />
        <Route path="/Dashboardcandidat" element={<Dashboardcandidat />} />
        <Route path="/Resultat/:id" element={<Resultat/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
