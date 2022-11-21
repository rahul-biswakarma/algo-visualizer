import React from "react";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { setCellCount } from "/redux/reducers/mazeSlice";
import generateCellCount from "../MazeUtils/generateCellCount";

let tailwindConfiger = require("/tailwind.config.js");
let tailwindColors = tailwindConfiger.theme.colors;

const CountTheme = createTheme({
  palette: {
    CountPrimary: {
      main: tailwindColors["cyan"],
    },
    CountSecondary: {
      main: tailwindColors["cyan-bg"],
    },
  },
});

const CountController = () => {
  const dispatch = useDispatch();
  const maxCellCount = useSelector((state) => state.maze.maxCellCount);
  const minCellCount = useSelector((state) => state.maze.minCellCount);
  const cellCount = useSelector((state) => state.maze.cellCount);

  const updateCellCount = (count) => {
    dispatch(setCellCount(count));
    generateCellCount();
  };

  return (
    <div className="w-full h-full px-[2rem] bg-cyan-bg flex gap-[1.5rem] justify-center items-center text-text-1 font-space uppercase border-l-[10px] border-cyan text-lg hover:cursor-pointer select-none">
      Count
      <ThemeProvider theme={CountTheme}>
        <Slider
          className="Slider"
          aria-label="Array Count Slider"
          defaultValue={cellCount}
          min={minCellCount}
          max={maxCellCount}
          color="CountPrimary"
          onChangeCommitted={(e, val) => {
            updateCellCount(val);
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CountController;