import moveRight from './moveRight';

export default function handleCUF(state, { params = [] }) {
  const [count = 1] = params;
  return moveRight(state, count);
}
