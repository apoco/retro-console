import { defaults } from 'lodash';

export default function moveCursor(state, row, col) {
  return defaults({
    pos: {
      row: row - 1,
      col: col - 1
    }
  }, state);
}
