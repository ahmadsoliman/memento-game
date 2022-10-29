import { useContext, useEffect, useState } from "react";
import usePWAInstall from "../hooks/use-pwa-install";
import { GameContext } from "../store/GameContext";

const Header = () => {
  const { wins, moves, bestMoves, handleNewGame } = useContext(GameContext);
  const { installApp, isInstalled, isPWA } = usePWAInstall();
  const [cancelled, setCancelled] = useState(false);

  // Update page title with win count
  useEffect(() => {
    document.title = `${wins} wins`;
  }, [wins]);

  const installAppHandler = () => {
    installApp();
    setCancelled(true);
  }
  return (
    <>
      {!isInstalled && !cancelled && !isPWA && (
        <div className="install-app-notification">
          <span onClick={installAppHandler}>Install App</span>
          <span className="cancel" onClick={() => setCancelled(true)}>
            X
          </span>
        </div>
      )}
      <header className="header">
        <h2>Memory Game</h2>
        <button className="new-game-btn" onClick={handleNewGame}>
          New Game
        </button>
        <div className="break"></div>
        <h4>{moves} moves</h4>
        {bestMoves && <h4>Least moves: {bestMoves}</h4>}
        <h4>{wins} wins</h4>
      </header>
    </>
  );
};

export default Header;
