import React, { useState, useEffect } from "react";
import "./Grid.css";

const Grid = ({ rows, columns }) => {
  const [grid, setGrid] = useState([]);
  const [lineIndex, setLineIndex] = useState(columns - 1); // Start from the right-most column
  const [currentColor, setCurrentColor] = useState("rgb(0, 128, 255)"); // Initial color
  const [speed, setSpeed] = useState(200); // Default speed for wave
  const [direction, setDirection] = useState("left"); // Default direction (right to left)

  // Generate the grid
  useEffect(() => {
    const createGrid = () => {
      const newGrid = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: columns }, (_, colIndex) => ({
          row: rowIndex,
          col: colIndex,
          color: "black", // Default black background
        }))
      );
      setGrid(newGrid);
    };
    createGrid();
  }, [rows, columns]);

  // Animate the wave effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) =>
        prevGrid.map((row) =>
          row.map((cell) => {
            // Animate three columns at once
            if (
              cell.col >= lineIndex - 2 &&
              cell.col <= lineIndex
            ) {
              return { ...cell, color: currentColor };
            } else {
              return { ...cell, color: "black" };
            }
          })
        )
      );

      // Update the column index for the wave effect
      setLineIndex((prevIndex) => {
        if (direction === "left") {
          // Move left to right
          if (prevIndex < columns - 1) {
            return prevIndex + 1;
          } else {
            // Reset to the first column and change the color
            setCurrentColor(generateRandomColor());
            return 0;
          }
        } else {
          // Move right to left
          if (prevIndex > 0) {
            return prevIndex - 1;
          } else {
            // Reset to the right-most column and change the color
            setCurrentColor(generateRandomColor());
            return columns - 1;
          }
        }
      });
    }, speed); // Adjust speed based on the user input

    return () => clearInterval(interval); // Cleanup interval
  }, [lineIndex, columns, currentColor, direction, speed]);

  // Function to generate a random color
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 30px)`,
          gap: "2px",
        }}
      >
        {grid.map((row) =>
          row.map((cell) => (
            <div
              key={`${cell.row}-${cell.col}`}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: cell.color,
                border: "1px solid white", // Add border for box-like effect
              }}
            ></div>
          ))
        )}
      </div>

      {/* Controls */}
      <div className="controls">
        <div>
          <label>Speed (ms): </label>
          <input
            type="range"
            min="50"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Direction: </label>
          <button onClick={() => setDirection(direction === "left" ? "right" : "left")}>
            {direction === "left" ? "Move Right to Left" : "Move Left to Right"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;


