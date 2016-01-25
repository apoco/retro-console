import { defaultsDeep } from 'lodash';

import moveRight from './moveRight';

export default function print(state, character) {
  const { pos: { row, col }, size: { cols, rows }, chars = [] } = state;

  const newRows = [];
  const newCols = [];
  newRows[row] = newCols;
  newCols[col] = character;

  const newState = defaultsDeep({ chars: newRows, lastChar: character }, state);
  return moveRight(newState, 1);
}
