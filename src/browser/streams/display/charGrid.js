import { scan } from 'kefir';
import stdout from '../shell/stdout';

const initialState = {
  size: { rows: 25, cols: 80 },
  pos: { row: 0, col: 0 },
  chars: []
};

export default stdout.scan((state, ch) => {
  const { pos, size: { rows, cols }, chars } = state;
  let { row, col } = pos;

  const newChars = Object.assign([], chars, {
    [row]: Object.assign([], chars[row] || [], { [col]: ch })
  });

  col++;
  while (col >= cols) {
    row++;
    col = 0;
  }

  const scrollLines = Math.max(0, row - rows + 1);

  const newState = {
    size: {
      rows,
      cols
    },
    pos: {
      row: Math.min(row, rows - 1),
      col: (col + 1) % cols
    },
    chars: newChars.slice(scrollLines)
  };

  console.log('Got', ch, 'new state', newState);

  return newState;
}, initialState);
