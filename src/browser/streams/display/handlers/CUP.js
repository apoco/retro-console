import { defaults } from 'lodash';

// Move the cursor to a specific position
export default function handleCUP(state, { params: [row = 1, col = 1] = [] }) {
  return defaults({
    pos: {
      row: row - 1,
      col: col - 1
    }
  }, state);
}
