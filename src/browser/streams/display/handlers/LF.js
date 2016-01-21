import { assign } from 'lodash';

export default function handleLF(state) {
  const { pos: { col, row }, size: { rows }, chars } = state;
  const newRow = row + 1;
  const newChars = row < rows ? chars : chars.slice(rows - row + 1);
  return assign({}, state, {
    pos: {
      col,
      row: Math.min(newRow, rows - 1)
    },
    chars: newChars
  });
}
