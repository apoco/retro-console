import { assign } from 'lodash';

// Line feed
export default function handleLF(state) {
  const { pos: { col, row }, size: { rows }, chars } = state;
  const newRow = row + 1;
  const newChars = newRow < rows ? chars : chars.slice(rows - newRow + 1);
  return assign({}, state, {
    pos: {
      col,
      row: Math.min(newRow, rows - 1)
    },
    chars: newChars
  });
}
