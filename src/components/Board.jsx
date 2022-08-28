import React from "react";

function Board({ state: { board }, onPlayerMove, winning }) {
  const square = (i) => {
    return (
      <td>
        <button
          disabled={board[i] !== "-" || winning}
          onClick={() => onPlayerMove(i)}
          className="w-full h-full"
        >
          {board[i] ? board[i] : "-"}
        </button>
      </td>
    );
  };

  React.useEffect(() => {}, [winning]);
  return (
    <div className="w-64 h-64">
      <table className="border-2 w-full h-full">
        <tbody>
          <tr>
            {square(0)}
            {square(1)}
            {square(2)}
          </tr>
          <tr>
            {square(3)}
            {square(4)}
            {square(5)}
          </tr>
          <tr>
            {square(6)}
            {square(7)}
            {square(8)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Board;
