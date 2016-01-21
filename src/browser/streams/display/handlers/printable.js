import { defaultsDeep } from 'lodash';

import moveRight from './moveRight';

export default function handlePrintable(state, { character }) {
  const { pos: { row, col }, size: { cols, rows }, chars = [] } = state;

  const newRows = [];
  const newCols = [];
  newRows[row] = newCols;
  newCols[col] = character;

  const newState = defaultsDeep({ chars: newRows }, state);
  return moveRight(newState, 1);
};
