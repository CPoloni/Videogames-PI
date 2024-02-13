/*STYLE */
import "./App.css";
/*COMPONENTS TO RENDER */
import { Detail, Home, Form, Landing } from "./views/index";
import NavBar from "./components/navBar/NavBar";
/*HOOKS */
import { Route, Routes, useLocation } from "react-router-dom";

/*DEPENDENCIES */
//axios

function App() {
  const location = useLocation(); // retorna informacion de la posicion dentro de las rutas de la app. lo traigo para indicarle que muestre la navbar en todas las rutas diferentes a landing
  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
