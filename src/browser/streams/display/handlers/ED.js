import { defaults } from 'lodash';

// Erase characters
export default function handleED(state, { params: [mode = 0] = [] }) {
  const { chars, pos: { row, col } } = state;
  const rowChars = chars[row] = [];

  let newChars = chars;

  switch (mode) {
    case 0:
      newChars = chars
        .slice(0, row)
        .concat(rowChars.slice(0, col));
      break;
    case 1:
      newChars = chars.map((rowChars, idx) => {
        if (idx < row)
          return [];
        else if (idx > row) {
          return rowChars;
        } else {
          return rowChars.slice(col + 1)
        }
      });
      break;
    case 2:
      newChars = [];
      break;
    default:
      console.error('Unexpected ED mode', mode);
  }

  return defaults({ chars: newChars }, state);
}
