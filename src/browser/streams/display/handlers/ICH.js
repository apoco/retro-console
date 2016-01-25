import { defaults } from 'lodash';

// Insert characters
export default function handleICH(state, { params: [count = 1] = [] }) {
  const { chars, pos: { row, col }, size: { cols } } = state;
  const rowChars = chars[row] || [];
  return defaults({
    chars: chars
      .slice(0, row)
      .concat(rowChars.slice(0, col).concat(new Array(count)).concat(rowChars.slice(col)).slice(cols))
      .concat(chars.slice(row)),
    pos: { row, col: 0 }
  }, state);
}