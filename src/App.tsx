import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import GameContextProvider from "./store/GameContext";

function App() {
  return (
    <GameContextProvider>
      <Header />
      <Grid />
    </GameContextProvider>
  );
}

export default App;
