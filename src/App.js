import Board from "./components/Board";
import { useStickyValue } from "./utility/helper";
import React from "react";

const intialBoard = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

const IntializeState = {
  board: intialBoard,
  playerTurn: "x",
};

const streaks = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [state, setState] = useStickyValue(IntializeState, "tictactoe");
  const [winning, setWinning] = React.useState(false);

  const onPlayerMove = (i) => {
    let newBoard = state["board"];
    newBoard[i] = state["playerTurn"] === "x" ? "x" : "o";

    setState(
      {
        board: newBoard,
        playerTurn: state["playerTurn"] === "x" ? "o" : "x",
      },
      "tictactoe"
    );
  };

  const resetBoard = () => {
    setWinning(false);
    setState(
      { board: ["-", "-", "-", "-", "-", "-", "-", "-", "-"], playerTurn: "x" },
      "tictactoe"
    );
  };

  const checkStreak = React.useCallback(
    (char) => {
      const counts = state["board"].getDuplicates();

      const player = state["playerTurn"] === "x" ? "o" : "x";
      streaks.forEach((streak, index) => {
        let count = 0;
        streak.forEach((val, index) => {
          if (counts[player]?.includes(val)) {
            count += 1;
          }
          if (count >= 3) {
            setWinning(true);
            return;
          }
        });
      });
    },
    [state]
  );

  React.useEffect(() => {
    checkStreak();
  }, [state, winning, checkStreak]);

  return (
    <div className="App">
      <section className="flex flex-col items-center justify-center gap-y-8   bg-black h-screen text-white">
        <div className="text-3xl underline uppercase">TIC TAC TOE</div>
        <Board state={state} onPlayerMove={onPlayerMove} winning={winning} />

        <div className="resetButton">
          <button onClick={() => resetBoard()}>
            {winning ? "Restart" : "Start"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
