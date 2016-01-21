import { defaults } from 'lodash';

export default function handleCUB (state) {
  const { pos: { row, col }, size: { cols } } = state;

  let newCol = col - 1;
  let newRow = row;
  while (newCol < 0) {
    newRow = Math.max(0, row - 1);
    newCol += cols;
  }

  return defaults({ pos: { row: newRow, col: newCol }}, state);
};
