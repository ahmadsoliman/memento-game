import React, { ReactNode, useCallback } from "react";
import { useEffect, useState } from "react";
import useAppBadge from "../hooks/use-badge";
import createGrid, { GridType } from "../utilities/shuffle";

const initialContext: {
  wins: number;
  grid: GridType;
  pick1: { index: number } | null;
  pick2: { index: number } | null;
  disabled: boolean;
  cardClickedHandler: (index: number) => void;
  handleNewGame: () => void;
  increaseWins: () => void;
} = {
  wins: 0,
  grid: [],
  pick1: null,
  pick2: null,
  disabled: false,
  cardClickedHandler: (index: number) => {},
  handleNewGame: () => {},
  increaseWins: () => {},
};
export const GameContext = React.createContext(initialContext);

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [wins, setWins] = useState(0);
  const [grid, setGrid] = useState(createGrid);
  const [disabled, setDisabled] = useState(false);
  const [pick1, setPick1] = useState<null | {
    index: number;
  }>(null);
  const [pick2, setPick2] = useState<null | {
    index: number;
  }>(null);

  const [setBadge, clearBadge] = useAppBadge();

  const increaseWins = useCallback(() => {
    setWins((oldWins) => oldWins + 1);
    setBadge();
  }, [setBadge]);

  const cardClickedHandler = (index: number) => {
    if (grid[index].matched || index === pick1?.index || disabled) return;

    if (pick1) {
      if (grid[index].image === grid[pick1.index].image) {
        setGrid((oldGrid) => {
          const newGrid = [...oldGrid];
          newGrid[pick1.index].matched = true;
          newGrid[index].matched = true;
          return newGrid;
        });
        setPick1(null);
        setPick2(null);
      } else {
        setDisabled(true);
        setPick2({ index });
        var timeout = setTimeout(() => {
          setPick1(null);
          setPick2(null);
          setDisabled(false);
          clearTimeout(timeout);
        }, 700);
      }
    } else {
      setPick1({ index });
    }
  };

  const handleNewGame = useCallback(() => {
    setWins(0);
    clearBadge();
    setGrid(createGrid());
    setPick1(null);
    setPick2(null);
    setDisabled(false);
  }, [clearBadge]);

  useEffect(() => {
    const unmatched = grid.filter((card) => !card.matched);
    if (unmatched.length === 0) {
      increaseWins();
      handleNewGame();
    }
  }, [grid, increaseWins, handleNewGame]);

  const providerValue = {
    wins,
    grid,
    pick1,
    pick2,
    disabled,
    cardClickedHandler,
    handleNewGame,
    increaseWins,
  };

  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
