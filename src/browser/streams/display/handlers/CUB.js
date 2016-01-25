import moveLeft from './moveLeft';

// Move the cursor back (left)
export default function handleCUB (state, { params: [count = 1] = [] }) {
  return moveLeft(state, count);
};
