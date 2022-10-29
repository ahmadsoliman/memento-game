import React, { ReactNode, useCallback } from "react";
import { useEffect, useState } from "react";
import useAppBadge from "../hooks/use-badge";
import createGrid, { GridType } from "../utilities/shuffle";

const initialContext: {
  wins: number;
  moves: number;
  bestMoves: number | null;
  grid: GridType;
  pick1: { index: number } | null;
  pick2: { index: number } | null;
  disabled: boolean;
  cardClickedHandler: (index: number) => void;
  handleNewGame: () => void;
  increaseWins: () => void;
} = {
  wins: 0,
  moves: 0,
  bestMoves: null,
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
  const [moves, setMoves] = useState({ count: 0, best: null } as {
    count: number;
    best: null | number;
  });
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
      setMoves((moves) => ({ ...moves, count: moves.count + 1 }));

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

  const resetGame = () => {
    setMoves((moves) => ({ ...moves, count: 0 }));
    setGrid(createGrid());
    setPick1(null);
    setPick2(null);
    setDisabled(false);
  };

  const handleNewGame = useCallback(() => {
    setWins(0);
    setMoves({ count: 0, best: null });
    clearBadge();
    resetGame();
  }, [clearBadge]);

  useEffect(() => {
    const unmatched = grid.filter((card) => !card.matched);
    if (unmatched.length === 0) {
      increaseWins();
      setMoves((moves) => ({
        ...moves,
        best: Math.min(moves.count, moves.best ? moves.best : Infinity),
      }));
      resetGame();
    }
  }, [grid, increaseWins]);

  const providerValue = {
    wins,
    moves: moves.count,
    bestMoves: moves.best,
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
