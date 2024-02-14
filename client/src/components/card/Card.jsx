//import style from "./Card.module.css";
//import { NavLink } from "react-router-dom";

const Card = (props) => {
  return (
    <div>
      <p>id:{props.id}</p>
      <p>Name:{props.name}</p>
      <p>Genres:{props.genres}</p>
    </div>
  );
};
export default Card;
