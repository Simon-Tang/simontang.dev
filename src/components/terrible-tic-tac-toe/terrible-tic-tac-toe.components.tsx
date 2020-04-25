import * as React from 'react';
import { useEffect, useState } from 'react';
import { Input } from 'src/components/atoms/input/input.components';
import { Button } from 'src/components/atoms/button/button.components';
import { StyledTicTacToeTable } from './terrible-tic-tac-toe.styles';
import { Board, Cell } from './terrible-tic-tac-toe.types';

const defaultBoard: Board = [['', '', ''], ['', '', ''], ['', '', '']];

export const TerribleTicTacToe = ({
  setTwitchChatActive,
}: {
  setTwitchChatActive: (result: Cell) => void;
}) => {
  const [board, setBoard] = useState<Board>(defaultBoard);

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setTwitchChatActive(winner);
    } else {
      const isDraw = checkDraw(board);
      if (isDraw) {
        setTwitchChatActive('');
      }
    }
  });

  const handleEditCell = (rowIndex: number, cellIndex: number) => {
    let cell = prompt('Please enter your new cell value (X, O, or blank):');
    if (cell === null) {
      return;
    }
    cell = cell.toUpperCase();
    if (cell === 'X' || cell === 'O' || cell === '') {
      setBoard(boardWithCell(board, rowIndex, cellIndex, cell));
    } else {
      alert('Invalid entry');
    }
  };

  return (
    <StyledTicTacToeTable>
      <thead>
        <tr>
          <td>Column 1</td>
          <td>Column 2</td>
          <td>Column 3</td>
        </tr>
      </thead>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>
                <div className='cellWrapper'>
                  <Input aria-role='' value={cell} size={4} disabled></Input>
                  <Button
                    id={`tic-tac-toe-${rowIndex}-${cellIndex}`}
                    onClick={() => handleEditCell(rowIndex, cellIndex)}
                  >
                    Edit
                  </Button>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTicTacToeTable>
  );
};

function boardWithCell(board: Board, y: number, x: number, value: Cell): Board {
  return [
    ...board.slice(0, y),
    [...board[y].slice(0, x), value, ...board[y].slice(x + 1)],
    ...board.slice(y + 1),
  ];
}

function checkWinner(board: Board): 'X' | 'O' | null {
  const allEqual = (arr: Cell[]) => arr.every(cell => arr[0] === cell);

  const results: Cell[] = [];

  const winRows = board.filter(allEqual);
  if (winRows.length) {
    results.push(winRows[0][0]);
  }

  for (let x = 0; x < board[0].length; x++) {
    if (allEqual(board.map(row => row[x]))) {
      results.push(board[0][x]);
    }
  }

  if (allEqual(board.map((row, rowIndex) => row[rowIndex]))) {
    results.push(board[0][0]);
  }

  if (
    allEqual(board.map((row, rowIndex) => row[board.length - 1 - rowIndex]))
  ) {
    results.push(board[board.length - 1][0]);
  }

  const candidates: Cell[] = ['X', 'O'];
  return candidates.filter(c => results.includes(c))[0] || null;
}

function checkDraw(board: Board) {
  return !checkWinner(board) && board.every(row => row.every(cell => cell));
}
