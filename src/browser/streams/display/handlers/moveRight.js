import { defaults } from 'lodash';

export default function moveRight(state, count = 1) {
  const { pos: { col, row }, size: { rows, cols }, chars = [] } = state;

  const newCol = col + count;
  const rowsToAdvance = Math.floor(newCol / cols);
  const newRow = row + rowsToAdvance;
  const scrollLines = Math.max(0, newRow - rows + 1);

  return defaults({
    pos: {
      row: Math.min(newRow, rows - 1),
      col: newCol % cols
    },
    chars: chars.slice(scrollLines)
  }, state);
}
