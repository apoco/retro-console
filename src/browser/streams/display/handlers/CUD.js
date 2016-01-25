import moveDown from './moveDown';

// Move the cursor down
export default function handleCUD(state, { params: [count = 1] = [] }) {
  return moveDown(state, count);
}
