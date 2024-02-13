import Card from "../card/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const videogames = useSelector((state) => state.videogames); // me traeel estado global de videogames

  return (
    <div>
      {videogames.map((game) => {
        return <Card id={game.id} name={game.name} genres={game.genres} />;
      })}
    </div>
  );
};
export default Cards;
