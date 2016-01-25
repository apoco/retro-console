import moveRight from './moveRight';

// Move the cursor right (forward)
export default function handleCUF(state, { params: [count = 1] = [] }) {
  return moveRight(state, count);
}
