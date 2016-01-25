import { defaultsDeep } from 'lodash';

// Move to a specific character position
export default function handleCHA(state, { params: [pos = 1] = [] }) {
  return defaultsDeep({ pos: { col: pos - 1 } }, state);
}
