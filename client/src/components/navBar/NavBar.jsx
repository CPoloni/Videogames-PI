import { NavLink } from "react-router-dom"; //para mis botones para redirigirme, Uso NavLink en vez de Link para darle estilos
//importar los estilos de vavBar
//importar searchbar

const NavBar = () => {
  return (
    <div>
      <NavLink to="/home">HOME</NavLink>
      <NavLink to="/form">CREATE</NavLink>
    </div>
  );
};
export default NavBar;
