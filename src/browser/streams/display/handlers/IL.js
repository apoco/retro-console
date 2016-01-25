import { defaults } from 'lodash';

// Insert lines
export default function handleIL(state, { params: [count = 1] = [] }) {
  const { pos: { row }, size: { rows }, chars } = state;
  return defaults({
    chars: chars.slice(0, row).concat(new Array(count)).concat(chars.slice(row)).slice(0, rows)
  }, state);
}
