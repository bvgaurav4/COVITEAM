// GameOfLife.js
import React, { useState, useEffect } from 'react';

const SIZE = 100;

// Initialize game state
function createEmptyGrid() {
  let grid = [];
  for (let i = 0; i < SIZE; i++) {
    grid[i] = Array(SIZE).fill(0);
  }
  return grid;
}

export default function GameOfLife() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);


  // Game logic
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(prevGrid => {
        return prevGrid.map((row, i) =>
          row.map((cell, j) => {
            const neighbors = [
              prevGrid[i - 1]?.[j - 1] || 0,
              prevGrid[i - 1]?.[j] || 0,
              prevGrid[i - 1]?.[j + 1] || 0,
              prevGrid[i]?.[j - 1] || 0,
              prevGrid[i]?.[j + 1] || 0,
              prevGrid[i + 1]?.[j - 1] || 0,
              prevGrid[i + 1]?.[j] || 0,
              prevGrid[i + 1]?.[j + 1] || 0,
            ].reduce((a, b) => a + b);

            if (cell && (neighbors < 2 || neighbors > 3)) return 0;
            if (!cell && neighbors === 3) return 1;
            return cell;
          })
        );
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);
  function handleMouseDown(i: number, j: number) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  function handleMouseOver(i: number, j: number) {
    if (!mouseIsPressed) return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  // Render game grid
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${SIZE}, calc(100vw / ${SIZE}))`,
      gridTemplateRows: `repeat(${SIZE}, calc(100vh / ${SIZE}))`,
      width: '100vw',
      height: '100vh'
    }}
         onMouseUp={handleMouseUp}>
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            onMouseDown={() => handleMouseDown(i, j)}
            onMouseOver={() => handleMouseOver(i, j)}
            style={{
              width: `calc(100vw / ${SIZE})`,
              height: `calc(100vh / ${SIZE})`,
              backgroundColor: grid[i][j] ? 'white' : undefined,
            }}
          />
        ))
      )}
    </div>
  );
}