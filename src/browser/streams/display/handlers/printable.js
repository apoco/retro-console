import { defaults } from 'lodash';

export default function handlePrintable(state, { character }) {
  const { pos, size: { cols, rows }, chars } = state;
  let { row, col } = pos;

  const newChars = Object.assign([], chars, {
    [row]: Object.assign([], chars[row] || [], { [col]: character })
  });

  col++;
  while (col >= cols) {
    row++;
    col = 0;
  }

  const scrollLines = Math.max(0, row - rows + 1);

  return defaults({
    pos: {
      row: Math.min(row, rows - 1),
      col: col % cols
    },
    chars: newChars.slice(scrollLines)
  }, state);
};
