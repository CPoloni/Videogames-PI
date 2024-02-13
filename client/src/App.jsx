/*STYLE */
import "./App.css";
/*COMPONENTS TO RENDER */
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Form from "./views/form/Form";
//import Landing from "./views/landing/Landing";
/*HOOKS */
import { Route, Routes } from "react-router-dom";

/*DEPENDENCIES */
//axios

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
