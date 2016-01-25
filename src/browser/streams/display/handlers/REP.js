import print from './print';

export default function handleREP(state, { params: [count = 1] = [] }) {
  return (count > 0)
    ? handleREP(print(state, state.lastChar), { params: [count - 1] })
    : state;
}
