import { defaults } from 'lodash';

export default function moveDown(state, count = 1) {
  if (count <= 0) {
    return state;
  }

  const { pos: { col, row }, size: { rows }, chars } = state;
  const newRow = row + count;
  const scrollLines = Math.max(0, newRow - rows + 1);

  return defaults({
    pos: {
      col,
      row: Math.min(newRow, rows - 1)
    },
    chars: chars.slice(scrollLines)
  }, state);
}
