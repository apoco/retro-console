import { defaultsDeep } from 'lodash';

// Move to row
export default function handleVPA(state, { params: [pos = 1] = [] }) {
  return defaultsDeep({ pos: { row: pos - 1 } }, state);
}
