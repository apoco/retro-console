import moveLeft from './moveLeft';

export default function handleCUB (state, { params: [count = 1] = [] }) {
  return moveLeft(state, count);
};
