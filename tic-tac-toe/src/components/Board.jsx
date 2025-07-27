import PropTypes from "prop-types";
import "../Board.css";

export default function Board(props) {
  const { board, handleClick } = props;
  return (
    <div className="board">
      <div className="row">
        {[0, 1, 2].map((value) => (
          <button
            key={value}
            className="cell"
            onClick={() => handleClick(value)}
          >
            {board[value]}
          </button>
        ))}
      </div>
      <div className="row">
        {[3, 4, 5].map((value) => (
          <button
            key={value}
            className="cell"
            onClick={() => handleClick(value)}
          >
            {board[value]}
          </button>
        ))}
      </div>
      <div className="row">
        {[6, 7, 8].map((value) => (
          <button
            key={value}
            className="cell"
            onClick={() => handleClick(value)}
          >
            {board[value]}
          </button>
        ))}
      </div>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOf(["X", "O", null])).isRequired,
  handleClick: PropTypes.func.isRequired,
};