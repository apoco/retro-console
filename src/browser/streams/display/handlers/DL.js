import { defaults } from 'lodash';

// Delete lines
export default function handleDL(state, { params: [count = 1] = [] }) {
  const { chars, pos: { row } } = state;

  return defaults({
    chars: chars.slice(0, row).concat(chars.slice(row + count)),
    pos: {
      row,
      col: 0
    }
  }, state);
}