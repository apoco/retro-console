import { defaultsDeep } from 'lodash';

import moveDown from './moveDown';

export default function moveRight(state, count = 1) {
  const { pos: { col }, size: { cols } } = state;

  const newCol = col + count;
  const newState = defaultsDeep({
    pos: { col: newCol % cols }
  }, state);

  return moveDown(newState, Math.floor(newCol / cols));
}
