import moveCursor from './moveCursor';

export default function handleHVP(state, { params: [row = 1, col = 1] = [] }) {
  return moveCursor(state, row, col);
}
