import { defaultsDeep } from 'lodash';

// Move the cursor up
export default function handleCUU(state, { params: [count = 1] = [] }) {
  return defaultsDeep({ pos: { row: Math.max(0, state.pos.row - count) } }, state);
}
