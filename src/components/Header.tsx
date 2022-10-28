import { useContext, useEffect } from "react";
import { GameContext } from "../store/GameContext";

const Header = () => {
  const { wins, handleNewGame } = useContext(GameContext);

  // Update page title with win count
  useEffect(() => {
    document.title = `${wins} wins`;
  }, [wins]);

  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h2>Memory Game</h2>
      <button className="new-game-btn" onClick={handleNewGame}>
        New Game
      </button>
    </header>
  );
};

export default Header;
