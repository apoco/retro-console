import { defaultsDeep } from 'lodash';

export default function handleRI(state) {
  return defaultsDeep({ pos: { row: Math.max(0, state.pos.row - 1) } }, state);
}
