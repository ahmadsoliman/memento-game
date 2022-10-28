import { useContext } from "react";
import { GameContext } from "../store/GameContext";
import Card from "./Card";

const Grid = () => {
  const { grid, pick1, pick2, cardClickedHandler } = useContext(GameContext);

  return (
    <div className="grid">
      {grid.map((card, index) => {
        const { id, image, matched } = card;

        return (
          <Card
            image={image}
            selected={
              matched || pick1?.index === index || pick2?.index === index
            }
            key={id}
            onClick={() => cardClickedHandler(index)}
          />
        );
      })}
    </div>
  );
};

export default Grid;
